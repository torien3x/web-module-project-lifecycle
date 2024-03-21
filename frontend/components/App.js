import React from 'react'
import TodoList from './TodoList';
import Form from './Form';


const URL = 'http://localhost:9000/api/todos'


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
      error: null,
      hide: false,
      postData: {},
      patchData: {},
    }
  }

  addItem = (item) => {
    const newItem = {
      name: item,
      id: Date.now(),
      completed: false
    };
    this.setState({
      data: [...this.state.data, newItem]

    });
  };

  componentDidMount() {
    // Fetch data when the component mounts
    this.fetchData();
  }


  fetchData() {
    // Update state to indicate that data is being fetched
    this.setState({ loading: true, error: null });

    // Replace 'https://api.example.com/data' with the actual API endpoint
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Update state with the fetched data
        this.setState({ data: data.data, loading: false });
      })
      .catch((error) => {
        // Handle errors by updating state
        this.setState({ error, loading: false });
      });
  }

  handlePostRequest = (newData) => {
    // Update state to indicate that the request is in progress
    this.setState({ loading: true, error: null });

    // Replace 'https://api.example.com/postEndpoint' with your actual API endpoint
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        console.log(newData)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Update state with the response data
        this.setState({ response: data, loading: false });
      })
      .catch((error) => {
        // Handle errors by updating state
        this.setState({ error, loading: false });
      });
  };

  handleUpdateTodoRequest = (updatedData) => {
    // Update state to indicate that the request is in progress
    this.setState({ loading: true, error: null });

    // Replace 'https://api.example.com/patchEndpoint' with your actual API endpoint
    fetch(URL, {
      method: 'PATCH',
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Update state with the response data
        this.setState({ data, loading: false });
      })
      .catch((error) => {
        // Handle errors by updating state
        this.setState({ error, loading: false });
      });
  };

  handleUpdateTodoCompleteRequest = (item) => {
    // Update state to indicate that the request is in progress
    this.setState({ loading: true, error: null });
  
    // Replace 'https://api.example.com/patchEndpoint' with your actual API endpoint
    fetch(`http://localhost:9000/api/todos/${item.id}`, {
      method: 'PATCH',
      body: JSON.stringify(item),
    })
      .then((response) => {
        console.log("item", item)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Update state with the response data
        this.setState((prevState) => {
          const updatedData = prevState.data.map((todo) => {
            if (todo.id === item.id) {
              // Update the completed status for the specific item
              return { ...todo, completed: item.completed };
            }
            return todo;
          });
          console.log({ data: updatedData, loading: false })
          return { data: updatedData, loading: false };
        });
      })
      .catch((error) => {
        // Handle errors by updating state
        this.setState({ error, loading: false });
      });
  };
  

  toggleItem = itemId => {
    // this.setState({...this.state, todo: this.state.todo.map(item => {
    //   if (item.id === itemId) {
    //     return {...item, completed: !item.completed}
    //   }
    //   return item;
    // })})
    console.log(itemId)
    this.handleUpdateTodoCompleteRequest({id: itemId, completed: true})

    console.log('clicked')
  }

  toggleHide = () => {
    this.setState({hide: !this.state.hide})
  }

  
  
  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (!data) {
      return <p>No data available</p>;
    }

    return (
      <div>
        {error ? <p>Error: {error.message}</p> : null}
        <TodoList  data={data} toggleItem={this.toggleItem} hide={this.state.hide} />

        <Form addItem={this.addItem} handlePostRequest={this.handlePostRequest} />
        {!this.state.hide ? 
          <button onClick={this.toggleHide}>Hide Completed</button>
          : 
          <button onClick={this.toggleHide}>Show Completed</button>
          }
      </div>
    )
  }
}
