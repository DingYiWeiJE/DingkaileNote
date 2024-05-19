import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { MobxDemo, dingkaile } from './pages/mobx';

import {autorun} from 'mobx'

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
        {name}
      <MobxDemo/>
      </header>
    </div>
  );
}

export default App;
