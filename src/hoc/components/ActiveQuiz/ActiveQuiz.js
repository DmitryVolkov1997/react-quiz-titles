import classes from "./ActiveQuiz.module.scss";
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = (props) => {
  const {
    answers,
    question,
    onAnswerClick = Function.prototype,
    quizLength,
    answerNumber,
    state,
  } = props;

  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.ActiveQuiz__count}>
        Вопрос {answerNumber}/{quizLength}
      </p>
      <p className={classes.ActiveQuiz__question}>{question}</p>
      <AnswersList
        answers={answers}
        onAnswerClick={onAnswerClick}
        state={state}
      />
    </div>
  );
};

export default ActiveQuiz;
