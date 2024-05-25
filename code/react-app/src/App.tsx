import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { MobxDemo, dingkaile } from './pages/mobx';

import {autorun} from 'mobx'
import { TodoList } from './pages/context/TodoList';
import { DingContext } from './pages/context/DingContext';
import Provider from './pages/Provider/Provider';

function App() {
  const [name, setName] = useState('超级大魔王')
  useEffect(() => {
    // 监听数据变化
    autorun(() => {
      setName(dingkaile.get())
    });
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* {name} */}
      {/* <MobxDemo/> */}
      {/* <DingContext></DingContext> */}
      <Provider></Provider>
      </header>
    </div>
  );
}

export default App;
