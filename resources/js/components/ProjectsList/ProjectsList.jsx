import React, {Component} from 'react';
import {Grid, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText} from "@material-ui/core";
import FolderIcon from '@material-ui/icons/Folder';
import {Link} from "react-router-dom";

class   ProjectsList extends Component {

    render() {
        console.log(this.props.projects);
        return (
            <ul className="navigation uk-panel">
                {this.props.projects.length ? this.props.projects.map((project) => (
                    <li key={project.id} >
                        <ListItemAvatar>
                            <Link className={'nav__item'} to={`/admin/project/${project.id}`}>
                                <Avatar>
                                    <FolderIcon/>
                                </Avatar>
                                {project.test_name}
                            </Link>
                        </ListItemAvatar>
                    </li>
                )) : null}
            </ul>
        );
    }
}

export default ProjectsList;
