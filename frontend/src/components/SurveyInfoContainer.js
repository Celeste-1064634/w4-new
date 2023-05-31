import { useEffect, useState } from "react";
import styles from "../pages/EnqueteOverview.module.css";

const SurveyInfoContainer = (data) => {
    const [vragenCount, setVragenCount] = useState(0);
    const [answerCount, setAnswerCount] = useState(0);
    useEffect(() =>{
        function getQuestionCount(id) {
            fetch('http://localhost:5000/survey/questionCount/' + id, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
            })
                .then(response => response.json())
                .then(data => {
                    setVragenCount(data.count)
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
        getQuestionCount(data.id)

        function getAnswerCount(id) {
            fetch('http://localhost:5000/survey/surveyAnswered/' + id, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
            })
                .then(response => response.json())
                .then(data => {
                    setAnswerCount(data.count)
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
        getAnswerCount(data.id)
    }, [])

return (
    <div className={styles.infoContainer}>
        <p className={styles.infoText}>Vragen: {vragenCount}</p>
        <p className={styles.infoText}>Ingevuld: {answerCount}</p>
    </div>
)

}



export default SurveyInfoContainer