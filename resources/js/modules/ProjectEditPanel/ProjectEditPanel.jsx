import React, {Component} from 'react';
import {FieldArray, Form, Formik} from "formik";
import {CustomInput, ProjectSettings, CustomTextarea, CustomRadio, AnswerAppender} from "../../components";
import {RadioGroup, Button} from "@material-ui/core";

class ProjectEditPanel extends Component {
    constructor(props) {
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
        const initValues = this.props.project;
        return (
            <div className="main-content clearfloat">
                <Formik
                    initialValues={{
                        questions: initValues.questions,
                        projectSettings: {
                            url: initValues.test_link,
                            animateType: initValues.animation_type,
                            email: initValues.sender_email,
                            metrics: initValues.ya_counter
                        }
                    }}

                    onSubmit={values => {
                        values.questions.forEach((question, index) => {
                            question.answers = question.answers.filter(el => el !== "");
                            if (question.type === 'text') question.answers = [];
                        });
                        values.projectId = +this.props.id;
                        console.log(values);
                        this.props.onUpdate(values);
                    }}>
                    {({values, setFieldValue, handleChange}) => (
                        <Form>

                            <h1 className="sec__main-title">
                                {this.props.project.test_name}
                            </h1>
                            <ul uk-accordion="multiple: true">
                                <li>
                                    <a href="#" className="uk-accordion-title">
                                        Настройки проекта
                                        <i className="uk-icon-angle-up icon-animation"></i>
                                    </a>
                                    <ProjectSettings settings={values.projectSettings} name={'projectSettings'}/>
                                </li>
                                <FieldArray
                                    name="questions"
                                    render={arrayHelpers =>
                                            {values.questions ? values.questions.map((el, index) => (
                                                <li key={index}>
                                                    <a href="#" className="uk-accordion-title">
                                                        {index + 1}. {el.ask}
                                                        <i className="uk-icon-angle-down icon-animation"></i>
                                                    </a>
                                                    <div className="uk-accordion-content">
                                                        <CustomTextarea name={`questions[${index}].ask`}
                                                                        value={el.ask}/>
                                                        <div className="form__wrap">
                                                            <span className="form__title"> Тип ответа </span>
                                                            <RadioGroup aria-label="ask-type">
                                                                {this.state.askTypes.map((type, askTypeIndex) => (
                                                                    <div className="type-answer__wrap"
                                                                         key={askTypeIndex}>
                                                                        <CustomRadio checked={el.type === type.type}
                                                                                     name={`questions[${index}].type`}
                                                                                     type='radio' value={type.type}
                                                                                     label={type.value}
                                                                                     className="type-answer"
                                                                                     onChange={(e) => {
                                                                                         setFieldValue(`questions[${index}].askType`, e.target.value)
                                                                                     }}
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </RadioGroup>
                                                        </div>
                                                        {(el.type === this.state.askTypes[0].type || el.type === this.state.askTypes[1].type) ?
                                                            <AnswerAppender answers={el.answers}
                                                                            name={`questions[${index}].answers`}/>
                                                            : null}
                                                        <Button variant="contained" color="primary" type="button"
                                                                onClick={() => arrayHelpers.remove(index)} // remove a question from the list
                                                        >
                                                            Удалить вопрос
                                                        </Button>
                                                        <Button
                                                            variant="contained" color="primary"
                                                            type="button"
                                                            onClick={() => arrayHelpers.push({
                                                                ask: '',
                                                                askType: 'test',
                                                                answers: ['']
                                                            })}
                                                        >
                                                            Добавить вопрос
                                                        </Button>
                                                    </div>
                                                </li>
                                            )) : null}
                                    }/>
                            </ul>
                            <Button variant="contained" color="primary" className="save-data"
                                    type="submit">Сохранить</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

export default ProjectEditPanel;
