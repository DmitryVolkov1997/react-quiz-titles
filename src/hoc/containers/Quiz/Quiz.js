import React, {useState, useEffect} from "react";
import classes from "./Quiz.module.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import {useParams} from "react-router-dom";
import axios from "../../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

const Quiz = () => {
    const [quiz, setQuiz] = useState([]);

    const [activeQuestion, setActiveQuestion] = useState(0);
    const [answerState, setAnswerState] = useState(null);
    const [isFinished, setFinished] = useState(false);
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(true);

    const {id} = useParams();

    useEffect(async () => {
        try {
            const response = await axios.get(`/quizes/${id}.json`);
            const quiz = response.data;
            setQuiz(quiz);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    });

    const onAnswerClickHandler = (answerId) => {
        if (answerState) {
            const key = Object.keys(answerState)[0];
            if (answerState[key] === "success") {
                return;
            }
        }

        const question = quiz[activeQuestion];
        const stateResults = results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                stateResults[question.id] = "success";
            }
            setResults(stateResults);

            setAnswerState({[answerId]: "success"});
            const timeout = window.setTimeout(() => {
                if (isQuizFinished()) {
                    setFinished(true);
                } else {
                    setActiveQuestion(activeQuestion + 1);
                    setAnswerState(null);
                }
                window.clearTimeout(timeout);
            }, 1000);
        } else {
            stateResults[question.id] = "error";
            setResults(stateResults);
            setAnswerState({[answerId]: "error"});
        }
    };

    const isQuizFinished = () => {
        return activeQuestion + 1 === quiz.length;
    };

    const retryHandler = () => {
        setActiveQuestion(0);
        setAnswerState(null);
        setFinished(false);
        setResults({});
    };

    return (
      <div className={classes.quiz}>
          <div className={classes.wrapper}>
              <h1 className={classes.title}>Ответьте на все вопросы</h1>
              {
                  loading ? <Loader/> : isFinished ? (
                    <FinishedQuiz results={results} quiz={quiz} onRetry={retryHandler}/>
                  ) : (
                    <ActiveQuiz
                      question={quiz[activeQuestion].question}
                      answers={quiz[activeQuestion].answers}
                      onAnswerClick={onAnswerClickHandler}
                      quizLength={quiz.length}
                      answerNumber={activeQuestion + 1}
                      state={answerState}
                    />
                  )
              }
          </div>
      </div>
    );
};

export default Quiz;
