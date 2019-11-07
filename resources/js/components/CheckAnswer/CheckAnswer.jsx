import React, {Component} from 'react';
import {TestAnswer} from "../index";

class CheckAnswer extends Component {

    constructor(props){
        super(props);

        this.answers = [];
    }

    handleCheck(e){
        if(e.target.checked){
            this.answers.push(e.target.dataset.content);
            this.props.onCheck(this.answers);
        }else{
            this.answers = this.answers.filter(el => el!==e.target.dataset.content);
            this.props.onCheck(this.answers);
        }
    }

    handleShow(){
        let answerBox = this.props.question.answer.map((answer) => {
            return (
                <label key={answer.toString()} onClick={(e)=>this.handleCheck(e)}>
                    {answer}
                    <input type={'checkbox'} data-content={answer}/>
                </label>
                )
        });

        return answerBox;
    }

    render() {
        return (
            <div className={"check-answer__box"}>
                {this.handleShow()}
            </div>
        );
    }
}

export default CheckAnswer;
