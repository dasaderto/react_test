import React, {Component} from 'react';
import {CustomInput} from "../";
import {ErrorMessage} from "formik";

import "./ProjectSettings.scss";

class ProjectSettings extends Component {
    render() {
        return (
            <div className="uk-accordion-content">
                <div className="form__wrap">
                    <span className="form__title">Название проекта</span>
                    <CustomInput name={`${this.props.name}.projectName`}
                                 placeholder={"Введите Название проекта"}
                                 value={this.props.name.projectName}
                    />
                    <ErrorMessage name={`${this.props.name}.projectName`}/>
                </div>
                <div className="form__wrap">
                    <span className="form__title">URL проекта</span>
                    <CustomInput name={`${this.props.name}.url`} placeholder={"Введите Url проекта"} value={this.props.name.url}/>
                    <div className="check-wrap">
                        {/*<input type="checkbox"/> <span className=""> Галочка </span>*/}
                        {/*<input type="checkbox"/> <span className=""> Галочка </span>*/}
                    </div>
                    <ErrorMessage name={`${this.props.name}.url`}/>
                </div>
                <div className="form__wrap">
                    <div className="uk-form-select" data-uk-form-select>
                        <span className="form__title"> Тип анимации (переходов) </span>
                        <CustomInput name={`${this.props.name}.animateType`} placeholder={"Тип анимации"} value={this.props.name.animateType}/>
                        <ErrorMessage name={`${this.props.name}.animateType`}/>
                        {/*<select className="uk-select">*/}
                        {/*    <option value="">Печатная машинка 1</option>*/}
                        {/*    <option value="">Печатная машинка 2</option>*/}
                        {/*</select>*/}
                    </div>

                </div>
                <div className="form__wrap">
                    <span className="form__title">Куда отправлять заявки </span>
                    <CustomInput name={`${this.props.name}.email`} placeholder={"Email для ответов"} value={this.props.name.email}/>
                    <ErrorMessage name={`${this.props.name}.email`}/>
                </div>
                <div className="form__wrap">
                    <span className="form__title">Счетчик Яндекс.Метрики </span>
                    <CustomInput name={`${this.props.name}.metrics`} placeholder={"Яндекс метрика"} value={this.props.name.metrics}/>
                </div>
            </div>
        );
    }
}

export default ProjectSettings;
