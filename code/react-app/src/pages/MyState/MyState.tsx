import React, { useState, useEffect } from 'react';
import { useMyStore } from './MyStore';

export default  function () {
  const [myState, setMyState] = useMyStore();

  return (
    <div>
      {JSON.stringify(myState)}
      <button onClick={() => setMyState({ name: 'John Doe', age: Date.now() })}>Update State</button>
    </div>
  );
}
