import { React, useState } from "react";
import { Card, Button, Container, Row, Col, ListGroup } from "react-bootstrap";



const NewQuestionItem = (data) => {

    const [isAbcd, setIsAbcd] = useState(false);

    const [isNewQuestion, setIsNewQuestion] = useState(false);

    function toggle() {
        setIsNewQuestion((isNewQuestion) => !isNewQuestion);
        setIsAbcd((isAbcd) => !isAbcd);
    }

    const handleClick = () => {
        console.log()
    }

    return (
        <div>
            <Button onClick={toggle} variant="primary" size="sm" >Openvraag</Button>
            <Button onClick={toggle} variant="primary" size="sm">abcd</Button>
            {isNewQuestion &&
                <div>
                    {isAbcd ?
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                                <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                            </Card.Body>
                        </Card>
                        :
                        <p>Open</p>}
                </div>
            }

        </div>

    )

}

export default NewQuestionItem