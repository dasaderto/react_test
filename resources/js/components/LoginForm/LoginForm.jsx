import React, {Component} from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import "./LoginForm.scss";

class LoginForm extends Component {
    render() {
        return (
            <div className={'login-form'}>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().required('Поле Email обязательно для заполнения').email('Введите корректный email'),
                        password: Yup.string().required("Введите пароль")
                    })}
                    onSubmit={fields => {
                        this.props.onLogin(fields);
                    }}
                    render={({errors, status, touched}) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="text"
                                       className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                        placeholder={'test@test.ru'}/>
                                <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Пароль</label>
                                <Field name="password" type="password"
                                       className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}/>
                                <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary mr-2">Войти</button>
                            </div>
                        </Form>
                    )}
                />
            </div>
        );
    }
}

export default LoginForm;
