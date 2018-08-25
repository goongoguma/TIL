import React from 'react';
import styles from './TodoInput.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const TodoInput = ({value, onChange, onClick}) => {
  
  const handleKeypress = (e) => {
    if(e.key==='Enter') {
      onClick()
    }
  }
  return (
    <div className={cx('todo-input')}>
    <input type='text' value={value} onChange={onChange} placeholder={'What are you going to do?'} onKeyPress={handleKeypress}/>
    <button className={cx('add-button')} onClick={onClick}>add</button>
  </div>
  )
}

export default TodoInput;