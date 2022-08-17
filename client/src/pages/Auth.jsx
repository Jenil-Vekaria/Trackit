import React, { useState } from "react";
import logo from "../assests/bug_tracker_logo.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col, Alert, Modal, Table } from "react-bootstrap";
import AuthService from "../services/auth-service";

import "./auth.css";

export const Auth = () => {
	const [isLoginView, setIsLoginView] = useState(true);
	const [formErrorMsg, setFormErrorMsg] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const changeAuthForm = () => {
		setIsLoginView((prev) => !prev);
		setFormErrorMsg("");
		setUser({
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormErrorMsg("");

		try {
			//If login page - provide email and password to backend
			if (isLoginView) {
				await AuthService.login({
					email: user.email,
					password: user.password,
				}).then(
					(response) => {
						console.log("Logged In");
						console.table(response);
					},
					(error) => {
						if (error.response.data.message) {
							setFormErrorMsg(error.response.data.message);
							//Reset the password inputfield when error msg displays
							setUser({ ...user, password: "" });
						}
					},
				);
			}
			//If signup page - provide email and password to backend
			else {
				await AuthService.signup(user).then(
					(response) => {
						console.log("Signed up");
						console.table(response);
					},
					(error) => {
						if (error.response.data.message) {
							setFormErrorMsg(error.response.data.message);
							//Reset the password inputfield when error msg displays
							setUser({ ...user, password: "", confirmPassword: "" });
						}
					},
				);
			}
		} catch (error) {}
	};

	const handleFormChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<div className="auth-container">
			<img src={logo} alt="Bug Tracker Logo" />

			<h2 className="mb-3">{isLoginView ? "Login" : "Signup"}</h2>

			{formErrorMsg && (
				<Alert className="alert-msg" key="danger" variant="danger">
					{formErrorMsg}
				</Alert>
			)}

			<Form className="auth-form" onSubmit={handleSubmit}>
				{!isLoginView && (
					<>
						<Row>
							<Col>
								<Form.Group className="mb-3">
									<Form.Label>First Name</Form.Label>
									<Form.Control
										type="text"
										name="firstName"
										placeholder="First Name"
										size="sm"
										value={user.firstName}
										onChange={handleFormChange}
										required
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className="mb-3">
									<Form.Label>Last Name</Form.Label>
									<Form.Control
										type="text"
										name="lastName"
										placeholder="Last Name"
										size="sm"
										value={user.lastName}
										onChange={handleFormChange}
										required
									/>
								</Form.Group>
							</Col>
						</Row>
					</>
				)}

				<Form.Group className="mb-3">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						name="email"
						placeholder="Enter email"
						size="sm"
						value={user.email}
						onChange={handleFormChange}
						required
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label size="sm">Password</Form.Label>
					<Form.Control
						type="password"
						name="password"
						placeholder="Password"
						size="sm"
						value={user.password}
						onChange={handleFormChange}
						required
					/>
				</Form.Group>

				{!isLoginView && (
					<Form.Group className="mb-3">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							name="confirmPassword"
							placeholder="Confirm password"
							size="sm"
							value={user.confirmPassword}
							onChange={handleFormChange}
							required
						/>
					</Form.Group>
				)}

				<Button variant="primary" type="submit" size="sm">
					{isLoginView ? "Login" : "Signup"}
				</Button>

				<div className="auth-footer mt-3">
					<p>
						{isLoginView ? "Don't" : "Already"} have an account?{" "}
						<span className="signup-text" onClick={changeAuthForm}>
							{isLoginView ? "Signup" : "Login"}
						</span>
					</p>
					<p className="try-demo-text" onClick={() => setShowModal(true)}>
						Try demo accounts
					</p>
				</div>
			</Form>

			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Demo Accounts</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Table striped bordered size="sm">
						<thead>
							<tr>
								<th>Email</th>
								<th>Password</th>
								<th>Role</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>admin@bugtracker.com</td>
								<td>random</td>
								<td>Admin</td>
							</tr>
							<tr>
								<td>projectManager@bugtracker.com</td>
								<td>random</td>
								<td>Project Manager</td>
							</tr>
							<tr>
								<td>developer@bugtracker.com</td>
								<td>random</td>
								<td>Developer</td>
							</tr>
							<tr>
								<td>submitter@bugtracker.com</td>
								<td>random</td>
								<td>Submitter</td>
							</tr>
						</tbody>
					</Table>
				</Modal.Body>
			</Modal>
		</div>
	);
};
