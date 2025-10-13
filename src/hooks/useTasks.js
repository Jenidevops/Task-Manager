import { useState, useEffect } from 'react';

const STORAGE_KEY = 'tasks';

// Sample tasks for demonstration
const defaultTasks = [
  {
    id: '1',
    title: 'Welcome to Task Manager',
    description: 'This is a sample task to get you started. You can edit or delete this task.',
    priority: 'medium',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Create your first task',
    description: 'Click on "Create Task" to add your own tasks to the list.',
    priority: 'high',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
    completed: false,
    createdAt: new Date().toISOString()
  }
];

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      // Check if we're in the browser environment
      if (typeof window !== 'undefined' && window.localStorage) {
        const storedTasks = localStorage.getItem(STORAGE_KEY);
        console.log('Loading from localStorage:', storedTasks); // Debug log
        if (storedTasks && storedTasks !== 'undefined' && storedTasks !== 'null') {
          const parsedTasks = JSON.parse(storedTasks);
          if (Array.isArray(parsedTasks) && parsedTasks.length > 0) {
            console.log('Using stored tasks:', parsedTasks); // Debug log
            setTasks(parsedTasks);
          } else {
            // Empty array or invalid data, use default tasks
            console.log('Using default tasks - empty or invalid stored data'); // Debug log
            setTasks(defaultTasks);
          }
        } else {
          // No stored tasks, use default tasks
          console.log('Using default tasks - no stored data'); // Debug log
          setTasks(defaultTasks);
        }
      } else {
        // Not in browser environment, use default tasks
        console.log('Using default tasks - not in browser'); // Debug log
        setTasks(defaultTasks);
      }
    } catch (error) {
      console.warn('Failed to load tasks from localStorage:', error);
      setTasks(defaultTasks);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (!loading && typeof window !== 'undefined' && window.localStorage) {
      try {
        console.log('Saving tasks to localStorage:', tasks); // Debug log
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.warn('Failed to save tasks to localStorage:', error);
      }
    }
  }, [tasks, loading]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    toggleTask
  };
};
