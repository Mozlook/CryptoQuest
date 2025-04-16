import React, { useState } from "react";
import axios from "axios";
import "../Styles/IssueForm.css";

export default function Login({
	setIsRegisterFormOpen,
	setIsLoggedIn,
	puzzleId,
}) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"https://api.mmozoluk.com/api/login/",
				{
					username,
					password,
					progress: puzzleId,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log(response.data);
			sessionStorage.setItem("authToken", response.data.token);
			setIsLoggedIn(true);
			setIsLoginFormOpen(false);
		} catch (err) {
			console.log(err.response);
			if (err.response && err.response.data) {
				setError(err.response.data);
			}
		}
	};
	return (
		<div className="overlay">
			<div
				className="issue-form-container"
				onClick={(e) => e.stopPropagation()}
			>
				<p>Login to solve rest of the puzzles!</p>
				<form onSubmit={handleSubmit}>
					<label>Username:</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{error && <div className="error">{error.error}</div>}

					<div className="buttons-container">
						<div className="register-prompt">
							<p>Don’t have an account yet?</p>
							<button
								type="button"
								className="register-button"
								onClick={() => setIsRegisterFormOpen(true)}
							>
								Register
							</button>
						</div>
						<button className="submit-issue" type="submit">
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
