import React from 'react';
import api from '../api';

const Task = ({ task, onDelete }) => {
  const handleDelete = async () => {
    try {
      await api.delete(`/api/tasks/${task._id}`);
      onDelete(task._id);
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
