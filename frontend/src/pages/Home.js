import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";


const Home = () => {
	const { user, setUser } = useContext(UserContext)
	return (
		<section>
			<div className="medium-container">
				<div className="section bg-light-grey">
					<h1>Hallo, <span className="blue">{user.fullName}</span></h1>
					<Link to="/antwoorden/1">
						Antwoord pagina
					</Link>
				</div>
			</div>
			{/* <div className="auto-container bg-grey">
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
				</div>
			</div> */}
		</section>
		
		
	);
};
  
export default Home;