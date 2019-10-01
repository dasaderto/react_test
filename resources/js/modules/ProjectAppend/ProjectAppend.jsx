import React, {Component} from 'react';
import {Field, FieldArray, Form, Formik} from "formik";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {AnswerAppender,ProjectSettings} from "../../components";

import "./ProjectAppend.scss"

class ProjectAppend extends Component {

    constructor(props){
        super(props);
        this.state = {
            askTypes: [
                {
                    type: 'test',
                    value: 'Один вариант из нескольких'
                },
                {
                    type: 'checkbox',
                    value: 'Несколько вариантов'
                },
                {
                    type: 'text',
                    value: 'Текстовое поле'
                },

            ],
        };
    }
    render() {
        return (
            <div className={'admin-project__append'}>
                <h1>Question List</h1>
                <Formik
                    initialValues={{
                        questions: [],
                        projectSettings: {
                            url:'',
                            animateType:'',
                            email:'',
                            metrics:''
                        }
                    }}
                    onSubmit={values => {
                        this.props.onCreate(values);
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                        }, 500)
                    }}
                    render={({values}) => (
                        <Form>
                            <ProjectSettings settings={values.projectSettings} name={'projectSettings'}/>
                            <FieldArray
                                name="questions"
                                render={arrayHelpers => (
                                    <div>
                                        {values.questions && values.questions.length > 0 ? (
                                            values.questions.map((question, index) => (
                                                <div key={index}>
                                                    <Field component='textarea' rows={3}
                                                           name={`questions[${index}].ask`}/>
                                                    <RadioGroup aria-label="ask-type">
                                                        {this.state.askTypes.map((type, askTypeIndex) => (
                                                            <FormControlLabel key={askTypeIndex} value={type.value}
                                                                              control={
                                                                                  <Field
                                                                                      type='radio'
                                                                                      name={`questions[${index}].askType`}/>
                                                                              } label={type.value}/>
                                                        ))}
                                                    </RadioGroup>
                                                    {(question.askType === this.state.askTypes[0].value || question.askType === this.state.askTypes[1].value) &&
                                                    <AnswerAppender answers={question.answers} name={`questions[${index}].answers`}/>}
                                                    <button type="button"
                                                            onClick={() => arrayHelpers.remove(index)} // remove a question from the list
                                                    >
                                                        Удалить вопрос
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => arrayHelpers.push({
                                                            ask: '',
                                                            askType: '',
                                                            answers: ['']
                                                        })} // insert an empty string at a position
                                                    >
                                                        Добавить вопрос
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <button type="button" onClick={() => arrayHelpers.push({
                                                ask: '',
                                                askType: '',
                                                answers: ['']
                                            })}>
                                                Добавить вопрос
                                            </button>
                                        )}
                                        <div>
                                            <button type="submit">Отправить</button>
                                        </div>
                                    </div>
                                )}
                            />
                        </Form>
                    )}
                />
            </div>
        );
    }
}

export default ProjectAppend;
