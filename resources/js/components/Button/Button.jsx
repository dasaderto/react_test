import React, {Component} from 'react';

class FileInput extends Component {
    render() {
        return (
            <button className="btn btn-outline-secondary" onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
}

export default FileInput;
