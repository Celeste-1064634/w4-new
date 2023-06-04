import { React, useState } from "react";
import styles from "./NewQuestionItem.module.css";


const NewQuestionItem = (data) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isAbcd, setIsAbcd] = useState(false);
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");


    const handleChange = (event) => {
        setTitle(event.target.value);

    }
    const [isNewQuestion, setIsNewQuestion] = useState(true);

    const [options, setOptions] = useState([<input key={Math.random() * 100}
        placeholder="Vul hier een antwoord in"
    />])

    function addMultipleChoiceOption() {
        setOptions([
            ...options,
            <input key={Math.random() * 100}
                placeholder="Vul hier een antwoord in"
            />,
        ]);
    }

    const changeDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleClick = () => {
        console.log(description)

        async function saveQuestion() {

            let info = {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                },
                body: JSON.stringify({
                    question: title,
                    sequence: data.sequence
                })
            }

            try {
                const res = await fetch("http://127.0.0.1:5000/add_open_question_to_survey/" + data.survey_id, info)
                console.log(await res.json())

            }
            catch (error) {
                console.error("QUESTIONS", error)
            }

        }
        saveQuestion()
        data.fetchSurvey()
        setIsNewQuestion(false)
    }


    function toggle(type) {
        setIsNewQuestion(true)
        if (type == "open") {
            setIsAbcd(false);
        }
        else {
            setIsAbcd(true);
        }
    }

    return (
        <>
            <div className={styles.choiceContainer}>
                <button className={styles.choiceBtn + " " + (!isAbcd ? styles.active : "")} onClick={() => toggle("open")} >Openvraag</button>
                <button className={styles.choiceBtn + " " + (isAbcd ? styles.active : "")} onClick={() => toggle("abcd")} >Multiple choice</button>
            </div>
            {isNewQuestion &&
                <>
                    {isAbcd ?
                        <div className={styles.newQuestionCard}>
                            <p className={styles.inputLabel}>Vraag:</p>
                            <input className={styles.mainInput} placeholder="Vraag" onChange={handleChange} value={title} >
                            </input>
                            <div className={styles.subInputs}>
                                {options}
                                <button className={styles.addBtn} onClick={addMultipleChoiceOption}>+</button>
                            </div>
                            <button className={styles.saveBtn} onClick={handleClick}>Opslaan</button>

                        </div>
                        :
                        <div className={styles.newQuestionCard}>
                            <p className={styles.inputLabel}>Vraag:</p>
                            <input className={styles.mainInput} placeholder="Vraag" onChange={handleChange} value={title} >
                            </input>

                            <div>
                                <button className={styles.saveBtn} onClick={handleClick}>Opslaan</button>
                            </div>

                        </div>
                    }
                </>
            }

        </>

    )

}



export default NewQuestionItem