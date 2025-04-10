import React, { useState } from "react";
import axios from "axios";
import "../Styles/IssueForm.css";

export default function Login({ setIsRegisterFormOpen }) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");

	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"https://www.mmozoluk.com/api/register/",
				{
					username,
					email,
					password,
					password2,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			console.log("Rejestracja zakończona sukcesem: ", response.data);
		} catch (err) {
			if (err.response) {
				const errors = err.response.data.errors;
				setFormErrors(errors);
				console.log("Błędy z serwera:", errors);
			} else if (err.request) {
				console.log("Brak odpowiedzi od serwera:", err.request);
			} else {
				console.log("Błąd podczas zapytania:", err.message);
			}
		}
	};

	return (
		<div className="overlay" onClick={() => setIsRegisterFormOpen(false)}>
			<div
				className="issue-form-container"
				onClick={(e) => e.stopPropagation()}
			>
				<p>Register</p>
				<form onSubmit={handleSubmit}>
					<label>Username:</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<label>Email:</label>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label>Password2:</label>
					<input
						type="password"
						value={password2}
						onChange={(e) => setPassword2(e.target.value)}
					/>
					{error && <div>{error}</div>}
					<div className="buttons-container">
						<button className="submit-issue" type="submit">
							Login
						</button>
						<button
							className="cancel"
							onClick={() => setIsRegisterFormOpen(false)}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
