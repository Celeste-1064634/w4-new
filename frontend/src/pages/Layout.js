import { Outlet, Link, NavLink } from "react-router-dom";

const Layout = () => {
	return (
		<>
			<nav className="main-header">
				<div className="large-container">
					<div className="header-content">
						<Link className="header-link" to="/">
							<img alt="logo" width="208" height="50" src="https://www.dyflexis.com/nl/wp-content/uploads/2019/04/logo-dyflexis-2.svg"></img>
						</Link>
						<ul className="header-items">
							<li>
								<NavLink className={({ isActive, isPending }) => isPending ? "pending header-link" : isActive ? "header-link active" : "header-link"}
  								to="/">Home</NavLink>
							</li>
							<li>
								<NavLink className={({ isActive, isPending }) => isPending ? "pending header-link" : isActive ? "header-link active" : "header-link"} 
								to="/vragenlijsten">Vragenlijsten</NavLink>
							</li>
							<li>
								<NavLink className={({ isActive, isPending }) => isPending ? "pending header-link" : isActive ? "header-link active" : "header-link"} 
								to="/blogs">Blogs</NavLink>
							</li>
							<li>
								<NavLink className={({ isActive, isPending }) => isPending ? "pending header-link" : isActive ? "header-link active" : "header-link"}
								 to="/contact">Contact</NavLink>
							</li>
							<li>
								<NavLink className="button-1" to="/inloggen">Inloggen</NavLink>
							</li>
							<li>
								<NavLink className="button-2" to="/uitloggen">Uitloggen</NavLink>
							</li>
						</ul>
					</div>
				</div>

			</nav>
			<Outlet />
			<footer className="main-footer">
				Alien Software &#169; 2023
			</footer>
		</>
	)
};

export default Layout;