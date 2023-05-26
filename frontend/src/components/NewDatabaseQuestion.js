import { React, useEffect, useState } from "react";
import styles from "./NewDatabaseQuestion.module.css";

function NewDatabaseQuestion() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      let info = {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };

      try {
        const res = await fetch("http://127.0.0.1:5000/question", info);
        const data = await res.json();
        console.log(data);
        setQuestions(data);
      } catch (error) {
        console.error("QUESTIONS", error);
      }
    }
    fetchQuestions();
  }, []);

console.log(questions);
   
  return (
    <>
      <div className={styles.containerTableDatabaseQuestion}>
        <table className={styles.tableDatabaseQuestion}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>Vragen uit de database</th>
            </tr>
          </thead>
          <tbody>
            <td>
              {questions.map(question => {
                return (
                  <tr className={styles.tableBody} key={question.id}>{question.question}</tr>
                )
              })}
            </td>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default NewDatabaseQuestion;
