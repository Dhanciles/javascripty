import React, { Component } from "react";
import Card from './Card.js';
import './CardContainer.scss';

class CardContainer extends Component {

  render = () => {
    if (!this.props.selectedIncorrectCards) {
      let flashCards = this.props.data.map(question => {
        if (this.props.count === question.id) {
          return (
            <Card updateCard={this.props.updateCard} id={question.id} question={question.question} category={question.category} answers={question.answers} correctAnswer={question.correctAnswer} saveIncorrectCards={this.props.saveIncorrectCards}/>
            )
          }
        })
        return <div className="flash-card-container">{flashCards}</div>
      } else {
        let incorrectCards = this.props.incorrectCards.map(question => {
          return (
            <Card updateCard={this.props.updateCard} id={question.id} question={question.question} category={question.category} answers={question.answers} correctAnswer={question.correctAnswer} saveIncorrectCards={this.props.saveIncorrectCards}/>
            )
        })
        return <div className="flash-card-container">{incorrectCards}</div>
      }
    } 
}

export default CardContainer;