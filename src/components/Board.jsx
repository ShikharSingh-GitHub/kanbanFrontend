import React, { useEffect, useState } from 'react';
import api from '../api';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Column from './Column';

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/api/tasks');
        setTasks(data);
      } catch (error) {
        setError('Error fetching tasks');
      }
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/api/tasks', { ...newTask, status: 'To Do' });
      setTasks([...tasks, data]);
      setNewTask({ title: '', description: '' });
    } catch (error) {
      setError('Error creating task');
    }
    setLoading(false);
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const draggedTask = tasks.find(task => task._id === result.draggableId);
    const updatedTasks = tasks.map(task =>
      task._id === draggedTask._id ? { ...task, status: destination.droppableId } : task
    );
    setTasks(updatedTasks);

    try {
      await api.put(`/api/tasks/${draggedTask._id}`, { status: destination.droppableId });
    } catch (error) {
      setError('Error updating task status');
    }
  };

  const handleDelete = async (taskId) => {
    setLoading(true);
    try {
      await api.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      setError('Error deleting task');
    }
    setLoading(false);
  };

  return (
    <div className="board-wrapper">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <form onSubmit={handleSubmit} style={{display:'flex',gap:8,flex:1}}>
          <input
            className="input-field"
            type="text"
            name="title"
            placeholder="Task Title"
            value={newTask.title}
            onChange={handleInputChange}
            required
          />
          <input
            className="input-field"
            type="text"
            name="description"
            placeholder="Short description (optional)"
            value={newTask.description}
            onChange={handleInputChange}
          />
          <button className="btn-primary" type="submit" disabled={loading}>{loading ? 'Adding…' : 'Add'}</button>
        </form>
        <div style={{marginLeft:12}}>
          <button className="refresh-button" onClick={() => window.location.reload()}>Refresh</button>
        </div>
      </div>

      {error && <p style={{ color: 'salmon' }}>{error}</p>}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          <Droppable droppableId="To Do">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="column">
                <h2>To Do <span className="col-meta">({tasks.filter(t=>t.status==='To Do').length})</span></h2>
                {tasks.filter(task => task.status === 'To Do').map((task, index) => (
                  <Column key={task._id} task={task} index={index} onDelete={handleDelete} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="In Progress">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="column">
                <h2>In Progress <span className="col-meta">({tasks.filter(t=>t.status==='In Progress').length})</span></h2>
                {tasks.filter(task => task.status === 'In Progress').map((task, index) => (
                  <Column key={task._id} task={task} index={index} onDelete={handleDelete} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Done">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="column">
                <h2>Done <span className="col-meta">({tasks.filter(t=>t.status==='Done').length})</span></h2>
                {tasks.filter(task => task.status === 'Done').map((task, index) => (
                  <Column key={task._id} task={task} index={index} onDelete={handleDelete} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
