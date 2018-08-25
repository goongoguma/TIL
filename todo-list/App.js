import React, {Component} from 'react';
import PageTemplate from './PageTemplate';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

class App extends Component {
  
  state = {
    input: '',
    todos: [{id:0, text:'having a breakfast'}, {id:1, text:'working out'}]
  }

  handleInput = (e) => {
    const{value} = e.target
    this.setState({
      input: value
    })
  }
  
  id=1;
  getId = () => ++this.id;
   
  handleNewInput = () => {
    const{input,todos} = this.state;
    const newTodo = {id:this.getId(), text: input};
    newTodo.text=== '' ? alert('Please enter the message'):
    (todos.find(todo => todo.text === newTodo.text) ? alert('It is already on the list'):this.setState({todos:[...todos,newTodo], input: ''}));
    }
  
  
    
  handleDelete = (id) => {
    const{todos} = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    this.setState({
      todos: [...todos.slice(0,index), ...todos.slice(index+1, todos.length)]
    });
  }
  

  render() {
    const {input,todos} = this.state;
    const {handleInput,handleNewInput,handleDelete,buttonNotavailable } = this;
    return (
      <PageTemplate>
        <TodoInput value={input} onChange={handleInput} onClick={handleNewInput} disAbled={buttonNotavailable}/>
        <TodoList todos={todos} onRemove={handleDelete}/>
      </PageTemplate>
    )
  }
}

export default App