import React from 'react';
import TodoItem from './TodoItem';
function TodoList({ todos, toggleTodo, deleteTodo }) {
  console.log('Rendering TodoList with todos:', todos); // Добавьте это
  return (
      <ul>
          {todos.map((todo) => (
              <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
              />
          ))}
      </ul>
  );
}
export default TodoList;