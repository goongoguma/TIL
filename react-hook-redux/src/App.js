import React from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'

function App() {
  // useSelector는 리덕스로부터 state를 얻기위해 사용된다
  const counter = useSelector((state) => state.counter);
  
  // action을 dispatch할때 사용
  const dispatch = useDispatch();
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Counter: {counter}</h1>
        <button onClick={(() => dispatch({type: 'INCREMENT'}))}>INCREMENT</button>
        <button onClick={(() => dispatch({type: 'DECREMENT'}))}>DECREMENT</button>
      </header>
    </div>
  );
}

export default App;
