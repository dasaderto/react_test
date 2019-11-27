import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

class Nav extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <header className="nav">
                {this.props.user.name && (
                    <header className="header">
                        <div className="header-container">
                            <div className="head__left">
                                <div className="avatar-wrap">
                                    <img className="avatar-wrap__img" src="../img/avatar.jpg"/>
                                </div>
                                <div className="about">
                                    <span className="profile-name"> {this.props.user.name} </span>
                                    <span className="profile-creature"> создан 2 дня назад </span>
                                </div>
                            </div>
                            <div className="head__right">
                                <div className="right__tests">
                                    <img className="right__icon" src="../img/test.jpg"/>
                                    <a href="#" className="right__text">Мои тесты</a>
                                </div>
                                <div className="right__settings">
                                    <img className="right__icon" src="../img/setting.jpg"/>
                                    <a href="#" className="right__text">Настройки</a>
                                </div>
                            </div>
                            <div className="userdata">
                                <Button><Link to={'/admin'}>Погнали в админку</Link></Button>
                                <Button onClick={this.props.handleLogout}><Link to={'/'}>Выйти</Link></Button>
                            </div>
                        </div>
                    </header>
                )}
            </header>
        );
    }
}

export default Nav;

