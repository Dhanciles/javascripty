import React, { Component } from 'react';
import CardContainer from './CardContainer.js';
import './App.scss';

class App extends Component {
  constructor() {
    super(); 
    this.state = {
      userName: '',
      startReview: false,
      data: []
    }
  }

  componentWillMount = () => {
    this.getCards() 
  }; 

  getCards = () => {
    fetch("https://memoize-datasets.herokuapp.com/api/v1/javascripty")
    .then(response => response.json())
    .then( flashCards => {
      this.setState({
        data: flashCards.javascripty
      }); 
    })
    .catch(error => console.log(error))
  }; 

  handleChange = event => {
    this.setState({
      userName: event.target.value
    })
  }; 

  startSession = event => {
    event.preventDefault(); 
    this.setState({
      startReview: true
    })
  };
  

  render = () => {

    if (!this.state.startReview) {
      return (
        <div className="App">
          <article className="app-title-container"> 
            <h1 className="app-title">JAVASCRIPTY</h1>
          </article>
          <form onSubmit={this.startSession}>
           <input className="user-input" type="text" placeholder="Enter Your Name" onChange={this.handleChange}/>
           <button className="start-review-button">Start Reviewing</button>
          </form>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="app-header">
            <h1 className="app-title">JAVASCRIPTY</h1>
          </header>
          <article className="count-container">
            <h3 className="card-count">0/30 Cards Answered</h3>
          </article>
          <CardContainer data={this.state.data}/>
        </div>
      );
    }

  }; 
}


export default App;
