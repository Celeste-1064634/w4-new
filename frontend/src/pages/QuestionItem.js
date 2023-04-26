import { React, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";


// export default function QuestionItem(vragenlijst) {

const QuestionItem = (data) => {

    const [isEdit, setIsEdit] = useState(false);
    const [description, setDescription] = useState(data.vragenlijst.description);

    const handleChange = (event) => {
        setDescription(event.target.value);
    }

    const handleClick = () => {
        console.log(description)
    }

    function toggle() {
        setIsEdit((isEdit) => !isEdit);
    }

    console.log(data.vragenlijst)

    return (
        <Col xs={12} md={4} key={data.vragenlijst.id}>
            <Card className="mb-3" style={{ cursor: 'pointer' }}>
                <Button onClick={toggle} variant="outline-secondary" size="sm" style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>Edit</Button>
                <Card.Body>
                    <Card.Title>{data.vragenlijst.title}</Card.Title>
                    {isEdit
                        ? <div> <textarea onChange={handleChange} value={description}></textarea> <Button onClick={handleClick} variant="primary" size="sm" style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem' }}>Opslaan</Button>  </div>
                        : <Card.Text>{data.vragenlijst.description}</Card.Text>

                    }
                </Card.Body>
            </Card>
        </Col>
    )
}

export default QuestionItem;







