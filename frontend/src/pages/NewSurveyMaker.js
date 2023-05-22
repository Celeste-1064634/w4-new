import React, { useState } from "react";
import styles from "./NewSurveyMaker.module.css";
import { Button } from "react-bootstrap";
import NewQuestionItem from "./NewQuestionItem";

function NewSurveyMaker() {
  const [addQuestion, setAddQuestion] = useState(false);

  function addNewQuestion() {
    setAddQuestion((addQuestion) => !addQuestion);
  }

  console.log(addQuestion);
  return (
    <>
      <div className={styles.divPageTitle}>
        <h1>Nieuwe vragenlijst</h1>
      </div>
      <div className={styles.divAddNewQuestion}>
        <Button onClick={addNewQuestion} className={styles.btnAddNewQuestion}>
          +
        </Button>
        {addQuestion
          ? <NewQuestionItem/>
          : null}
      </div>
    </>
  );
}

export default NewSurveyMaker;
