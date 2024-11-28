import React from 'react';

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <p>{task.content}</p>
    </div>
  );
};

export default TaskCard;
