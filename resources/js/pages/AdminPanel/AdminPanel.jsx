import React, {Component} from 'react';

import {ProjectAppend} from "../../modules/";
import {createProject,fetchProjects} from '../../actions/admin-actions';
import {connect} from "react-redux";
import {store} from "../../reducers/rootReducer";

class AdminPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: "",
            user: {},
            projects: []
        };
    }

    componentDidMount() {
        this.props.fetchProjects();
        let isLoggedIn = false;
        let user = {};
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            isLoggedIn = AppState.isLoggedIn;
            user = AppState.user;
        }
        this.unsubscribe =store.subscribe(() => {
            this.setState({
                ...this.state,
                isLoggedIn,
                user,
                projects: store.getState().adminReducer.projects
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <div className="admin">
                <ProjectAppend onCreate={this.props.createProject}/>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return state
};

const mapActionsToProps = {
    createProject,
    fetchProjects
};

export default connect(mapStateToProps, mapActionsToProps)(AdminPanel);
