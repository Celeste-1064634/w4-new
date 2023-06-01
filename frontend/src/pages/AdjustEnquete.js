import { React, useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import QuestionItem from "../components/QuestionItem";
import NewQuestionItem from "../components/NewQuestionItem";
import styles from "./AdjustEnquete.module.css";

function AdjustEnquete() {

    const [isAdd, setIsAdd] = useState(false);

    function toggle() {
        setIsAdd((isAdd) => !isAdd);
    }

    const [survey, setSurvey] = useState([]);

    const vragenlijsten = [
        { id: 1, title: "Vraag 1", description: "Dit is vraag 1" },
        { id: 2, title: "Vraag 2", description: "Dit is vraag 2" },
        { id: 3, title: "Vraag 3", description: "Dit is vraag 3" }
    ];

    const { id } = useParams();
    const navigate = useNavigate();



    useEffect(() => {
        async function fetchSurvey() {

            let info = {
                method: "GET",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
            }

            try {
                const res = await fetch("http://127.0.0.1:5000/survey/data/" + id, info)
                const data = await res.json()
                console.log(data)
                setSurvey(data)
                if (!data.questions?.length) {
                    console.error("No data")
                    navigate("/404", { replace: true })
                }

                return data

            }
            catch (error) {
                console.error("QUESTIONS", error)
            }

        }
        fetchSurvey()

    }, [])



    return (
        <>
            <div className="secondary-nav">
                <NavLink to={"/vragen/" + id} className={({ isActive, isPending }) => isPending ? "secondary-nav-item" : isActive ? "secondary-nav-item active" : "secondary-nav-item"}
                >Vragen</NavLink>
                <NavLink to={"/antwoorden/" + id} className={({ isActive, isPending }) => isPending ? "secondary-nav-item" : isActive ? "secondary-nav-item active" : "secondary-nav-item"}
                >Antwoorden</NavLink>
            </div>

            <div className="small-container">
                <div className="header-container">
                    <h1>Vragenlijst aanpassen</h1>
                    {/* Add the card to create a new vragenlijst */}
                    <section className={styles.newQuestionContainer}>
                        <div className={styles.newQuestionContent}>
                            <h3>Nieuwe Vraag</h3>
                            <p>Kies uit een open of multiple choice vraag</p>

                        </div>

                        <button className={styles.addButton + " " + (isAdd ? styles.cancelButton : '')} onClick={toggle}><i className={"fa-solid fa-plus " + styles.plusIcon} ></i></button>

                    </section>

                    {isAdd &&
                        <NewQuestionItem></NewQuestionItem>
                    }
                </div>

                <div className="flex-gap">
                    {/* Render the other cards */}
                    {survey.questions?.map((vragenlijst) => (
                        <QuestionItem key={vragenlijst.question_id} id={vragenlijst.survey_id} question={vragenlijst}> </QuestionItem>
                    ))}
                    {/* Add the card to create a new vragenlijst */}
                </div>

            </div>
        </>
    );
}





export default AdjustEnquete;
