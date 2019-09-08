import React, {Component} from 'react';
import {connect} from 'react-redux';
import {store} from "../../reducers/rootReducer";
import {fetchQuestion, testStart} from "../../actions/question-actions";
import './Home.scss';
import {Switcher, TestAnswer} from "../";


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            request: {
                question: '',
                answer: '',
                nullQuestion: 0,
                type: ''
            }
        };
    }

    componentDidMount() {
        this.props.testStart();
        store.subscribe(() => {
            this.setState({
                ...this.state,
                questions: store.getState().questionReducer.questions,
            });
        });
    }

    render() {
        return (
            <div className={'home'}>
                {this.state.questions.length > 0 && <Switcher onSend={this.props.onFetchQuestion}
                           question={this.state.questions.slice(-1)[0]}/>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state
};

const mapActionsToProps = {
    onFetchQuestion: fetchQuestion,
    testStart
};

export default connect(mapStateToProps, mapActionsToProps)(Home);