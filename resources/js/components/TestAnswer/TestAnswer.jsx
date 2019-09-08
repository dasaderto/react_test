import React, {Component} from 'react';

import './TestAnswer.scss';

class TestAnswer extends Component {
    render() {
        return (
            <div className={'test-answer'} onClick={this.props.onClick}>
                {this.props.variant}
            </div>
        );
    }
}

export default TestAnswer;