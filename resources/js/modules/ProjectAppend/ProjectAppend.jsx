import React, {Component} from 'react';
import {ErrorMessage, Field, FieldArray, Form, Formik, validateYupSchema} from "formik";
import {RadioGroup, Button} from "@material-ui/core/";
import {AnswerAppender, ProjectSettings, CustomRadio} from "../../components";
import {StyleSheet, css} from 'aphrodite';
import * as Yup from 'yup';

import "./ProjectAppend.scss"
import {fadeInUp, fadeOutUp} from "react-animations";

const styles = StyleSheet.create({
    textarea: {
        display: "block",
        width: "30%",
        height: "auto",
        padding: ".375rem .75rem",
        fontSize: "1rem",
        fontWeight: "400",
        lineHeight: "1.5",
        color: "#495057",
        backgroundColor: "#fff",
        backgroundClip: "padding-box",
        border: "1px solid #ced4da",
        borderRadius: ".25rem",
        transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out"
    }
});

let validateProjectSchema = Yup.object().shape({
    questions: Yup.array()
        .of(Yup.object().shape({
            ask: Yup.string()
                .required("Заполните поле вопрос")
                .min(3, "Минимальная длина вопроса 3 символа")
                .max(100, "Максимальная длина вопроса 100 символов"),
            askType: Yup.string()
                .required("Выберите тип ответа"),
            answers: Yup.array().of(Yup.string().min(1, "Ответ не может быть пустым")).min(2, "Введите хотя бы один ответ")
        }))
        .min(1, "В тесте должен быть хотя бы один вопрос"),
    projectSettings:Yup.object().shape({
        projectName:Yup.string().required('Введите название проекта'),
        url:Yup.string().required('Введите url'),
        email:Yup.string().email("Некорректный email")
    })
});

class ProjectAppend extends Component {

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
        return (
            <div className={'admin-project__append'}>
                <h1>Question List</h1>
                <Formik
                    initialValues={{
                        questions: [],
                        projectSettings: {
                            projectName: '',
                            url: '',
                            animateType: '',
                            email: '',
                            metrics: ''
                        }
                    }}
                    validationSchema={validateProjectSchema}
                    validateOnChange={true}
                    onSubmit={(values) => {
                        // values = values.questions.map((question) => {
                        //     return question.answers = question.answers.filter(el => el !== "");
                        // });
                        console.log(values);
                    }}>
                    {({values, errors, setFieldValue, setStatus}) => (
                        <Form>
                            {console.log(errors)}
                            <ProjectSettings settings={values.projectSettings} name={'projectSettings'}/>
                            <FieldArray
                                name="questions"
                                render={arrayHelpers => (
                                    <div>
                                        {values.questions && values.questions.length > 0 ? (
                                            values.questions.map((question, index) => (
                                                <div key={index}>
                                                    <Field className={css(styles.textarea)} component='textarea'
                                                           rows={3}
                                                           name={`questions[${index}].ask`}
                                                           placeholder={"Введите вопрос"}/>
                                                    <ErrorMessage name={`questions[${index}].ask`}/>
                                                    <RadioGroup aria-label="ask-type">
                                                        {this.state.askTypes.map((type, askTypeIndex) => (
                                                            <CustomRadio checked={!askTypeIndex} key={askTypeIndex}
                                                                         name={`questions[${index}].askType`}
                                                                         type='radio' value={type.type}
                                                                         label={type.value}
                                                                         onChange={(e) => {
                                                                             if (e.target.value !== this.state.askTypes[2].type)
                                                                                 validateProjectSchema.validate({questions: values.questions}).catch(err => setStatus(err));
                                                                             setFieldValue(`questions[${index}].askType`, e.target.value)
                                                                         }}
                                                            />
                                                        ))}
                                                    </RadioGroup>
                                                    {((question.askType === this.state.askTypes[0].type || question.askType === this.state.askTypes[1].type)) ? (
                                                        <AnswerAppender answers={question.answers}
                                                                        name={`questions[${index}].answers`}/>
                                                    ) : null}
                                                    <ErrorMessage name={`questions[${index}].answers`}/>
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
                                                        })} // insert an empty string at a position
                                                    >
                                                        Добавить вопрос
                                                    </Button>
                                                </div>
                                            ))
                                        ) : (
                                            <Button variant="contained" color="primary" type="button"
                                                    onClick={() => arrayHelpers.push({
                                                        ask: '',
                                                        askType: 'test',
                                                        answers: ['']
                                                    })}>
                                                Добавить вопрос
                                            </Button>
                                        )}
                                        <div>
                                            <Button variant="contained" color="primary" type="submit">Отправить</Button>
                                        </div>
                                        {/*<ErrorMessage name={'questions'}/>*/}
                                    </div>
                                )}
                            />
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

export default ProjectAppend;
