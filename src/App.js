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
      incorrectCards: [], 
      selectedIncorrectCards: false
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

  reviewIncorrectCards = (event) => {
    event.preventDefault()
    let incorrectSelections = JSON.parse(localStorage.getItem('incorrect'))
    this.setState({
      cardCount: incorrectSelections.length, 
      incorrectCards: incorrectSelections, 
      selectedIncorrectCards: true
    })
  }

  startNewSession = (event) => {
    event.preventDefault(); 
    this.setState({
      cardCount: 0
    })
    localStorage.clear(); 
  }


  render = () => {
    if (!this.state.startReview) {
      return (
        <div className="App">
          <article className="app-title-container"> 
            <h1 className="app-title">JAVASCRIPTY</h1>
            <h3>Improve Your Technical Javascript Vocabulary</h3>
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
              <button className="incorrect-button"onClick={this.reviewIncorrectCards}>Review Incorrect Answers</button>
              <button onClick={this.startNewSession} className="new-session-button">Start New Session</button>
          </div>
        </div>
      ); 
    } else {
      return (
        <div className="App">
          <header className="app-header">
            <h1 className="app-title">JAVASCRIPTY</h1>
          </header>
          <CardContainer data={this.state.data} count={this.state.cardCount} updateCard={this.updateCard} saveIncorrectCards={this.saveIncorrectCards} incorrectCards={this.state.incorrectCards} selectedIncorrectCards={this.state.selectedIncorrectCards}/>
        </div>
      );

    }
  }; 
}


export default App;
