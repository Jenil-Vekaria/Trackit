import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth-service";

const Home = () => {
	let navigate = useNavigate();

	useEffect(() => {
		//Authorize user - if accessToken expire (Send to login page)
		const authorizeUser = () => {
			const user = AuthService.getCurrentUser();

			if (!user) {
				navigate("/");
			}
		};

		authorizeUser();
	}, []);

	return (
		<div className="home-container">
			<aside className="side-nav">Side Nav</aside>

			<section className="sections"></section>
		</div>
	);
};

export default Home;
