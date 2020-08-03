import React, { useState, useEffect, useCallback } from 'react';
import ChildComponent from './components/ChildComponent';
import './App.css';

// https://www.youtube.com/watch?v=4BranN3qnDU

function App() {
  const [count, setCount] = useState(0);

  // const array1 = useMemo(() => { return ['One', 'Two', 'Three']}, []);
  const array = ['one', 'two', 'three'];

  // 함수를 useCallback에 감싸서 자식컴포넌트에 props로 내려주면 자식 컴포넌트는 해당 함수를 재렌더링하지 않음
  const fetchData = useCallback(type => {
    return fetch(`https://jsonplaceholder.typicode.com/${type}`)
    .then(response => response.json())
    .then(json => console.log(json))
  }, []);

  useEffect(() => {
    fetchData('todos')
  }, [fetchData]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Count: {count}</h1>
        <p>
          <button type='button' onClick={() => setCount(count+1)}>Add</button>
        </p>
        <ChildComponent title='This is the title' array={array} fetchData={fetchData}/>
      </header>
    </div>
  );
}

export default App;
