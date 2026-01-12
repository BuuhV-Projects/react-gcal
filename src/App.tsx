import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Your Daily Planner</h1>
        <p className="text-xl text-gray-600">
          A beautiful Google Calendar-inspired component library
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">📅 Multiple Views</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">🎯 Drag & Drop</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">🌙 Dark Mode</span>
        </div>
      </div>
    </div>
  );
};

export default App;
