import axios from 'axios';
import React from 'react';

const Task = ({ task, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${task._id}`);
      onDelete(task._id); // Call the onDelete function passed from the parent
      window.location.reload();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="task">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Task;
