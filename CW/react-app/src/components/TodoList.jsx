import React from 'react';
import './components.css';

const TodoList = () => {
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const today = new Date();
    const dayName = days[today.getDay()];

    const todos = [
        "Come to training",
        "Read and do hands on",
        "Go to home"
    ];

    return (
        <div className="todo-container">
            <h2 className="todo-header">To do on {dayName}</h2>
            <ul className="todo-list">
                {todos.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
