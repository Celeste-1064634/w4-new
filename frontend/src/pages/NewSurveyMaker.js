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
    setDivQuestion([...divQuestion, <NewOpenQuestion key={Math.random()*100}/>]);
  }

  function addNewMultipleChoiceQuestion() {
    console.log("MP");
    setDivQuestion([...divQuestion, <NewMultipleChoiceQuestion key={Math.random()*100}/>]);
  }

  function addDatabaseQuestion() {
    console.log("DB");
  }

  console.log(addQuestion);
  return (
    <>
      <div className={styles.divSurveyTitle}>
        <input className={styles.surveyTitleInput} placeholder="Nieuwe vragenlijst"/>
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
        <div className={styles.btnSaveDeleteNewSurvey}>
        <Button>Opslaan</Button>
        <Button>Verwijderen</Button>
      </div>
    </>
  );
}

export default NewSurveyMaker;
