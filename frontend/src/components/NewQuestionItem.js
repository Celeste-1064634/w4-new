import { React, useState } from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./NewQuestionItem.module.css";


const NewQuestionItem = (data) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isAbcd, setIsAbcd] = useState(false);
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const handleChange = (event) => {
        setTitle(event.target.value);

    }

    const changeOption1 = (event) => {
        setOption1(event.target.value);
    }

    const changeOption2 = (event) => {
        setOption2(event.target.value);
    }

    const changeOption3 = (event) => {
        setOption3(event.target.value);
    }

    const changeDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleClick = () => {
        console.log(description)
    }

    const [isNewQuestion, setIsNewQuestion] = useState(true);

    function toggle(type) {
        setIsNewQuestion(true)
        if (type == "open") {
            setIsAbcd(false);
        }
        else {
            setIsAbcd(true);
        }
    }

    console.log(data.vragenlijst)

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

                            <input className={styles.mainInput} placeholder="Vraag" onChange={handleChange} value={title} >
                            </input>
                            <div className={styles.subInputs}>
                                <input placeholder="a" onChange={changeOption1} value={option1}></input>
                                <input placeholder="b" onChange={changeOption2} value={option2}></input>
                                <input placeholder="c" onChange={changeOption3} value={option3}></input>
                            </div>
                                <button className={styles.saveBtn} onClick={handleClick}>Opslaan</button> 

                        </div>
                        :
                        <div className={styles.newQuestionCard}>

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