import React from "react";
import { Button } from "react-bootstrap";
import styles from "./NewDatabaseQuestion.module.css";

function NewDatabaseQuestion() {
  return (
    <>
    <div className={styles.containerTableDatabaseQuestion}>
        <table className={styles.tableDatabaseQuestion}>
          <thead className={styles.tableHeader}>
            <th>Vragen uit de database</th>
          </thead>
          <tr>
            <td className={styles.tableBody}>fhjagfas</td>
          </tr>
        </table>
    </div>
    </>
  );
}

export default NewDatabaseQuestion;
