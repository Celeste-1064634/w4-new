import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const SurveyForm = ({ surveyId }) => {
  const [answers, setAnswers] = useState({});
  const [surveyData, setSurveyData] = useState({ survey_name: '', questions: [] });

  useEffect(() => {
    fetch(`http://localhost:5000/survey/data/${surveyId}`)
      .then(response => response.json())
      .then(data => {
        setSurveyData({
          surveyName: data[1],
          questions: data[0]
        });
      })
      .catch(error => console.error('Error:', error));
  }, [surveyId]);
  

  const handleChange = (id, answer) => {
    setAnswers(prev => ({ ...prev, [id]: answer }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(answers);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">{surveyData.surveyName}</h1>
      <Form onSubmit={handleSubmit}>
        {surveyData.questions.length > 0 ? (
          surveyData.questions.map(question => (
            <Card key={question.question_id} className="mb-4">
              <Card.Body>
                <Card.Title>{question.question_text}</Card.Title>
                <Form.Control type="text" placeholder="Your answer" onChange={(e) => handleChange(question.question_id, e.target.value)} />
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No questions found.</p>
        )}
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default SurveyForm;
