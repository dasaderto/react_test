import React, {Component} from 'react';

class FileInput extends Component {
    render() {
        return (
            <div className={'fileinput'}>
                <input type="file" multiple onChange={this.props.onChange}/>
            </div>
        );
    }
}

export default FileInput;