import React from "react";
import { Button } from "react-bootstrap";
import styles from "./NewOpenQuestion.module.css";

function deleteFromSurvey(e) {
  const target = e.target
  const outerDiv = target.parentElement.parentElement
  return outerDiv.outerHTML = ""
}

function NewOpenQuestion(props) {
  let question = { type: "open" }

  function saveQuestion(e) {
    const value = e.target.value
    question.question = value
    props.callbackFunction(question)
  }

  if (props.value) {
    question.question = props.value
    props.callbackFunction(question)
  }
  
  return (
    <div className={styles.containerOpenQuestion}>
      <input
        onBlur={saveQuestion}
        className={styles.inputOpenQuestion}
        placeholder="Vul hier de vraag in"
        value={props.value}
      />
      <div className={styles.btnOpenQuestion}>
        <Button onClick={deleteFromSurvey}>Verwijderen</Button>
      </div>
    </div>
  );
}

export default NewOpenQuestion;
