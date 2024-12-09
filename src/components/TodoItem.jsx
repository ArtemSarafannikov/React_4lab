import React from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
    return (
        <li>
            <label className="custom-checkbox">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                />
                <span className="custom-checkbox__indicator"></span>
            </label>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
        </li>
    );
}
export default TodoItem;