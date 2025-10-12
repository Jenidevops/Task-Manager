import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { useTasks } from '../hooks/useTasks';

const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasks, updateTask } = useTasks();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundTask = tasks.find(t => t.id === id);
    if (foundTask) {
      setTask(foundTask);
    } else {
      // Task not found, redirect to home
      navigate('/');
    }
    setLoading(false);
  }, [id, tasks, navigate]);

  const handleSubmit = (taskData) => {
    updateTask(id, taskData);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}bgimage.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading task...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}bgimage.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="text-center">
          <p className="text-gray-600">Task not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md modern-button hover-lift"
          >
            Go Home
          </button>
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
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <TaskForm
            initialValues={task}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isEditing={true}
          />
        </div>
      </div>
    </div>
  );
};

export default EditTask;
