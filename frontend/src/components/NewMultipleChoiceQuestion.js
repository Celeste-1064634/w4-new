import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./NewMultipleChoiceQuestion.module.css";

function saveQuestionToDb(e) {
  const target = e.target;
  const value = target.parentElement.parentElement.firstChild.value;
  const options = target.parentElement.parentElement.children[1].children;
  const optionArray = [];
  for (let option of options) {
    optionArray.push(option.children[1].value);
  }
  const data = {
    question: value,
    options: optionArray,
  };
  fetch("http://127.0.0.1:5000/save_mc_question_to_db", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
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
  const [options, setOptions] = useState(props.options);

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

  function deleteFromSurvey(e) {
    const target = e.target
    const outerDiv = target.parentElement.parentElement
    return outerDiv.outerHTML = ""
  }

  return (
    <div className={styles.containerMultipleChoiceQuestion}>
      <input
        className={styles.inputMultipleChoiceQuestion}
        placeholder="Vul hier de vraag in"
        value={props.value}
      />
      <div className={styles.divMultipleChoiceOption}>
        {options ? (
          options.map((option) => {
            return (
              <div key={Math.random() * 100}>
                <input
                  className={styles.inputMultipleChoiceAnswer}
                  type="radio"
                  disabled
                />
                <input
                  className={styles.inputMultipleChoiceAnswer}
                  value={option}
                />
              </div>
            );
          })
        ) : (
          <div className={styles.divMultipleChoiceOption}>{addOption}</div>
        )}
      </div>
      <Button onClick={addMultipleChoiceOption}>+</Button>
      <div className={styles.btnMultipleChoiceQuestion}>
        <Button onClick={saveQuestionToDb}>Opslaan</Button>
        <Button onClick={deleteFromSurvey}>Verwijderen</Button>
      </div>
    </div>
  );
}

export default NewMultipleChoiceQuestion;
