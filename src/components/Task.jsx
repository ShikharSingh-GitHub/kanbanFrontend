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

  const shortDate = task.createdAt ? new Date(task.createdAt).toLocaleDateString() : null;

  return (
    <div className="task">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8}}>
        <h3>{task.title}</h3>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          {shortDate && <div style={{fontSize:12,color:'#8f9aa3'}}>{shortDate}</div>}
          <button className="btn-danger" onClick={handleDelete} aria-label={`Delete ${task.title}`}>Delete</button>
        </div>
      </div>
      {task.description && <p>{task.description}</p>}
      <div className="task-meta">
        <div>{task.assignee || ''}</div>
      </div>
    </div>
  );
};

export default Task;
