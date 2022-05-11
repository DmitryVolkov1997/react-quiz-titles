import React from "react";
import classes from "./QuizCreator.module.scss";
import Button from "../../components/UI/Button/Button";
import {
  createControl,
  validate,
  validateForm,
} from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Auxillary from "../../Auxillary/Auxillary";
import Select from "../../components/UI/Select/Select";
import axios from "../../../axios/axios-quiz";

export const titles = [];

function createOptionControl(number) {
  return createControl(
    {
      label: `Вариант ${number}`,
      errorMessage: "Значение не может быть пустым",
      id: number,
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: "Введите вопрос",
        errorMessage: "Вопрос не может быть пустым",
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
    option5: createOptionControl(5),
  };
}

class QuizCreator extends React.Component {
  state = {
    quiz: [],
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
    titles: "",
    inputTitleValue: "",
  };

  submitHandler = (e) => {
    e.preventDefault();
  };

  addQuestionHandler = (e) => {
    e.preventDefault();

    const quiz = this.state.quiz.concat();
    const index = quiz.length + 1;

    const { question, option1, option2, option3, option4, option5 } =
      this.state.formControls;

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      titles: this.state.titles,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
        { text: option5.value, id: option5.id },
      ],
    };

    quiz.push(questionItem);
    this.setState({
      quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
  };

  createQuizHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/quizes.json", this.state.quiz);
      this.setState({
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
        // titles: this.state.titles,
      });
    } catch (e) {
      console.log(e);
    }
  };

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

  renderControls = () => {
    return Object.keys(this.state.formControls).map((controlName, i) => {
      const control = this.state.formControls[controlName];

      return (
        <Auxillary key={controlName + i}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(e) => this.changeHandler(e.target.value, controlName)}
          />

          {i === 0 ? (
            <hr
              style={{
                borderBottom: "1.5px solid #ced4da",
              }}
            />
          ) : null}
        </Auxillary>
      );
    });
  };

  selectChangeHandler = (e) => {
    this.setState({
      rightAnswerId: +e.target.value,
    });
  };

  handleInputValue = (e) => {
    this.setState(
      {
        inputTitleValue: e.target.value,
      },
      () => this.onChangeTitle()
    );
  };

  onChangeTitle = (e) => {
    // if (e.keyCode === 13) {
    //   this.setState({
    //     titles: e.target.value,
    //   });
    // }

    // this.setState(
    //   {
    //     titles: this.state.inputTitleValue,
    //   },
    //   () => ({ titles: this.state.inputTitleValue })
    // );

    this.setState({
      titles: this.state.inputTitleValue,
    });
  };

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div className={classes.body}>
          <h1 className={classes.title}>Создать тест</h1>

          <form className={classes.form} onSubmit={this.submitHandler}>
            <div>
              <Input
                onChange={this.handleInputValue}
                value={this.state.inputTitleValue}
              />
              <Button width={"100%"} onClick={this.onChangeTitle}>
                Добавить заголовок
              </Button>
            </div>
            {this.renderControls()}

            <Select
              label="Выберите правильный ответ"
              value={this.state.rightAnswerId}
              onChange={this.selectChangeHandler}
              options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 },
                { text: 5, value: 5 },
              ]}
            />
            <div className={classes.buttons}>
              <Button
                type="primary"
                disabled={!this.state.isFormValid}
                onClick={this.addQuestionHandler}
              >
                Добавить вопрос
              </Button>
              <Button
                type="success"
                disabled={this.state.quiz.length === 0}
                onClick={this.createQuizHandler}
              >
                Создать тест
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;
