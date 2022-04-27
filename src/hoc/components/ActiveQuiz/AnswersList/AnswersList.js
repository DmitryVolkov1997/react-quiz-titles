import React from "react";
import classes from "./AnswersList.module.scss";
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = (props) => {
    const {answers, onAnswerClick, state} = props;

    return (
      <ul className={classes.AnswersList}>
          {answers.map((answer, i) => {
              return <AnswerItem key={i} {...answer} onAnswerClick={onAnswerClick} state={state ? state[answer.id] : null}/>;
          })}
      </ul>
    );
};

export default AnswersList;
