import React from "react";
import { Link } from "react-router-dom";


const Home = () => {

  	// const [students, setStudents] = useState([])
	
	// const fetchStudentData = () => {
	// 	fetch("/data")
	// 		.then(response => {
	// 			return response.json()
	// 	  	})
	// 	  	.then(data => {
	// 			setStudents(data)
	// 	  	})
	// }

	// useEffect(() => {
	// 	fetchStudentData()
	// }, [])
	return (
		<section>
			<div className="medium-container">
				<div className="section bg-grey">
					<h1>Home</h1>
					<h2 className="blue">Home</h2>
					<h3>Home</h3>
					{/* {students.length > 0 && (
						<ul>
						{students.map(user => (
							<li key={user}>{user}</li>
						))}
						</ul>
					)} */}
					<Link to="/antwoorden">
						Antwoord pagina
					</Link>
				</div>

				<div className="section bg-light-grey">
					<p>Home</p>
				</div>
			</div>
			<div className="auto-container bg-grey">
				<div className="section">automatische breedte</div>
			</div>
			<div className="small-container bg-grey">
				<div className="section">small</div>
			</div>
			<div className="medium-container bg-grey">
				<div className="section">medium</div>
			</div>

			<div className="large-container  bg-light-grey">
				<div className="section center">
					<h2 className="blue">Home</h2>
					<p>text</p>
				</div>
			</div>
			<div className="full-container bg-grey">
				<div className="section center">
					<h2 className="blue">Home</h2>
					<p>text</p>
				</div></div>
		</section>
		
		
	);
};
  
export default Home;