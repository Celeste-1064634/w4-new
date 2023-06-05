import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./NewMultipleChoiceQuestion.module.css";

function NewMultipleChoiceQuestion(props) {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState([])
  const [dbOptions, setDbOptions] = useState(props.options);
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
        onBlur={(e) => {setOptions([...options, e.target.value])}}
      />
      <button onClick={deleteOption}>
        <i className="bi bi-trash3"></i>
      </button>
    </div>,
  ]);

  let questionInfo = { type: "multiple choice" }

  function saveQuestion() {
    questionInfo.question = question
    questionInfo.options = options
    props.callbackFunction(questionInfo)
  }

  if (props.value) {
    questionInfo.question = props.value
    questionInfo.options = props.options
    props.callbackFunction(questionInfo)
  }
  

  function deleteOption(e) {
    const target = e.target
    const optionDiv = target.parentElement.parentElement
    return optionDiv.outerHTML = ""
  }

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
          onBlur={(e) => {setOptions([...options, e.target.value])}}
        />
        <button onClick={deleteOption}>
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
    <div onMouseLeave={props.value ? null : saveQuestion} className={styles.containerMultipleChoiceQuestion}>
      <input
        className={styles.inputMultipleChoiceQuestion}
        placeholder="Vul hier de vraag in"
        value={props.value}
        onBlur={(e) => setQuestion(e.target.value)}
      />
      <div className={styles.divMultipleChoiceOption}>
        {dbOptions ? (
          dbOptions.map((option) => {
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
        <Button onClick={deleteFromSurvey}>Verwijderen</Button>
      </div>
    </div>
  );
}

export default NewMultipleChoiceQuestion;
