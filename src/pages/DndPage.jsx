import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import "../pages/dndPage.css"
const ItemType = 'TASK';

const Task = ({ task, index, moveTask, columnId, deleteTask }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemType,
    item: { index, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: 'lightblue',
        padding: '8px',
        marginBottom: '8px',
        cursor: 'move',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {task.content}
      <button onClick={() => deleteTask(columnId, task.id)}>X</button>
    </div>
  );
};

const Column = ({ column, moveTask, deleteTask }) => {
  const [, dropRef] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.columnId !== column.id) {
        moveTask(draggedItem.index, draggedItem.columnId, column.id);
        draggedItem.columnId = column.id; // Меняем текущий столбец на новый
      }
    },
  });

  return (
    <div
      ref={dropRef}
      style={{
        margin: '0 20px',
        padding: '10px',
        backgroundColor: 'lightgrey',
        minHeight: '400px',
        width: '250px',
      }}
    >
      <h2>{column.name}</h2>
      {column.items.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          index={index}
          moveTask={moveTask}
          columnId={column.id}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

function DndPage() {
  const [columns, setColumns] = useState([
    {
      id: 'todo',
      name: 'To Do',
      items: [
        { id: '1', content: 'Добавить 2 колонки' },
        { id: '2', content: 'Сделать функцию удаления задач' },
        { id: '3', content: 'Настроить маршрутизацию' },
        { id: '4', content: 'Позавтракать' }
      ],
    },
    {
      id: 'inProgress',
      name: 'In Progress',
      items: [],
    },
    {
      id: 'done',
      name: 'Done',
      items: [],
    },
    {
      id: 'blocked',
      name: 'Blocked',
      items: [],
    },
  ]);

  const moveTask = (taskIndex, sourceColumnId, destinationColumnId) => {
    const sourceColumn = columns.find((col) => col.id === sourceColumnId);
    const destinationColumn = columns.find((col) => col.id === destinationColumnId);

    const taskToMove = sourceColumn.items[taskIndex];

    const updatedSourceItems = sourceColumn.items.filter((_, idx) => idx !== taskIndex);
    const updatedDestinationItems = [...destinationColumn.items, taskToMove];

    setColumns((prevColumns) =>
      prevColumns.map((col) => {
        if (col.id === sourceColumnId) {
          return { ...col, items: updatedSourceItems };
        }
        if (col.id === destinationColumnId) {
          return { ...col, items: updatedDestinationItems };
        }
        return col;
      })
    );
  };

  const deleteTask = (columnId, taskId) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            items: column.items.filter((task) => task.id !== taskId),
          };
        }
        return column;
      })
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            moveTask={moveTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
      <a href='/' className='goback_btn'>Вернуться назад</a>
    </DndProvider>
  );
}

export default DndPage;



