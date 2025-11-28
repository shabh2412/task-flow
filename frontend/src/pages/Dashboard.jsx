import { useState, useEffect, useCallback, useMemo } from 'react';
import { taskApi } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Sidebar from '@/components/Sidebar';
import MobileHeader from '@/components/MobileHeader';
import TaskTable from '@/components/TaskTable';
import TaskForm from '@/components/TaskForm';
import Pagination from '@/components/Pagination';
import { Plus, Loader2, Search, ClipboardList, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all tasks for stats
  const fetchAllTasks = useCallback(async () => {
    try {
      const response = await taskApi.getTasks(1, 100);
      setAllTasks(response.data.tasks);
    } catch (err) {
      console.error('Error fetching all tasks:', err);
    }
  }, []);

  // Fetch paginated tasks
  const fetchTasks = useCallback(async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const response = await taskApi.getTasks(page, 8);
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks(currentPage);
    fetchAllTasks();
  }, [fetchTasks, fetchAllTasks, currentPage]);

  // Calculate stats from all tasks
  const stats = useMemo(() => ({
    total: allTasks.length,
    pending: allTasks.filter(t => t.status === 'pending').length,
    completed: allTasks.filter(t => t.status === 'completed').length,
  }), [allTasks]);

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (activeFilter !== 'all') {
      result = result.filter(task => task.status === activeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [tasks, activeFilter, searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await taskApi.deleteTask(taskId);
      fetchTasks(currentPage);
      fetchAllTasks();
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  const handleStatusToggle = async (task) => {
    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      await taskApi.updateTask(task._id, { ...task, status: newStatus });
      fetchTasks(currentPage);
      fetchAllTasks();
    } catch (err) {
      setError('Failed to update task status.');
      console.error('Error updating task:', err);
    }
  };

  const handleFormSubmit = async (data) => {
    setFormLoading(true);
    try {
      if (editingTask) {
        await taskApi.updateTask(editingTask._id, data);
      } else {
        await taskApi.createTask(data);
      }
      setIsFormOpen(false);
      setEditingTask(null);
      fetchTasks(editingTask ? currentPage : 1);
      fetchAllTasks();
    } catch (err) {
      setError('Failed to save task. Please try again.');
      console.error('Error saving task:', err);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - Desktop */}
      <Sidebar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        stats={stats}
      />

      {/* Mobile Header */}
      <MobileHeader
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        stats={stats}
      />

      {/* Main Content */}
      <main className="lg:ml-64">
        <div className="min-h-screen p-4 pt-20 lg:p-8 lg:pt-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {activeFilter === 'all' ? 'All Tasks' :
                  activeFilter === 'pending' ? 'Pending Tasks' : 'Completed Tasks'}
              </h1>
              <p className="mt-1 text-muted-foreground">
                {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <Button onClick={handleAddTask} size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              New Task
            </Button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-lg bg-destructive/10 p-4 text-destructive">
              {error}
            </div>
          )}

          {/* Content */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Loading tasks...</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-20">
              {searchQuery ? (
                <>
                  <Search className="h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-semibold">No results found</h3>
                  <p className="mt-1 text-muted-foreground">
                    Try adjusting your search query
                  </p>
                </>
              ) : tasks.length === 0 ? (
                <>
                  <div className="rounded-full bg-primary/10 p-4">
                    <Sparkles className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">Welcome to TaskFlow!</h3>
                  <p className="mt-1 max-w-sm text-center text-muted-foreground">
                    Get started by creating your first task. Stay organized and boost your productivity.
                  </p>
                  <Button onClick={handleAddTask} className="mt-6 gap-2">
                    <Plus className="h-4 w-4" />
                    Create Your First Task
                  </Button>
                </>
              ) : (
                <>
                  <ClipboardList className="h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-semibold">
                    No {activeFilter} tasks
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    {activeFilter === 'pending'
                      ? "Great job! You've completed all your tasks."
                      : "Complete some tasks to see them here."}
                  </p>
                </>
              )}
            </div>
          ) : (
            <>
              <TaskTable
                tasks={filteredTasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusToggle={handleStatusToggle}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Task Form Modal */}
      <TaskForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        task={editingTask}
        onSubmit={handleFormSubmit}
        loading={formLoading}
      />
    </div>
  );
};

export default Dashboard;
