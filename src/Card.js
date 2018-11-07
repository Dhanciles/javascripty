import React, { Component } from "react"; 
import './Card.scss';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answeredCorrectly: false
    }
  }

  takeAnswer = (event) => {
    event.preventDefault(); 
    let { id, question, category, answers, correctAnswer } = this.props
    let selectedAnswer = event.target.name 
    if (selectedAnswer === correctAnswer) {
      this.setState({
        answeredCorrectly: true
      })
    } else {
      this.props.getIncorrectCards({id, question, category, answers, correctAnswer})
    }
    this.props.updateCard()
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