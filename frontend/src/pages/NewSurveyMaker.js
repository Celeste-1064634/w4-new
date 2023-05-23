import React, { useState } from "react";
import styles from "./NewSurveyMaker.module.css";
import { Button } from "react-bootstrap";
import NewOpenQuestion from "../components/NewOpenQuestion";
import NewMultipleChoiceQuestion from "../components/NewMultipleChoiceQuestion";

function NewSurveyMaker() {
  const [addQuestion, setAddQuestion] = useState(false);
  const [divQuestion, setDivQuestion] = useState([]);

  function addNewQuestion() {
    setAddQuestion((addQuestion) => !addQuestion);
  }

  function addNewOpenQuestion() {
    console.log("Open");
    setDivQuestion([...divQuestion, <NewOpenQuestion />]);
  }

  function addNewMultipleChoiceQuestion() {
    console.log("MP");
    setDivQuestion([...divQuestion, <NewMultipleChoiceQuestion />]);
  }

  function addDatabaseQuestion() {
    console.log("DB");
  }

  console.log(addQuestion);
  return (
    <>
      <div className={styles.divPageTitle}>
        <h1>Nieuwe vragenlijst</h1>
      </div>
      <div className={styles.divQuestion}> {divQuestion} </div>
      <div className={styles.btnContainer}>
        <div className={styles.divAddNewQuestion}>
          {addQuestion ? (
            <>
              <Button onClick={addNewOpenQuestion}>Nieuwe open vraag</Button>
              <Button onClick={addNewMultipleChoiceQuestion}>
                Nieuwe multiple choice vraag
              </Button>
              <Button onClick={addDatabaseQuestion}>
                Vraag uit de database
              </Button>
            </>
          ) : null}
        </div>
        <Button onClick={addNewQuestion} className={styles.btnAddNewQuestion}>
          +
        </Button>
      </div>
    </>
  );
}

export default NewSurveyMaker;
