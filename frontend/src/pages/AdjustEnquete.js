import { React, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import QuestionItem from "../components/QuestionItem";
import NewQuestionItem from "../components/NewQuestionItem";


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
                if (!data.length) {
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
        <Container className="mt-3">
            <h1>Vragenlijst aanpassen</h1>
            <Row>
                {/* Add the card to create a new vragenlijst */}
                <Col xs={12} md={4}>
                    <Card className="mb-3" style={{ cursor: 'pointer' }}>
                        <Card.Body>
                            <Card.Title>Nieuwe Vraag</Card.Title>
                            <Card.Text>Maak een nieuwe vraag aan</Card.Text>
                            {!isAdd &&
                                <Button onClick={toggle} variant="primary" size="sm" style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem' }}>+</Button>
                            }


                        </Card.Body>
                    </Card>
                </Col>
                {isAdd &&
                    <Col>
                        <NewQuestionItem></NewQuestionItem>
                    </Col>
                }
            </Row>
            <Row>
                {/* Render the other cards */}
                {survey.map((vragenlijst) => (
                    // <Col xs={12} md={4} key={vragenlijst.id}>
                    //     <Card className="mb-3" style={{ cursor: 'pointer' }}>
                    //         <Button onClick={toggle} variant="outline-secondary" size="sm" style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>Edit</Button>
                    //         <Card.Body>
                    //             {isEdit && <p>Hallo</p>}
                    //             <Card.Title>{vragenlijst.title}</Card.Title>
                    //             <Card.Text>{vragenlijst.description}</Card.Text>
                    //         </Card.Body>
                    //     </Card>
                    // </Col>
                    <QuestionItem question={vragenlijst}> </QuestionItem>
                ))}
                {/* Add the card to create a new vragenlijst */}
            </Row>
        </Container >
    );
}





export default AdjustEnquete;
