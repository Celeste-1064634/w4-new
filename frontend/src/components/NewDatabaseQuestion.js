import { React, useEffect, useState } from "react";
import styles from "./NewDatabaseQuestion.module.css";
import NewOpenQuestion from "./NewOpenQuestion";
import NewMultipleChoiceQuestion from "./NewMultipleChoiceQuestion";

function NewDatabaseQuestion() {
  const [questions, setQuestions] = useState([]);
  const [output, setOutput] = useState(0);
  const [newQuestion, setnewQuestion] = useState("");

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
        setQuestions(data);
      } catch (error) {
        console.error("QUESTIONS", error);
      }
    }
    fetchQuestions();
  }, []);

  function clickHandlerDatabaseQuestion(type, question) {
    setnewQuestion(question);
    switch (type) {
      case 0:
        setOutput(1);
        break;
      case 1:
        setOutput(2);
        break;
      default:
        setOutput(0);
    }
  }

  return (
    <div>
      {output === 0 && (
        <div
          key={Math.random() * 100}
          className={styles.containerTableDatabaseQuestion}
        >
          <table className={styles.tableDatabaseQuestion}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>Vragen uit de database</th>
              </tr>
            </thead>
            <tbody>
              <td className={styles.tableBody}>
                {questions.map((question) => {
                  return (
                    <tr
                      className={styles.rowQuestion}
                      onClick={() =>
                        clickHandlerDatabaseQuestion(
                          question.type,
                          question.question
                        )
                      }
                      key={question.id}
                    >
                      {question.question}
                    </tr>
                  );
                })}
              </td>
            </tbody>
          </table>
        </div>
      )}
      {output === 1 && <NewOpenQuestion value={newQuestion} />}
      {output === 2 && <NewMultipleChoiceQuestion value={newQuestion} />}
    </div>
  );
}

export default NewDatabaseQuestion;
