import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import styles from "./NewSurveyMaker.module.css";
import { Button } from "react-bootstrap";
import NewOpenQuestion from "../components/NewOpenQuestion";
import NewMultipleChoiceQuestion from "../components/NewMultipleChoiceQuestion";
import NewDatabaseQuestion from "../components/NewDatabaseQuestion";

function NewSurveyMaker() {
  const [addQuestion, setAddQuestion] = useState(false);
  const [divQuestion, setDivQuestion] = useState([]);
  const [questionListArray, setQuestionListArray] = useState([]);
  const [toggleAnonymous, setToggleAnonymous] = useState(false);

  const navigate = useNavigate() 

  function callbackFunction(info) {
    console.log(info);
    setQuestionListArray([...questionListArray, info]);
  }

  function toggleOnOff() {
    setToggleAnonymous((toggleAnonymous) => !toggleAnonymous);
  }

  function addNewQuestion() {
    setAddQuestion((addQuestion) => !addQuestion);
  }

  function addNewOpenQuestion() {
    setDivQuestion([
      ...divQuestion,
      <NewOpenQuestion
        key={Math.random() * 100}
        callbackFunction={callbackFunction}
      />,
    ]);
    addNewQuestion();
  }

  function addNewMultipleChoiceQuestion() {
    setDivQuestion([
      ...divQuestion,
      <NewMultipleChoiceQuestion
        key={Math.random() * 100}
        callbackFunction={callbackFunction}
      />,
    ]);
    addNewQuestion();
  }

  function addDatabaseQuestion() {
    setDivQuestion([
      ...divQuestion,
      <NewDatabaseQuestion
        key={Math.random() * 100}
        callbackFunction={callbackFunction}
      />,
    ]);
    addNewQuestion();
  }

  const saveNewSurvey = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("titleInput"),
      questions: questionListArray,
      anonymous: toggleAnonymous
    };
    console.log(data);

    fetch("http://127.0.0.1:5000/save_new_survey", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        navigate("/vragenlijsten")
      });
  };

  return (
    <form onSubmit={saveNewSurvey}>
      <div className={styles.divSurveyTitle}>
        <input
          name="titleInput"
          className={styles.surveyTitleInput}
          placeholder="Nieuwe vragenlijst"
        />
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
      <div className={styles.btnSaveNewSurvey}>
        <Button type="submit">Opslaan</Button>
        {toggleAnonymous ? (
          <>
            <i
              onClick={toggleOnOff}
              className={`bi bi-toggle-on ${styles.toggleAnonymous}`}
              ></i>
              <p>Anoniem: aan</p>
          </>
        ) : (
          <>
            <i
              onClick={toggleOnOff}
              className={`bi bi-toggle-off ${styles.toggleAnonymous}`}
              ></i>
              <p>Anoniem: uit</p>
          </>
        )}
      </div>
    </form>
  );
}

export default NewSurveyMaker;
