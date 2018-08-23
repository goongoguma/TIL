import React from 'react';
import styles from './TodoInput.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const TodoInput = ({value, onChange, onClick}) => {
  return (
    <div className={cx('todo-input')}>
    <input type='text' value={value} onChange={onChange} placeholder={'What are you going to do?'}/>
    <button className={cx('add-button')} onClick={onClick}>add</button>
  </div>
  )
}

export default TodoInput;