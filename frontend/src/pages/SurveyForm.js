import React, { useState, useEffect, useContext } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';

const SurveyForm = () => {
  const { surveyId } = useParams();
  const [answers, setAnswers] = useState({});
  const [surveyData, setSurveyData] = useState({ surveyName: '', questions: [] });
  const { user } = useContext(UserContext);

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
        surveyName: data.name,
        questions: data.questions
      });
    })
    .catch(error => console.error('Error:', error));
  }, [surveyId]);

  const handleChange = (id, answer) => {
    setAnswers(prev => ({ ...prev, [id]: { question_id: id, answer: answer, user_id: user.user_id } }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const surveySubmission = {
      survey_id: surveyId,
      user_id: user.user_id,
      answers,
    };

    console.log("Submitting survey submission:", surveySubmission);

    const token = sessionStorage.getItem('token');
    fetch('http://localhost:5000/survey/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(surveySubmission),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit survey');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Handle the response after successful submission.
    })
    .catch(error => {
      console.error('Error:', error);
    });
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
                {question.type === 1 ? (
                  question.choices.map(choice => (
                    <Form.Check
                      key={`${question.question_id}-${choice.multiple_choice_id}`}
                      type="radio"
                      id={`${question.question_id}-${choice.multiple_choice_id}`}
                      name={`question-${question.question_id}`}
                      label={`${choice.number}. ${choice.answer}`}
                      onChange={() => handleChange(question.question_id, choice.number)}
                    />
                  ))
                ) : (
                  <Form.Control type="text" placeholder="Antwoord" onChange={(e) => handleChange(question.question_id, e.target.value)} />
                )}
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
