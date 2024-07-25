import React, { useState, useEffect } from 'react';
import { updateData, getData, addData } from './MyIndexData';
import { Test } from './Test';

export default function App() {
  const [db, setDb] = useState<any>(null);
  const [textValue, setTextValue] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  };

  const getIndexDb = async () => {
    const db = await getData(887);
    setDb(db);
  }

  const setIndexDb = async () => {
    updateData(887, { id: 887, name: 'Alice', email: 'alice@cchu出来吧神龙.com' + Date.now() });
  }

  const assIndexDb = async () => {
    addData({ id: 887, name: 'Alice', email: 'alicsdfsdfsdfsdfsle.com' });
  }

  return (
    <div>
      <h1 onClick={() => setOpen(true)}>IndexDb{JSON.stringify(db)}</h1>
      <Test open={open} onClose={() => setOpen(false)}>
        <textarea value={textValue} onChange={handleChange} />
      </Test>
      <button onClick={setIndexDb}>set Data</button>
      <button onClick={assIndexDb}>add Data</button>
      <button onClick={getIndexDb}>Get Data</button>
    </div>
  );
}
