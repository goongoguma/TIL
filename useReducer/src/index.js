import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Todo from './useReducerTodo';
import Todo2 from './useReduceTodo2';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Todo /> */}
    <Todo2 />
  </React.StrictMode>,
  document.getElementById('root')
);
