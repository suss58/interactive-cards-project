import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Sample data for columns and tasks
const initialData = {
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      tasks: [
        { id: 'task-1', content: 'Take out the trash' },
        { id: 'task-2', content: 'Watch a movie' }
      ]
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      tasks: [
        { id: 'task-3', content: 'Learn React' },
        { id: 'task-4', content: 'Build a project' }
      ]
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      tasks: [
        { id: 'task-5', content: 'Exercise' }
      ]
    }
  },
  columnOrder: ['column-1', 'column-2', 'column-3']
};

const App = () => {
  const [state, setState] = useState(initialData);

  // On drag end handler to update the state after drag-and-drop
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If no destination (dropped outside any droppable), do nothing
    if (!destination) {
      return;
    }

    // If dropped in the same spot, do nothing
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Reorder the tasks within the same column
    const startColumn = state.columns[source.droppableId];
    const finishColumn = state.columns[destination.droppableId];

    // Moving tasks within the same column
    if (startColumn === finishColumn) {
      const newTasks = Array.from(startColumn.tasks);
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, { id: draggableId, content: draggableId });

      const newColumn = {
        ...startColumn,
        tasks: newTasks
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn
        }
      };

      setState(newState);
      return;
    }

    // Moving tasks between columns
    const startTasks = Array.from(startColumn.tasks);
    const [removedTask] = startTasks.splice(source.index, 1);

    const finishTasks = Array.from(finishColumn.tasks);
    finishTasks.splice(destination.index, 0, removedTask);

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [startColumn.id]: {
          ...startColumn,
          tasks: startTasks
        },
        [finishColumn.id]: {
          ...finishColumn,
          tasks: finishTasks
        }
      }
    };

    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const tasks = column.tasks;

          return (
            <div key={column.id} className="column">
              <h3>{column.title}</h3>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    className="tasks-container"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            className="task-card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {task.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default App;
