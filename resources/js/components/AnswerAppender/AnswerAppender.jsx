import React, {Component} from 'react';
import {FieldArray} from "formik";
import {Button} from "@material-ui/core";
import {CustomInput} from "../";

import "./AnswerAppender.scss"

class AnswerAppender extends Component {

    render() {
        return (
            <div className={'answer-appender'}>
                <FieldArray
                    name={this.props.name}
                    render={arrayHelpers => (
                        <div className={'answers'}>
                            {this.props.answers && this.props.answers.length > 0 ? (
                                this.props.answers.map((answer, index) => (
                                    <div key={index} className="form__wrap">
                                        <span className="form__title"> Ответ {index + 1} </span>
                                        <CustomInput name={`${this.props.name}.${index}`}
                                                     placeholder={"Введите вариант ответа"}/>
                                        <Button
                                            type="button"
                                            onClick={() => arrayHelpers.remove(index)}
                                        >
                                            Удалить ответ
                                        </Button>
                                        {(index === this.props.answers.length-1) ? (
                                            <Button
                                                type="button"
                                                onClick={() => arrayHelpers.push('')}
                                            >
                                                Добавить ответ
                                            </Button>
                                        ):null}
                                    </div>
                                ))
                            ) : (
                                <Button type="button" onClick={() => arrayHelpers.push('')}>
                                    Добавить ответ
                                </Button>
                            )}
                        </div>
                    )}
                />
            </div>
        );
    }
}

export default AnswerAppender;
