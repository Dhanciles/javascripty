import React, { Component } from "react";
import Card from './Card.js';
import './CardContainer.scss';



class CardContainer extends Component {
  constructor(props) {
    super(props); 
  }

  checkAnswer = (selection) => {
    console.log('hi'); 
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