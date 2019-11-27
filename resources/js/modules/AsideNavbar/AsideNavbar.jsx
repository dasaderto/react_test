import React, {Component} from 'react';
import {ProjectsList} from "../../components";

class AsideNavbar extends Component {
    render() {
        return (
            <div className="left__aside">
                <a className="uk-navbar-toggle nav-toggle__btn" uk-navbar-toggle-icon="true"> </a>
                <ProjectsList projects={this.props.projects}/>
                <span className="left__balance"> Баланс
                        <span className="balance-bigger"> 250 &#8381; </span>
                    </span>
                <input type="button" value="Пополнить" name="refill" className="balance__btn"/>
                <a href="#" className="left__statistic">
                    <img className="stat__img" src="../img/stat.png"/>Статистика
                </a>
            </div>
        );
    }
}

export default AsideNavbar;
