// Reorder tasks within the same column
export const reorderTasks = (columns, source, destination, draggableId) => {
  const sourceColumn = columns.find(col => col.id === source.droppableId);
  const destColumn = columns.find(col => col.id === destination.droppableId);
  const sourceTasks = [...sourceColumn?.taskIds || []];
  const destTasks = [...destColumn?.taskIds || []];

  sourceTasks.splice(source.index, 1);
  destTasks.splice(destination.index, 0, draggableId);

  return columns.map((col) =>
    col.id === source.droppableId
      ? { ...col, taskIds: sourceTasks }
      : col.id === destination.droppableId
      ? { ...col, taskIds: destTasks }
      : col
  );
};

// Move tasks between columns
export const moveTaskBetweenColumns = (columns, source, destination, draggableId) => {
  const sourceColumn = columns.find(col => col.id === source.droppableId);
  const destColumn = columns.find(col => col.id === destination.droppableId);
  const sourceTasks = [...sourceColumn?.taskIds || []];
  const destTasks = [...destColumn?.taskIds || []];

  sourceTasks.splice(source.index, 1);
  destTasks.splice(destination.index, 0, draggableId);

  return columns.map((col) =>
    col.id === source.droppableId
      ? { ...col, taskIds: sourceTasks }
      : col.id === destination.droppableId
      ? { ...col, taskIds: destTasks }
      : col
  );
};

// Persist Kanban state to localStorage
export const persistState = (columns, tasks, history, future) => {
  const kanbanState = { columns, tasks, history, future };
  localStorage.setItem('kanbanState', JSON.stringify(kanbanState));
};
