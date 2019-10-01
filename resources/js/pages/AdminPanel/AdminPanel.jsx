import React, {Component} from 'react';

import {ProjectAppend} from "../../modules/";
import {createProject} from '../../actions/admin-actions';
import {connect} from "react-redux";
import {store} from "../../reducers/rootReducer";

class AdminPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }
    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({
                ...this.state,
                isLoggedIn: AppState.isLoggedIn,
                user: AppState.user
            });
        }
    }

    render() {
        return (
            <div className="admin">
                <ProjectAppend  onCreate={this.props.onProjectCreate}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state
};

const mapActionsToProps = {
    onProjectCreate: createProject
};

export default connect(mapStateToProps, mapActionsToProps)(AdminPanel);
