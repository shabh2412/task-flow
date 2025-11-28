import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MoreHorizontal,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  Calendar
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const TaskTable = ({ tasks, onEdit, onDelete, onStatusToggle }) => {
  const { isAdmin } = useAuth();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Task
              </th>
              <th className="hidden px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
                Status
              </th>
              <th className="hidden px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">
                Created
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {tasks.map((task) => (
              <tr
                key={task._id}
                className="group transition-colors hover:bg-muted/30"
              >
                <td className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => onStatusToggle(task)}
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${task.status === 'completed'
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-muted-foreground/30 hover:border-primary'
                        }`}
                    >
                      {task.status === 'completed' && (
                        <CheckCircle2 className="h-3 w-3" />
                      )}
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className={`font-medium ${task.status === 'completed'
                          ? 'text-muted-foreground line-through'
                          : ''
                        }`}>
                        {task.title}
                      </p>
                      <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                        {task.description}
                      </p>
                      {/* Mobile badges */}
                      <div className="mt-2 flex items-center gap-2 md:hidden">
                        <Badge variant={task.status === 'completed' ? 'success' : 'warning'}>
                          {task.status === 'completed' ? 'Completed' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden px-6 py-4 md:table-cell">
                  <Badge variant={task.status === 'completed' ? 'success' : 'warning'}>
                    {task.status === 'completed' ? (
                      <><CheckCircle2 className="mr-1 h-3 w-3" /> Completed</>
                    ) : (
                      <><Clock className="mr-1 h-3 w-3" /> Pending</>
                    )}
                  </Badge>
                </td>
                <td className="hidden px-6 py-4 sm:table-cell">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(task.createdAt)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(task)}
                      className="hidden sm:inline-flex"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {isAdmin && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(task._id)}
                        className="hidden text-destructive hover:bg-destructive/10 hover:text-destructive sm:inline-flex"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                    {/* Mobile dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="sm:hidden">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(task)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        {isAdmin && (
                          <DropdownMenuItem
                            onClick={() => onDelete(task._id)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
