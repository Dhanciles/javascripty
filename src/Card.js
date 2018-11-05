import React, { Component } from "react"; 
import './Card.scss';

class Card extends Component {
  constructor() {
    super();
  }

  takeAnswer = (event) => {
    event.preventDefault(); 
    let selectedAnswer = event.target.name; 
    console.log(selectedAnswer)
  } 


  render = () =>  {
    let { id, question, category, answers } = this.props
    let options = answers.map(answer => {
      return <button name={answer} onClick={this.takeAnswer}>{answer}</button>
    }); 
    return (
      <div key={id} className="flash-card">
        <h2 className="flash-card-category">{category.toUpperCase()}</h2>
        <p className="flash-card-question">{question}</p>
        <div className="options-container">
          {options}
        </div>
      </div>
    );
  }
}

export default Card; 