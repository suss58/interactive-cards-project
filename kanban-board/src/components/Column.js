import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const Column = ({ column, tasks, provided, searchQuery, filteredTasks }) => {
  return (
    <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
      <h2>{column.title}</h2>
      {column.taskIds
        .filter((taskId) => !searchQuery || filteredTasks.some((task) => task.id === taskId))
        .map((taskId, index) => {
          const task = tasks[taskId];
          return (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="task-card-container"
                >
                  <TaskCard task={task} />
                </div>
              )}
            </Draggable>
          );
        })}
      {provided.placeholder}
    </div>
  );
};

export default Column;
