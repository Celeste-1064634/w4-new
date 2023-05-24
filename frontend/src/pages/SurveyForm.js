import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const SurveyForm = () => {
  const { surveyId } = useParams();
  const [answers, setAnswers] = useState({});
  const [surveyData, setSurveyData] = useState({ surveyName: '', questions: [] });

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    fetch(`http://localhost:5000/survey/data/${surveyId}`, {
        headers: {
          'Authorization': "Bearer " + token
        }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('No survey found with this ID');
      }
      return response.json();
    })
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
                <Form.Control type="text" placeholder="Antwoord" onChange={(e) => handleChange(question.question_id, e.target.value)} />
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>Geen vragen gevonden</p>
        )}
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default SurveyForm;
