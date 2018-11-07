import React, { Component } from 'react';
import CardContainer from './CardContainer.js';
import './App.scss';

class App extends Component {
  constructor() {
    super(); 
    this.state = {
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

  startSession = (event) => {
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

  updateLocalStorage = (cards) => {

    let userQuestions = JSON.parse(localStorage.getItem('incorrect'))
    if (!userQuestions) {
      userQuestions = []
    }
    userQuestions.push(cards)
    localStorage.setItem('incorrect', JSON.stringify(userQuestions))
  }
  

  saveIncorrectCards = (obj) => {
    this.updateLocalStorage(obj)
  }

  startNewSession = () => {

  }


  render = () => {
    if (!this.state.startReview) {
      return (
        <div className="App">
          <article className="app-title-container"> 
            <h1 className="app-title">JAVASCRIPTY</h1>
          </article>
           <button className="start-review-button" onClick={this.startSession}>Start Reviewing</button>
        </div>
      );
    } else if (this.state.cardCount === 29){
      return (
        <div className="App">
          <header className="app-header">
            <h1 className="app-title">JAVASCRIPTY</h1>
          </header>
          <div className="review-container"> 
              <button className="incorrect-button">Review Incorrect Answers</button>
              <button className="new-session-button">Start New Session</button>
          </div>
        </div>
      ); 
    } else {
      return (
        <div className="App">
          <header className="app-header">
            <h1 className="app-title">JAVASCRIPTY</h1>
          </header>
          <article className="count-container">
            {/* <h3 className="card-count">{this.state.cardCount}/30 Cards Answered</h3> */}
          </article>
          <CardContainer data={this.state.data} count={this.state.cardCount} updateCard={this.updateCard} saveIncorrectCards={this.saveIncorrectCards}/>
        </div>
      );

    }
  }; 
}


export default App;
