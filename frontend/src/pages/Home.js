import React, { useEffect, useState } from "react";

const Home = () => {
  	const [students, setStudents] = useState([])
	
	const fetchStudentData = () => {
		fetch("/data")
			.then(response => {
				return response.json()
		  	})
		  	.then(data => {
				setStudents(data)
		  	})
	}

	useEffect(() => {
		fetchStudentData()
	}, [])

	return (
		<div>
			<h1>Home</h1>
			{students.length > 0 && (
				<ul>
				{students.map(user => (
					<li key={user}>{user}</li>
				))}
				</ul>
			)}
		</div>
	);
};
  
export default Home;