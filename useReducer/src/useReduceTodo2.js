import React, { useState, useReducer } from 'react'

const reducer = (state, action) => {
  switch(action.type) {
    case 'TODO': 
      return [...state, { text: action.text, completed: false }] ;
    case 'TOGGLE_TODO':
      return state.map((item, idx) => idx === action.idx ? {...item, completed: !item.completed} : item)
  }
}

export default function Todo2() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [text, setText] = useState('');

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        dispatch({ type: 'TODO', text });
        setText('')
      }}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button type='submit'>submit</button>
      </form>
      {
        todos.map((item,idx) => {
          return (
            <p key={item.text} onClick={() => dispatch({type: 'TOGGLE_TODO', idx})} style={{textDecoration: item.completed ? 'line-through' : ''}}>
              {item.text}
            </p>
          )
        })
      }
    </div>
  )
}
