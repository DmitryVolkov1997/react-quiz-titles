import classes from "./ActiveQuiz.module.scss";
import AnswersList from "./AnswersList/AnswersList";


const ActiveQuiz = (props) => {
    const {answers, question, onAnswerClick = Function.prototype, quizLength, answerNumber, state} = props;

    return (
      <div className={classes.ActiveQuiz}>
          <p className={classes.question}>
              <span>
                  <strong>{answerNumber}.&nbsp;{question}</strong>&nbsp;
              </span>
              <small>{answerNumber} из {quizLength}</small>
          </p>

          <AnswersList answers={answers} onAnswerClick={onAnswerClick} state={state}/>
      </div>
    );
};

export default ActiveQuiz;
