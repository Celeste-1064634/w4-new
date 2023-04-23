import { NavLink } from "react-router-dom";
import { React, useEffect}  from "react";
import "./Answers.css";
import Chart from 'chart.js/auto';

const Contact = () => {
    function getColor(){
        const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
        return `rgb(${randomBetween(0, 255)},${randomBetween(0, 255)},${randomBetween(0, 255)})`; // Collect all to a css color string
    }

    useEffect(() => {
        const ctx = document.getElementById('myChart');

        const chart = new Chart(ctx, {
            type: 'pie',
            data: {
            labels: ['A', 'B', 'C', 'D'],
            datasets: [{
                label: 'Aantal gekozen',
                data: [12, 19, 3, 5],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(100, 205, 86)',
                  ],
                borderWidth: 1
            }]
            },
            options: {
            scales: {
                y: {
                beginAtZero: true
                }
            }
            }
        });
    }, []);
    

    return (
        <section>
            <div className="secondary-nav">
                <NavLink to="/vragen" className={({ isActive, isPending }) => isPending ? "secondary-nav-item" : isActive ? "secondary-nav-item active" : "secondary-nav-item"}
                >Vragen</NavLink>
                <NavLink to="/antwoorden" className={({ isActive, isPending }) => isPending ? "secondary-nav-item" : isActive ? "secondary-nav-item active" : "secondary-nav-item"}
                >Antwoorden</NavLink>
            </div>
            <div className="small-container">
                <div className="bg-light-grey light-shadow">
                    <h3 className="question-box"><span className="question-number">1</span>Dit is de vraag</h3>
                    <p className="label">Open vraag</p>
                    <div className="bg-white answers">
                        
                        <div className="answer-item">
                            <div className="user-part"><i style={{backgroundColor: getColor() }} className="fa fa-solid fa-user user-icon"></i>Gebruiker</div>
                            Antwoord 1
                        </div>
                        <div className="answer-item">
                            <div className="user-part"><i style={{backgroundColor: getColor() }} className="fa fa-solid fa-user user-icon"></i>Gebruiker</div>
                            Antwoord 2
                        </div>
                    </div>
                </div>

                <div className="bg-light-grey light-shadow">
                    <h3 className="question-box"><span className="question-number">2</span>Dit is de vraag</h3>
                    <p className="label">Multiple choice</p>
                    <div className="grid-halves">
                        <div className="grid-part bg-white justify-center column">
                            <h3>Mogelijke antwoorden</h3>
                            <p className="answer-row" ><span style={{backgroundColor: "rgb(255, 99, 132)"}} className="answer-letter">A</span> 1</p>
                            <p className="answer-row" ><span style={{backgroundColor: "rgb(54, 162, 235)"}} className="answer-letter">B</span>2</p>
                            <p className="answer-row" ><span style={{backgroundColor: "rgb(255, 205, 86)"}} className="answer-letter">C</span>3</p>
                            <p className="answer-row" ><span style={{backgroundColor: "rgb(100, 205, 86)"}} className="answer-letter">D</span>4</p>
                        </div>
                        <div className="grid-part bg-grey">
                        <div>
                            <canvas id="myChart"></canvas>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    
    );
};
  
export default Contact;