import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const SurveyForm = () => {
  const [answers, setAnswers] = useState({});

  const handleChange = (id, answer) => {
    setAnswers(prev => ({...prev, [id]: answer}));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(answers); // replace with your actual submission handling
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Survey Title</h1>
      <Form onSubmit={handleSubmit}>
        {Array.from({ length: 5 }, (_, i) => i + 1).map(id => (
          <Card key={id} className="mb-4">
            <Card.Body>
              <Card.Title>Question {id}</Card.Title>
              <Form.Control type="text" placeholder="Your answer" onChange={(e) => handleChange(id, e.target.value)} />
            </Card.Body>
          </Card>
        ))}
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default SurveyForm;
