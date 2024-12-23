import React from 'react';
import PostThought from '../components/PostThought';
import ThoughtsList from '../components/ThoughtsList';


const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-4">
        <PostThought />
        <ThoughtsList />
      </main>
    </div>
  );
};

export default HomePage;
