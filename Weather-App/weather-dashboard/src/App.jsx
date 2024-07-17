import React from 'react';
import Dashboard from './components/Dashboard';
import NavBar from './components/Navbar';
import './App.css';

const App = () => {
  return (
    <div className="App">
        <NavBar/>
        <Dashboard /> 
    </div>
  );
};

export default App;
