import React from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { useTasks } from '../hooks/useTasks';

const CreateTask = () => {
  const navigate = useNavigate();
  const { addTask } = useTasks();

  const handleSubmit = (taskData) => {
    addTask(taskData);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

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
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isEditing={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
