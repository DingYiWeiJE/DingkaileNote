import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import { routerArr } from './config/router';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {routerArr.map(item => {
          return <Link to={item.path} key={item.path}>{item.name}</Link>
        })}
      </header>
    </div>
  );
}

export default App;
