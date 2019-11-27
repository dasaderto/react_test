import React, {Component} from 'react';

import {ProjectAppend, Nav, AsideNavbar} from "../../modules/";
import {ProjectsList} from "../../components"
import {createProject, fetchProjects} from '../../actions/admin-actions';
import {logout} from "../../actions/auth-actions";
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
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                ...this.state,
                projects: store.getState().adminReducer.projects
            });
        });
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

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <div className="admin">
                <Nav user={this.state.user} handleLogout={this.props.logout}/>
                <div className={'home'}>
                    <AsideNavbar projects={this.state.projects}/>
                    <div className="main-content clearfloat">
                        <ProjectAppend onCreate={this.props.createProject}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state
};

const mapActionsToProps = {
    createProject,
    fetchProjects,
    logout
};

export default connect(mapStateToProps, mapActionsToProps)(AdminPanel);
