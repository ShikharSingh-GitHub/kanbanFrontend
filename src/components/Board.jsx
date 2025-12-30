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
      setError('');
      try {
        const { data } = await api.get('/api/tasks');
        setTasks(data);
      } catch (error) {
        const message = error.response?.data?.message || 'Error fetching tasks';
        setError(message);
        console.error('Fetch tasks error:', error);
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
    setError('');
    try {
      const { data } = await api.post('/api/tasks', { ...newTask, status: 'To Do' });
      setTasks([...tasks, data]);
      setNewTask({ title: '', description: '' });
    } catch (error) {
      const message = error.response?.data?.message || 'Error creating task';
      setError(message);
      console.error('Create task error:', error);
    }
    setLoading(false);
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const draggedTask = tasks.find(task => task._id === result.draggableId);
    const previousTasks = [...tasks];
    
    // Optimistic update
    const updatedTasks = tasks.map(task =>
      task._id === draggedTask._id ? { ...task, status: destination.droppableId } : task
    );
    setTasks(updatedTasks);

    try {
      await api.put(`/api/tasks/${draggedTask._id}`, { status: destination.droppableId });
    } catch (error) {
      // Revert on error
      setTasks(previousTasks);
      const message = error.response?.data?.message || 'Error updating task status';
      setError(message);
      console.error('Update task error:', error);
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;
    
    setLoading(true);
    setError('');
    try {
      await api.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      const message = error.response?.data?.message || 'Error deleting task';
      setError(message);
      console.error('Delete task error:', error);
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

      {error && (
        <div style={{
          background:'rgba(255,107,107,0.1)',
          border:'1px solid rgba(255,107,107,0.3)',
          borderRadius:10,
          padding:12,
          marginBottom:12,
          color:'#ffb4b4',
          display:'flex',
          justifyContent:'space-between',
          alignItems:'center'
        }}>
          <span>{error}</span>
          <button onClick={() => setError('')} style={{background:'transparent',border:'none',color:'#ffb4b4',cursor:'pointer',fontSize:18}}>×</button>
        </div>
      )}

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
