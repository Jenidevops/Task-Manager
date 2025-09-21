import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : 'hover:bg-blue-600';
  };

  return (
    <nav className="glass-nav bg-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold gradient-text">
              Task Manager
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/create"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors nav-button ${isActive('/create')}`}
            >
              Create Task
            </Link>
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors nav-button ${isActive('/')}`}
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
