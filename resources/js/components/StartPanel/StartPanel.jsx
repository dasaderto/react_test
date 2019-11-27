import React, {Component} from 'react';

import './StartPanel.scss';
import {Button} from "@material-ui/core";

class StartPanel extends Component {
    render() {
        return (
            <div className={"start-page"}>
                start test?
                <Button onClick={()=>this.props.testStarter(18)}>Начать тест</Button>
            </div>
        );
    }
}

export default StartPanel;
