import React, { useState } from 'react';
import { auth,db } from '../firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const PostThought = () => {
  const [thought, setThought] = useState('');
  const [mood, setMood] = useState('');


  const handlePost = async () => {
    const user = auth.currentUser; // Ensure the user is authenticated
    if (!user) {
      alert('You must be logged in to post a thought.');
      return;
    }
  
    if (!thought || !mood) {
      alert('Please fill in all fields.');
      return;
    }
  
    try {
      await addDoc(collection(db, 'thoughts'), {
        username: user.displayName || 'Anonymous', // Use the user's name if available
        mood: mood,
        thought: thought,
        timestamp: serverTimestamp(),
      });
      setThought('');
      setMood(''); //for reset the react state
      console.log('Thought posted successfully!');
    } catch (error) {
      console.error('Error posting thought:', error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-2 r">Post Your Thought</h2>
      <textarea
        className="w-full p-2 border rounded-md mb-2"
        rows="3"
        placeholder="Enter your thought here..."
        value={thought}
        onChange={(e) => setThought(e.target.value)}
      ></textarea>
      <div className="flex space-x-2 mb-4">
        <button
          className={`p-2 rounded ${mood === 'positive' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setMood('positive')}
        >
          Positive
        </button>
        <button
          className={`p-2 rounded ${mood === 'negative' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setMood('negative')}
        >
          Negative
        </button>
        <button
          className={`p-2 rounded ${mood === 'neutral' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setMood('neutral')}
        >
          Neutral
        </button>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handlePost}
      >
        Post
      </button>
    </div>
  );
};

export default PostThought;
