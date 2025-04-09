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
			const response = await axios.post("httsp://www.mmozoluk.com/api/login/", {
				username,
				password,
			});

			// Zapisz tokeny w localStorage
			localStorage.setItem("access_token", response.data.access);
			localStorage.setItem("refresh_token", response.data.refresh);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="overlay" onClick={() => setIsLoginFormOpen(false)}>
			<div
				className="issue-form-container"
				onClick={(e) => e.stopPropagation()}
			>
				<p>Report an Issue</p>
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
					{error && <div>{error}</div>}
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
