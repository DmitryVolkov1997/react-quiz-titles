import classes from "./FinishedQuiz.module.scss";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";
import { IoClose, IoChevronDownSharp } from "react-icons/io5";

const FinishedQuiz = (props) => {
  const { onRetry, results, quiz } = props;
  const successCount = Object.keys(results).reduce((total, key) => {
    if (results[key] === "success") {
      total++;
    }

    return total;
  }, 0);

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {quiz.length &&
          quiz.map((quizItem, i) => {
            // const cls = ["fa", results[quizItem.id] === "error" ? "fa-times" : "fa-check", classes[results[quizItem.id]]];
            return (
              <li className={classes.FinishedQuiz__item} key={i}>
                <strong>{i + 1}.&nbsp;</strong>
                {quizItem.question}
                {results[quizItem.id] === "success" ? (
                  <IoChevronDownSharp className={classes.success} />
                ) : (
                  <IoClose className={classes.error} />
                )}
              </li>
            );
          })}
      </ul>
      <div className={classes.borderTop}>
        <p className={classes.FinishedQuiz__count}>
          Правильно {successCount} из {quiz.length}
        </p>
        <div className={classes.buttons}>
          <Button onClick={onRetry} type="primary">
            Повторить
          </Button>
          <Button type="success">
            <Link to={"/"}>Перейти в список тестов</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinishedQuiz;
