import React, {Component} from 'react';

import './Input.scss';

class Input extends Component {
    render() {
        return (
            <div className={this.props.inputClass}>
                <input type="text" value={this.props.value} onChange={this.props.onChange}/>
            </div>
        );
    }
}

export default Input;
