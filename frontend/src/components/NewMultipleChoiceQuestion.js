import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./NewMultipleChoiceQuestion.module.css";

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
        <Button>Opslaan</Button>
        <Button>Verwijderen</Button>
      </div>
    </div>
  );
}

export default NewMultipleChoiceQuestion;
