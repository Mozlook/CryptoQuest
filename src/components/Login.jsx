import React, { useState } from "react";
import axios from "axios";
import "../Styles/IssueForm.css";

export default function Login({ setIsLoginFormOpen }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"https://www.mmozoluk.com/api/login/",
				{
					username,
					password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log(response.data);
		} catch (err) {
			console.log(err.response);
		}
	};

	return (
		<div className="overlay">
			<div
				className="issue-form-container"
				onClick={(e) => e.stopPropagation()}
			>
				<p>Login</p>
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
					{error && <div>{error.error}</div>}
					<div className="buttons-container">
						<button className="submit-issue" type="submit">
							Login
						</button>
						<button
							className="cancel"
							onClick={() => setIsLoginFormOpen(false)}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
