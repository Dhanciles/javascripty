import React, { Component } from "react";
import Card from './Card.js';
import './CardContainer.scss';



class CardContainer extends Component {
  constructor() {
    super(); 
  }

  render = () => {
    let flashCards = this.props.data.map(question => {
      return (
          <Card id={question.id} question={question.question} category={question.category} answers={question.answers}/>
        )
    }).splice(0, 1)
    return <div className="flash-card-container">{flashCards}</div>
  }

}

export default CardContainer;