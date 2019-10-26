import React, {Component} from 'react';
import {connect} from 'react-redux';
import {store} from "../../reducers/rootReducer";
import {fetchQuestion, testStart} from "../../actions/question-actions";
import {login, register, logout} from "../../actions/auth-actions";
import './Home.scss';
import {Link} from "react-router-dom";
import {Switcher, StartPanel, TestOverPanel, LoginForm, RegisterForm} from "../../components";
import { Button } from '@material-ui/core';
import {createProject} from '../../actions/admin-actions';


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            user: {},
            questions: [],
            isTestStart: false,
            request: {
                question: '',
                answer: '',
                nullQuestion: 0,
                type: ''
            }
        };
    }

    handleLogin = (user) => {
        this.props.onLogin(user);
    };

    handleLogout = () =>{
        this.props.onLogout();
    };

    handleRegister = (user) => {
        this.props.onRegister(user);
    };

    testStarter = () => {
        this.props.testStart();
        this.setState({
            ...this.state,
            isTestStart: true
        })
    };

    testSwitcher = () => {
        let renderPack = null;

        if (this.state.questions.length) {
            if (this.state.questions.slice(-1)[0].ask === "LAST_RESPONSE") {
                renderPack = <TestOverPanel/>;
            } else {
                renderPack = <Switcher onSend={this.props.onFetchQuestion}
                                       question={this.state.questions.slice(-1)[0]}/>;
            }
        }

        return renderPack;
    };

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
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                ...this.state,
                questions: store.getState().questionReducer.questions,
                isLoggedIn: store.getState().authReducer.isLoggedIn,
                user: store.getState().authReducer.user,
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <div className={'home'}>
                {this.state.user.name &&
                    <div className="user">
                        <span>Приветики {this.state.user.name}</span>
                        <Button><Link to={'/admin'}>Погнали в админку</Link></Button>
                        <Button onClick={this.handleLogout}>Выйти</Button>
                    </div>
                }
                {!this.state.isTestStart ? <StartPanel testStarter={this.testStarter}/> : null}
                {this.testSwitcher()}
                <LoginForm onLogin={this.handleLogin}/>
                <RegisterForm onRegister={this.handleRegister}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state
};

const mapActionsToProps = {
    onFetchQuestion: fetchQuestion,
    onLogin: login,
    onRegister: register,
    onLogout: logout,
    testStart,
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
