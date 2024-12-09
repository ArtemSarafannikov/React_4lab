import React, { useState } from 'react';
import TodoList from '../components/TodoList';

function TodoPage() {
    const [todos, setTodos] = useState([
        { id: 1, title: 'Buy groceries', completed: false },
        { id: 2, title: 'Read a book', completed: false },
    ]);
    const [newTodo, setNewTodo] = useState('');
    
    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const addTodo = (e) => {
        e.preventDefault();
        console.log('Adding todo:', newTodo);
        if (!newTodo) return;
        const newTodoItem = {
            id: Date.now(),
            title: newTodo,
            completed: false,
        };
        const updatedTodos = [...todos, newTodoItem];
        setTodos(updatedTodos);
        console.log('Updated todos:', updatedTodos); // Добавьте это
        setNewTodo('');
    };
    

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div>
            <h1>My To-Do List</h1>
            <form onSubmit={addTodo}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add new task..."
                />
                <button type="submit">Add</button>
            </form>
            <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
            <a href="/dnd" className='goback_btn'>
                На dnd страницу
            </a>
        </div>
    );
}

export default TodoPage;
