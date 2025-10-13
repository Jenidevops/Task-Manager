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
    const loadTasks = () => {
      console.log('Loading tasks...'); // Debug
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          const storedTasks = localStorage.getItem(STORAGE_KEY);
          console.log('Stored tasks:', storedTasks); // Debug
          
          if (storedTasks && storedTasks !== 'undefined' && storedTasks !== 'null') {
            const parsedTasks = JSON.parse(storedTasks);
            console.log('Parsed tasks:', parsedTasks); // Debug
            if (Array.isArray(parsedTasks)) {
              setTasks(parsedTasks);
              console.log('Loaded tasks from localStorage:', parsedTasks.length); // Debug
            } else {
              setTasks(defaultTasks);
              console.log('Invalid stored data, using default tasks'); // Debug
            }
          } else {
            setTasks(defaultTasks);
            console.log('No stored tasks, using default tasks'); // Debug
          }
        } else {
          setTasks(defaultTasks);
          console.log('No localStorage, using default tasks'); // Debug
        }
      } catch (error) {
        console.warn('Failed to load tasks from localStorage:', error);
        setTasks(defaultTasks);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (!loading && typeof window !== 'undefined' && window.localStorage) {
      console.log('Saving tasks to localStorage:', tasks.length); // Debug
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        console.log('Tasks saved successfully'); // Debug
      } catch (error) {
        console.warn('Failed to save tasks to localStorage:', error);
      }
    }
  }, [tasks, loading]);

  const addTask = (task) => {
    console.log('Adding new task:', task); // Debug
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completed: false
    };
    console.log('New task created:', newTask); // Debug
    setTasks(prev => {
      const updatedTasks = [...prev, newTask];
      console.log('Updated tasks array:', updatedTasks); // Debug
      return updatedTasks;
    });
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
