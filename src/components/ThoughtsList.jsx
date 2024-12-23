import React from "react";
import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const ThoughtsList = () => {
  const [thoughts, setThoughts] = useState([]);
  const [editThoughtId, setEditThoughtId] = useState(null);
  const [editText, setEditText] = useState("");

  const db = getFirestore();

  // Real-time listener for thoughts
  useEffect(() => {
    const thoughtsQuery = query(collection(db, "thoughts"));

    const unsubscribe = onSnapshot(thoughtsQuery, (querySnapshot) => {
      const thoughtsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setThoughts(thoughtsData);
    });

    // Clean up listener on component unmount
    return () => unsubscribe();
  }, [db]);


  // Function to update thought
  const updateThought = async (id, newContent) => {
    try {
      const thoughtRef = doc(db, "thoughts", id);
      await updateDoc(thoughtRef, {
        thought: newContent,
        timestamp: new Date(), // Update the timestamp
      });
      setEditThoughtId(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating thought:", error);
    }
  };

  // Function to delete thought
  const deleteThought = async (id) => {
    try {
      const thoughtRef = doc(db, "thoughts", id);
      await deleteDoc(thoughtRef);
    } catch (error) {
      console.error("Error deleting thought:", error);
    }
  };

  const handleEditClick = (thoughtId, currentContent) => {
    setEditThoughtId(thoughtId);
    setEditText(currentContent);
  };

  const handleUpdate = () => {
    if (editText) {
      updateThought(editThoughtId, editText);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="bg-slate-400 text-2xl font-bold text-red-600 text-center py-2 mb-6">
        Thoughts
      </h2>
      <div>
        {thoughts.map((thought) => (
          <div
            key={thought.id}
            className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300"
          >
            <p className="font-semibold text-gray-800">
              {thought.username} -{" "}
              <span className="italic text-gray-600">{thought.mood}</span>
            </p>
            {editThoughtId === thought.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-2 mb-4"
                />
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600"
                >
                  Update
                </button>
              </>
            ) : (
              <>
                <p className="mt-2 text-gray-700">{thought.thought}</p>
                <button
                  onClick={() => handleEditClick(thought.id, thought.thought)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mt-2 transition duration-300 hover:bg-yellow-600"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteThought(thought.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2 transition duration-300 hover:bg-red-600"
                >
                  Delete
                </button>
              </>
            )}
            <p className="mt-4 text-sm text-gray-500">
              {thought.timestamp
                ? new Date(thought.timestamp.seconds * 1000).toLocaleString()
                : "Timestamp not available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThoughtsList;