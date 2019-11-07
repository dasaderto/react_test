import React, {Component} from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import "./RegisterForm.scss";

class RegisterForm extends Component {
    render() {
        return (
            <div className={'register-form'}>
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        password_confirmation: '',
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string()
                            .required('Введите Имя'),
                        email: Yup.string()
                            .email('Email некорректно заполнен')
                            .required('Введите Email'),
                        password: Yup.string()
                            .min(8, 'Длина пароля должна быть не менее 8 символов')
                            .required('Введите пароль'),
                        password_confirmation:  Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Введенные пароли не совпадают')
                            .required('Повторите ввод пароля!')
                    })}
                    onSubmit={fields => {
                        this.props.onRegister(fields);
                    }}
                    render={({errors, status, touched}) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="username">Bведите Имя</label>
                                <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                <ErrorMessage name="username" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Пароль</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password_confirmation">Подтверждение пароля</label>
                                <Field name="password_confirmation" type="password" className={'form-control' + (errors.password_confirmation && touched.password_confirmation ? ' is-invalid' : '')} />
                                <ErrorMessage name="password_confirmation" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary mr-2">Зарегистрироваться</button>
                                <button type="reset" className="btn btn-secondary">Cбросить</button>
                            </div>
                        </Form>
                    )}
                />
            </div>
        );
    }
}

export default RegisterForm;
