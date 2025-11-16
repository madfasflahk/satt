import React from 'react';

const AdminHomePage = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Welcome to the Admin Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-300">
        Select a category from the sidebar to manage the content of your application.
      </p>
    </div>
  );
};

export default AdminHomePage;
