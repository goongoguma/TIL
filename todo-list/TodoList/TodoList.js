import React, {Component} from 'react';
import TodoItem from '../TodoItem';

class TodoList extends Component {
  render() {
    const{todos, onRemove} = this.props;
    const todoList = todos.map(todo => (<TodoItem key={todo.id} onRemove={()=>onRemove(todo.id)}>{todo.text}</TodoItem>))
    return (
      <div>
      {todoList}
      </div>
    )
  }
}

export default TodoList