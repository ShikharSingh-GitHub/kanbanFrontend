import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Task from './Task';

const Column = ({ task, index, onDelete }) => {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="task"
        >
          <Task task={task} onDelete={onDelete} />
        </div>
      )}
    </Draggable>
  );
};

export default Column;
