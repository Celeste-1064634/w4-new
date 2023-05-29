import React from "react";
import { Button } from "react-bootstrap";
import styles from "./NewOpenQuestion.module.css";

function saveQuestionToDb(e) {
  const target = e.target
  const value = target.parentElement.parentElement.firstChild.value
  const data = {
    "question": value
  }
  fetch('http://127.0.0.1:5000/save_open_question_to_db', {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => console.log(data))
}

function NewOpenQuestion(props) {
  return (
    <div className={styles.containerOpenQuestion}>
      <input
        className={styles.inputOpenQuestion}
        placeholder="Vul hier de vraag in"
        value={props.value}
      />
      <div className={styles.btnOpenQuestion}>
        <Button onClick={saveQuestionToDb}>Opslaan</Button>
        <Button>Verwijderen</Button>
      </div>
    </div>
  );
}

export default NewOpenQuestion;
