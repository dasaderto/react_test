import React, {Component} from 'react';
import {connect} from "react-redux";
import {editProject,fetchProjects,updateProject} from "../../actions/admin-actions";
import {store} from "../../reducers/rootReducer";
import {css, StyleSheet} from "aphrodite";
import {AsideNavbar, Nav, ProjectAppend,ProjectEditPanel} from "../../modules";

const styles = StyleSheet.create({
    paperStyle: {
        padding: "15px"
    }
});

class ProjectEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projectId:this.props.match.params.id,
            projects: {},
            project: {},
            isLoggedIn: false,
            user: {}
        }
    }

    componentDidMount() {
        let projectId = this.state.projectId;
        this.props.fetchProjects();
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.unsubscribe = store.subscribe(() => {
                this.setState({
                    ...this.state,
                    projects: store.getState().adminReducer.projects,
                    project: store.getState().adminReducer.projects.find((el)=> el.id == projectId),
                    isLoggedIn: AppState.isLoggedIn,
                    user: AppState.user
                });
            });
        }else{
            this.unsubscribe = store.subscribe(() => {
                this.setState({
                    ...this.state,
                    projects: store.getState().adminReducer.projects,
                    project: store.getState().adminReducer.projects.find((el)=> el.id == projectId),
                });
            });
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    render() {
        return (
            <div className={'project-edit'}>
                <Nav user={this.state.user}/>
                <div className={'home'}>
                    <AsideNavbar projects={this.state.projects}/>
                    {/*<div className="uk-width-3-4 uk-container  main-content clearfloat">*/}
                    {/*    <ProjectAppend onCreate={this.props.createProject}/>*/}
                    {/*</div>*/}
                    {this.state.project.questions && <ProjectEditPanel project={this.state.project} id={this.state.projectId} onUpdate={this.props.updateProject}/>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state
};

const mapActionsToProps = {
    editProject,
    fetchProjects,
    updateProject
};

export default connect(mapStateToProps, mapActionsToProps)(ProjectEdit);
