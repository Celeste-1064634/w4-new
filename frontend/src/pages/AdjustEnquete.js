import { React, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import QuestionItem from "./QuestionItem";
import NewQuestionItem from "./NewQuestionItem";


function AdjustEnquete() {

    const [isAdd, setIsAdd] = useState(false);

    function toggle() {
        setIsAdd((isAdd) => !isAdd);
    }


    const vragenlijsten = [
        { id: 1, title: "Vraag 1", description: "Dit is vraag 1" },
        { id: 2, title: "Vraag 2", description: "Dit is vraag 2" },
        { id: 3, title: "Vraag 3", description: "Dit is vraag 3" }
    ];


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
                {vragenlijsten.map((vragenlijst) => (
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
                    <QuestionItem vragenlijst={vragenlijst}> </QuestionItem>
                ))}
                {/* Add the card to create a new vragenlijst */}
            </Row>
        </Container >
    );
}

export default AdjustEnquete;
