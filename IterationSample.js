import React, {Component} from 'react'

class IterationSample extends Component {

  state = {
    names : ['영희','미희','철수','맹구'],
    name: ''
  }
  handleChange = (e) => {
    this.setState({
      name : e.target.value
    });
  }
  handleClick = () => {
    this.setState({
      names: this.state.names.concat(this.state.name),
      name: ''
    })
  }
  handleRemove = (index) => {
    const{names} = this.state;
    this.setState({
      names: names.filter((item, i) => i !== index)
    });
  }
  render() {
    const namesList = this.state.names.map((name,index) => (<li key={index}
    onDoubleClick={() => this.handleRemove(index)}>{name}</li>));
    return (
      <div>
      <input value={this.state.name} onChange={this.handleChange}/>
      <button onClick={this.handleClick}>add</button>
      <ul>
      {namesList}
      </ul>
      </div>
    )
  }
}

export default IterationSample;