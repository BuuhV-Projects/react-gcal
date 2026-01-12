import React from 'react';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Your Daily Planner</h1>
        <p className="text-xl text-muted-foreground">
          A beautiful Google Calendar-inspired component library
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">📅 Multiple Views</span>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">🎯 Drag & Drop</span>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">🌙 Dark Mode</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
