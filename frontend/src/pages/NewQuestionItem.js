import { React, useState } from "react";
import { Card, Button } from "react-bootstrap";



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

    const [isNewQuestion, setIsNewQuestion] = useState(false);

    function toggle(type) {
        setIsNewQuestion((isNewQuestion) => !isNewQuestion);
        if (type == "open") {
            setIsAbcd(false);
        }
        else {
            setIsAbcd(true);
        }
    }

    console.log(data.vragenlijst)

    return (
        <div>
            <Button onClick={() => toggle("open")} variant="primary" size="sm" >Openvraag</Button>
            <Button onClick={() => toggle("abcd")} variant="primary" size="sm">abcd</Button>
            {isNewQuestion &&
                <div>
                    {isAbcd ?
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>
                                    <input placeholder="Titel" onChange={handleChange} value={title} >
                                    </input>
                                </Card.Title>
                                <div>
                                    <input placeholder="a" onChange={changeOption1} value={option1}></input>
                                    <input placeholder="b" onChange={changeOption2} value={option2}></input>
                                    <input placeholder="c" onChange={changeOption3} value={option3}></input>
                                    <Button onClick={handleClick} variant="primary" size="sm" style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem' }}>Opslaan</Button>
                                </div>
                            </Card.Body>
                        </Card>
                        :
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>
                                    <input placeholder="Titel" onChange={handleChange} value={title} >
                                    </input>
                                </Card.Title>
                                <div>
                                    <textarea onChange={changeDescription} value={description}></textarea>
                                    <Button onClick={handleClick} variant="primary" size="sm" style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem' }}>Opslaan</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    }
                </div>
            }

        </div>

    )

}



export default NewQuestionItem