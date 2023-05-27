import React from "react";
import { Button } from "react-bootstrap";
import styles from "./NewOpenQuestion.module.css";

function NewOpenQuestion(props) {
  return (
    <div className={styles.containerOpenQuestion}>
      <input
        className={styles.inputOpenQuestion}
        placeholder="Vul hier de vraag in"
        value={props.value}
      />
      <div className={styles.btnOpenQuestion}>
        <Button>Opslaan</Button>
        <Button>Verwijderen</Button>
      </div>
    </div>
  );
}

export default NewOpenQuestion;
