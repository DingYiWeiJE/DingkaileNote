import { useSyncExternalStore } from "react";

function createStore(data: any) {
  let state = data;
  const nextListeners: Function[] = [];

  function subscribe(listener: Function) {
    nextListeners.push(listener);
    return function unsubscribe() {
      nextListeners.splice(nextListeners.indexOf(listener), 1);
    };
  }

  function getState() { return state; }
  function setState(data: any) {
    state = data
    for (let i = 0; i < nextListeners.length; i++) {
      nextListeners[i]();
    }
  }
  return { subscribe, getState, setState };
}


const store = createStore({
  user: {
    name: 'John',
    age: 30
  }
});
const { subscribe, getState, setState } = store;



export function useMyStore() {
  const state = useSyncExternalStore(subscribe, getState);
  return [state, setState]
}
