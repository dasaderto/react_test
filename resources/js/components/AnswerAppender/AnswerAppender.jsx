import React, {Component} from 'react';
import {Field, FieldArray} from "formik";

import "./AnswerAppender.scss"

class AnswerAppender extends Component {

    render() {
        return (
            <div className={'answer-appender'}>
                <FieldArray
                    name={this.props.name}
                    render={arrayHelpers => (
                        <div>
                            {this.props.answers && this.props.answers.length > 0 ? (
                                this.props.answers.map((answer, index) => (
                                    <div key={index}>
                                        <Field name={`${this.props.name}.${index}`}/>
                                        <button
                                            type="button"
                                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                        >
                                            Удалить ответ
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => arrayHelpers.push('')} // insert an empty string at a position
                                        >
                                            Добавить ответ
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <button type="button" onClick={() => arrayHelpers.push('')}>
                                    Добавить ответ
                                </button>
                            )}
                        </div>
                    )}
                />
            </div>
        );
    }
}

export default AnswerAppender;
