import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

function EnqueteOverview() {
  const [vragenlijsten, setVragenlijsten] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/surveys', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
    .then(response => response.json())
    .then(data => {
      setVragenlijsten(data);
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  }, []);

  const handleLinkClick = (id) => {
    const url = `${window.location.origin}/vragenlijst/invullen/${id}`;
    navigator.clipboard.writeText(url);
    alert(`URL copied to clipboard: ${url}`);
  };

  return (
    <Container className="mt-3">
      <Row className="mb-3">
        <Col xs={8}>
          <h1>Overzicht vragenlijsten</h1>
        </Col>
        <Col xs={4} className="text-right">
          <Link to="/vragenlijst/nieuw" style={{ textDecoration: 'none' }}>
            <Button variant="primary">+</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        {vragenlijsten.map((vragenlijst) => (
          <Col xs={12} md={4} key={vragenlijst.survey_id}>
            <Card className="mb-3" style={{ cursor: 'pointer' }}>
              <Link to={`/vragen/${vragenlijst.survey_id}`} style={{ textDecoration: 'none', position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
                <Button variant="outline-secondary" size="sm">Edit</Button>
              </Link>
              <Button variant="outline-secondary" size="sm" style={{ position: 'absolute', top: '0.5rem', right: '3.5rem' }} onClick={() => handleLinkClick(vragenlijst.survey_id)}>Link</Button>
              <Card.Body>
                <Card.Title>{vragenlijst.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default EnqueteOverview;
