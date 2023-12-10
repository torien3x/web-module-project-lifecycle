import React from 'react'

export default class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      item: ''
    }
  }

  handleChanges = e => {
    e.preventDefault();
    this.setState({...this.state, item: e.target.value})
  };

  submitForm = e => {
    e.preventDefault();
    const newData = {
      name: this.state.item,
      completed: false
    }
    console.log(newData);
    this.props.handlePostRequest(newData);
    this.props.addItem( this.state.item);
    this.setState({...this.state, item: ''})
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <input type='text' name='item' value={this.state.item} onChange={this.handleChanges} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
