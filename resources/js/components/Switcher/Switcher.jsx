import React, {Component} from 'react';
import {Input, FileInput, TestAnswer, Textarea, Button} from '../';
import {fadeInUp, fadeOutUp} from 'react-animations';
import {StyleSheet, css} from 'aphrodite';
import './Switcher.scss';
import {CheckAnswer} from "../";

const styles = StyleSheet.create({
    fadeInUp: {
        animationName: fadeInUp,
        animationDuration: '0.5s',
        opacity: 1
    },
    fadeOutUp: {
        animationName: fadeOutUp,
        animationDuration: '0.5s',
        opacity: 0
    }
});

class Switcher extends Component {

    constructor(props) {
        super(props);

        this.state = {
            animateOut: false,
            request: {
                files: [],
                question: '',
                answer: "",
                nullQuestion: 0,
                type: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleInputSubmit = this.handleInputSubmit.bind(this);
        this.handleTestAnswerClick = this.handleTestAnswerClick.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.question !== this.props.question && this.state.animateOut === true) {
            this.setState({
                ...this.state,
                animateOut: false,
                request: {
                    ...this.state.request,
                    answer: '',
                }
            });
        }
    }

    handleTestAnswerClick = (e) => {
        e.preventDefault();
        let request = {
            question: this.props.question.ask,
            answer: [e.target.innerText],
            nullQuestion: this.props.question.nullQuestion,
            type: this.props.type
        };

        this.nullAndSend(request);
    };

    handleChange = (e) => {
        this.setState({
            ...this.state,
            request: {
                ...this.state.request,
                answer: [e.target.value],
            }
        });
    };

    handleFileSelect = (e) => {
        this.setState({
            ...this.state,
            request: {
                ...this.state.request,
                files: [...this.state.request.files, ...e.target.files]
            }
        });
    };

    handleChecked(answers){
        this.setState({
            ...this.state,
            request: {
                ...this.state.request,
                answer: answers
            }
        });
    }

    handleInputSubmit = (e) => {
        e.preventDefault();

        if (this.props.question.type === 'file') {
            return this.fileUploader();
        }

        let request = {
            question: this.props.question.ask,
            answer: this.state.request.answer,
            nullQuestion: this.props.question.nullQuestion,
            type: this.props.type
        };

        return this.nullAndSend(request);
    };

    nullAndSend = (data) => {
        this.setState({
            ...this.state,
            animateOut: true,
            request: {
                ...this.state.request,
                answer: '',
            }
        });
        this.props.onSend(data);
    };

    fileUploader = () => {
        let data = new FormData();

        if (this.state.request.files)
            this.state.request.files.map((el) => data.append('fileData[]', el));
        data.append('question', this.props.question.ask);
        data.append('answer', '');
        data.append('nullQuestion', this.props.question.nullQuestion);
        data.append('type', 'file');

        return this.nullAndSend(data);
    };

    renderQuestionItem = () => {
        let answerPanel = [];
        switch (this.props.question.type) {
            case 'test':
                answerPanel = this.props.question.answer.map((answer) => {
                    return <TestAnswer key={answer.toString()} variant={answer} onClick={this.handleTestAnswerClick}/>
                });
                break;
            case 'checkbox':
                answerPanel = <CheckAnswer question={this.props.question} onCheck={this.handleChecked}/>;
                break;
            case 'text':
                answerPanel = <Input inputClass={"text-answer"} value={this.state.request.answer} onChange={this.handleChange}/>;
                break;
            case 'textarea':
                answerPanel = <Textarea value={this.state.request.answer} onChange={this.handleChange}/>;
                break;
            case'file':
                answerPanel = <FileInput onChange={this.handleFileSelect}/>;
                break;
            default:
                return null;
        }
        return answerPanel;
    };

    render() {
        return (
            <div className={this.state.animateOut ? css(styles.fadeOutUp) : css(styles.fadeInUp)}>
                <div className={'answer-container'}>
                    <div className="ask">
                        {this.props.question.ask}
                    </div>
                    {this.renderQuestionItem()}
                    {(this.props.question.type !== 'test') ?
                        <Button text={'Дальше'} onClick={this.handleInputSubmit}/> : null}
                </div>
            </div>
        );
    }
}

export default Switcher;
