import React, { useState, useEffect } from 'react';
import { useMyStore } from './MyStore';
import { TelegramClient } from 'telegram';

export default  function () {
  const [myState, setMyState] = useMyStore();

  useEffect(() => {
    console.log(TelegramClient)
  }, [])

  return (
    <div>
      {JSON.stringify(myState)}
      <button onClick={() => setMyState({ name: 'John Doe', age: Date.now() })}>Update State</button>
    </div>
  );
}
