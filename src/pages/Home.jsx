import React from 'react';
import TaskList from '../components/TaskList';
import { useTaskContext } from '../context/TaskContext';

const Home = () => {
  const { tasks, loading, deleteTask, toggleTask } = useTaskContext();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-12"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}bgimage.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold gradient-text">All Tasks - UPDATED VERSION</h1>
            <p className="mt-2 text-gray-600 font-semibold">Manage your tasks efficiently</p>
          </div>

          <TaskList
            tasks={tasks}
            onDelete={deleteTask}
            onToggle={toggleTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
