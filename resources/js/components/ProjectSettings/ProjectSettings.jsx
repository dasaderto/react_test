import React, {Component} from 'react';
import {Field, FieldArray, Form, Formik} from "formik";

import "./ProjectSettings.scss";

class ProjectSettings extends Component {
    render() {
        return (
            <div className={this.props.name}>
                <Field name={`${this.props.name}.url`} placeholder={"Введите Url проекта"}/>
                <Field name={`${this.props.name}.animateType`} placeholder={"Тип анимации"}/>
                <Field name={`${this.props.name}.email`} placeholder={"Email для ответов"}/>
                <Field name={`${this.props.name}.metrics`} placeholder={"Яндекс метрика"}/>
            </div>
        );
    }
}

export default ProjectSettings;
