# Task Management Application

A full-stack Task Management Web Application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- **User Authentication**: Sign up and sign in functionality with JWT tokens
- **Role-Based Access**: Admin and Normal User roles
- **Task Management**: Create, read, update, and delete tasks
- **Task Properties**: Title, Description, Status (Pending/Completed), Created Date
- **Pagination**: Paginated task list for better performance
- **Theme Switcher**: Light/Dark mode toggle
- **Responsive Design**: Modern UI that works on all devices
- **Admin Privileges**: Only admins can delete tasks

## Tech Stack

### Frontend
- React.js with Vite
- TailwindCSS for styling
- shadcn/ui components
- React Router for navigation
- Axios for API calls
- Lucide React for icons

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation

## Project Structure

```
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRE=7d
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Login user
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks (paginated)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task (Admin only)

## User Roles

- **Normal User**: Can create, read, and update their own tasks
- **Admin**: Can create, read, update, and delete all tasks

## Screenshots

The application features:
- Clean sign-in/sign-up pages
- Dashboard with task cards
- Add/Edit task modal
- Light/Dark theme toggle
- Responsive design for mobile devices

## Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set the root directory to `frontend`
4. Deploy

### Backend (Railway/Render)
1. Push your code to GitHub
2. Connect your repository to Railway or Render
3. Set environment variables
4. Deploy

## License

MIT
