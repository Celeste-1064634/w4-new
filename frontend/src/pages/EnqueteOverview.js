import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

function EnqueteOverview() {
  const vragenlijsten = [
    { id: 1, title: "Vragenlijst 1", description: "test" },
    { id: 2, title: "Vragenlijst 2", description: "test" },
    { id: 3, title: "Vragenlijst 3", description: "test" }
  ];

  return (
    <Container className="mt-3">
      <h1>Overzicht vragenlijsten</h1>
      <Row>
        {/* Add the card to create a new vragenlijst */}
        <Col xs={12} md={4}>
          <Link to="/vragenlijst/nieuw" style={{ textDecoration: 'none' }}>
            <Card className="mb-3" style={{ cursor: 'pointer' }}>
              <Card.Body>
                <Card.Title>Nieuwe vragenlijst</Card.Title>
                <Card.Text>Maak een nieuwe vragenlijst aan</Card.Text>
                <Button variant="primary" size="sm" style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem' }}>+</Button>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        {/* Render the other cards */}
        {vragenlijsten.map((vragenlijst) => (
          <Col xs={12} md={4} key={vragenlijst.id}>
            <Link to={`/vragen/`} style={{ textDecoration: 'none' }}>
              {/* <Link to={`/vragen/${vragenlijst.id}`} style={{ textDecoration: 'none' }}> */}
              <Card className="mb-3" style={{ cursor: 'pointer' }}>
                <Button variant="outline-secondary" size="sm" style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>Edit</Button>
                <Card.Body>
                  <Card.Title>{vragenlijst.title}</Card.Title>
                  <Card.Text>{vragenlijst.description}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default EnqueteOverview;
