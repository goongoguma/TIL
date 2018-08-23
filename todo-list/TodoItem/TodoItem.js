import React, {Component} from 'react';
import styles from './TodoItem.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class TodoItem extends Component {
  render() {
    const {children, onRemove} = this.props;
    return (
      <div className={cx('todo-item')}>
      <input type='checkbox' />
      <div className={cx('text')}>{children}</div>
      <button className={cx('delete')} onClick={onRemove}>remove</button>
      </div>
    );
  }
}

export default TodoItem;