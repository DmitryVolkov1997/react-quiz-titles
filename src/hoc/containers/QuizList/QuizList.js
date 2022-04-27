import React, { useState, useEffect } from "react";
import classes from "./QuizList.module.scss";
import { NavLink } from "react-router-dom";
import axios from "../../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";
import { titles } from "../QuizCreator/QuizCreator";

const QuizList = () => {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(true);

  const renderQuizes = () => {
    return quizes.map((quiz) => {
      return (
        <li className={classes.item} key={quiz.id}>
          <NavLink className={classes.link} to={"/quiz/" + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      );
    });
  };

  useEffect(async () => {
    try {
      const response = await axios.get("/quizes.json");
      const quizes = [];
      Object.keys(response.data).forEach((key, i) => {
        // console.log(response.data[key][0].titles ? "hello" : "дратути");
        quizes.push({
          id: key,
          name: `${
            response.data[key][0].titles ? response.data[key][0].titles : "Тест"
          }`,
        });
      });
      setQuizes(quizes);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className={classes.QuizList}>
      <div>
        <h1 className={classes.title}>Список тестов</h1>
        {loading ? <Loader /> : <ul>{renderQuizes()}</ul>}
      </div>
    </div>
  );
};

export default QuizList;
