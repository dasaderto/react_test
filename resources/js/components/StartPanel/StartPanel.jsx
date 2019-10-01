import React, {Component} from 'react';

import './StartPanel.scss';
import {Button} from "../index";

class StartPanel extends Component {

    handleStarterTest = ()=>{
        this.props.testStarter();
    };

    render() {
        return (
            <div className={"start-page"}>
                start test?
                <Button text={'Начать тест'} onClick={this.handleStarterTest}/>
            </div>
        );
    }
}

export default StartPanel;
