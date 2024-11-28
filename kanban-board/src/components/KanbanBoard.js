import React, { useState, useEffect, useMemo } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Column from './Column';
import Header from './Header';
import SearchBar from './SearchBar';
import { reorderTasks, moveTaskBetweenColumns, persistState } from '../utils/kanbanUtils';

const KanbanBoard = () => {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState({});
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('kanbanState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setColumns(parsedState.columns);
      setTasks(parsedState.tasks);
      setHistory(parsedState.history);
      setFuture(parsedState.future);
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    persistState(columns, tasks, history, future);
  }, [columns, tasks, history, future]);

  // Handle drag and drop end
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (destination.droppableId === source.droppableId) {
      const updatedColumns = reorderTasks(columns, source, destination, draggableId);
      setColumns(updatedColumns);
      updateHistory(updatedColumns);
    } else {
      const updatedColumns = moveTaskBetweenColumns(columns, source, destination, draggableId);
      setColumns(updatedColumns);
      updateHistory(updatedColumns);
    }
  };

  // Update history after drag
  const updateHistory = (updatedColumns) => {
    const updatedState = {
      columns: updatedColumns,
      tasks,
      history: [...history, { columns, tasks }],
      future: [],
    };
    setHistory(updatedState.history);
    setFuture(updatedState.future);
  };

  // Undo function
  const undo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setColumns(lastState.columns);
      setTasks(lastState.tasks);
      setHistory(history.slice(0, -1));
      setFuture([{ columns, tasks }, ...future]);
    }
  };

  // Redo function
  const redo = () => {
    if (future.length > 0) {
      const nextState = future[0];
      setColumns(nextState.columns);
      setTasks(nextState.tasks);
      setHistory([...history, { columns, tasks }]);
      setFuture(future.slice(1));
    }
  };

  // Add a new column
  const addColumn = () => {
    const newColumn = {
      id: uuidv4(),
      title: 'New Column',
      taskIds: [],
    };
    setColumns([...columns, newColumn]);
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Filter tasks based on search
  const filteredTasks = useMemo(
    () => Object.values(tasks).filter((task) => task.content.toLowerCase().includes(searchQuery.toLowerCase())),
    [tasks, searchQuery]
  );

  return (
    <div className="kanban-board">
      <Header undo={undo} redo={redo} addColumn={addColumn} />
      <SearchBar handleSearch={handleSearch} />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">
          {columns.map((column) => (
            <Droppable droppableId={column.id} key={column.id} direction="vertical">
              {(provided) => (
                <Column
                  column={column}
                  tasks={tasks}
                  provided={provided}
                  searchQuery={searchQuery}
                  filteredTasks={filteredTasks}
                />
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
