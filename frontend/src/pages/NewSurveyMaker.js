import React, {useState} from 'react'
import styles from './NewSurveyMaker.module.css'
import { Button } from 'react-bootstrap'

function NewSurveyMaker() {
  const [addQuestion, setAddQuestion] = useState(false);

  function addNewQuestion() {
    setAddQuestion((addQuestion) => !addQuestion);
  }
  
  console.log(addQuestion)
    return (
    <>
    <div className={styles.divPageTitle}>
    <h1 >Nieuwe vragenlijst</h1>
    </div>
    <div className={styles.divAddNewQuestion}>
        <Button onClick={addNewQuestion} className={styles.btnAddNewQuestion}>+</Button>
    </div>
    </>
  )
}

export default NewSurveyMaker