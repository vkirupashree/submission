import React from 'react';
import Header from './components/Header.jsx';
import SubHeader from './components/SubHeader.jsx';
import TodoList from './components/TodoList.jsx';
import './App.css';

const App = () => {
    return (
        <div className="app-container">
            <Header />
            <SubHeader />
            <TodoList />
        </div>
    );
};

export default App;
