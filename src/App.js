import React, { Component } from 'react';
import CardContainer from './CardContainer.js';
import './App.scss';

class App extends Component {
  constructor() {
    super(); 
    this.state = {
      userName: '',
      startReview: false,
      data: [], 
      cardCount: 0, 
      incorrectCards: [] 
    }
  }

  componentDidMount = () => {
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
    this.updateLocalStorage(this.state.userName)
  }; 

  startSession = event => {
    event.preventDefault(); 
    this.setState({
      startReview: true
    })
  };

  updateCard = () => {
    let count = this.state.cardCount; 
    if (this.state.cardCount < 29 ) {
      count++ 
    } 
    this.setState({
      cardCount: count
    })
  }

  updateLocalStorage = (name, cards) => {
    localStorage.setItem('name', name)
    localStorage.setItem('incorrectly answered cards', cards)
  }


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
            <h3 className="card-count">{this.state.cardCount}/30 Cards Answered</h3>
          </article>
          <CardContainer data={this.state.data} count={this.state.cardCount} updateCard={this.updateCard}/>
        </div>
      );
    }

  }; 
}


export default App;
