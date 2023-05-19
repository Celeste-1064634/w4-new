import { React, useState } from "react";
import { Card, Button, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";


// export default function QuestionItem(vragenlijst) {

const QuestionItem = (data) => {

    const [isEdit, setIsEdit] = useState(false);
    const [question, setQuestion] = useState(data.question.question_text);

    const handleChange = (event) => {
        setQuestion(event.target.value);
    }

    const { id } = useParams();

    const navigate = useNavigate();

    const handleClick = () => {
        console.log(question)
        async function updateQuestion() {

            let info = {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                },
                body: JSON.stringify({
                    question: question
                })
            }

            try {
                const res = await fetch("http://127.0.0.1:5000/question/edit/" + id, info)
                const data = await res.json()
                console.log(data)
                if (!data.length) {
                    console.error("No data")
                }

                return data

            }
            catch (error) {
                console.error("QUESTIONS", error)
            }

        }
        updateQuestion()
        toggle()
    }

    function toggle() {
        setIsEdit((isEdit) => !isEdit);
    }

    function deleteQuestion() {
        let info = {
            method: "DELETE",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            }
        }
        fetch("http://127.0.0.1:5000/question/delete/" + id, info)
        navigate("/vragen/")

    }



    console.log(data.vragenlijst)

    return (
        <Col xs={12} md={4} key={data.question.question_id}>
            <Card className="mb-3" style={{ cursor: 'pointer' }}>
                <Button onClick={toggle} variant="outline-secondary" size="sm" style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>Edit</Button>
                <Button onClick={deleteQuestion} variant="outline-secondary" size="sm" style={{ position: 'absolute', top: '3rem', right: '0.5rem' }}>Delete</Button>
                <Card.Body>
                    {isEdit
                        ? <div> <textarea onChange={handleChange} value={question}></textarea> <Button onClick={handleClick} variant="primary" size="sm" style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem' }}>Opslaan</Button>  </div>
                        : <Card.Title>{question}</Card.Title>


                    }
                </Card.Body>
            </Card>
        </Col>
    )
}

export default QuestionItem;







