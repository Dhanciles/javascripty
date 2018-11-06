import React, { Component } from "react";
import Card from './Card.js';
import './CardContainer.scss';

class CardContainer extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      correctSelections: [], 
      incorrectSelections: []
    }
  }

  checkAnswer = (selection) => {
    console.log('hi'); 
    // check if the selection matches data.corectAsnwer
    // if it does we want to add to our correct answers 
    // if it doesnt we want to add to our incorrect answers
  }

  render = () => {
    let flashCards = this.props.data.map(question => {
      if (this.props.count === question.id) {
        return (
          <Card updateCard={this.props.updateCard} id={question.id} question={question.question} category={question.category} answers={question.answers} checkAnswer={this.checkAnswer}/>
        )
      }
    })
    return <div className="flash-card-container">{flashCards}</div>
  }

}

export default CardContainer;