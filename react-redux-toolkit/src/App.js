import React, { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { add, del, toggle } from './redux/todoSlice';
import { getPosts } from './redux/postsSlice';

function App() {
  const [task, setTesk] = useState("");
  const { todos, posts } = useSelector(state => state);
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(add({ task }));
    setTesk("");
  };

  const handleRemove = (task) => {
    dispatch(del({ task }));
  };

  const handleToggle = (id) => {
    dispatch(toggle({ id }))
  };

  useEffect(() => {
    dispatch(getPosts({ limit: 5  }))
  }, [dispatch])

  return (
    <div className="App">
      <div className="App-header">
        <form onSubmit={handleSubmit}>
          <input type='text' onChange={e => setTesk(e.target.value)} value={task} />
          <button type='submit'>Submit</button>
        </form>
        <ul>
        {
          todos.map((item, index) => {
            return (
              <div key={index} style={{display: 'flex'}}>
                <input type='checkbox' checked={item.completed} onChange={() => handleToggle(item.id, item.completed)} />
                <li style={{listStyle: 'none'}}>{item.task}</li>
                <button onClick={() => handleRemove(item.task)}>X</button>
              </div>
            )
          })
        }
        </ul>
      </div>
    </div>
  );
}

export default App;
