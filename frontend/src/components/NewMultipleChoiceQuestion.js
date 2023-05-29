import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./NewMultipleChoiceQuestion.module.css";

function saveQuestionToDb(e) {
  const target = e.target
  const value = target.parentElement.parentElement.firstChild.value
  const data = {
    "question": value
  }
  fetch('http://127.0.0.1:5000/save_mc_question_to_db', {
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

function NewMultipleChoiceQuestion(props) {
  const [addOption, setAddOption] = useState([
    <div key={Math.random() * 100}>
      <input
        className={styles.inputMultipleChoiceAnswer}
        type="radio"
        disabled
      />
      <input
        className={styles.inputMultipleChoiceAnswer}
        placeholder="Vul hier het antwoord in"
      />
      <button>
        <i className="bi bi-trash3"></i>
      </button>
    </div>,
  ]);

  function addMultipleChoiceOption() {
    setAddOption([
      ...addOption,
      <div key={Math.random() * 100}>
        <input
          className={styles.inputMultipleChoiceAnswer}
          type="radio"
          disabled
        />
        <input
          className={styles.inputMultipleChoiceAnswer}
          placeholder="Vul hier het antwoord in"
        />
        <button>
          <i className="bi bi-trash3"></i>
        </button>
      </div>,
    ]);
  }

  return (
    <div className={styles.containerMultipleChoiceQuestion}>
      <input
        className={styles.inputMultipleChoiceQuestion}
        placeholder="Vul hier de vraag in"
        value={props.value}
      />
      <div className={styles.divMultipleChoiceOption}>{addOption}</div>
      <Button onClick={addMultipleChoiceOption}>+</Button>
      <div className={styles.btnMultipleChoiceQuestion}>
        <Button onClick={saveQuestionToDb}>Opslaan</Button>
        <Button>Verwijderen</Button>
      </div>
    </div>
  );
}

export default NewMultipleChoiceQuestion;
