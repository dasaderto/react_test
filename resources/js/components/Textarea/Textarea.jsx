import React, {Component} from 'react';

import './Textarea.scss';

class Textarea extends Component {
    render() {
        return (
            <div className={"text-answer"}>
                <textarea value={this.props.value} onChange={this.props.onChange}></textarea>
            </div>
        );
    }
}

export default Textarea;