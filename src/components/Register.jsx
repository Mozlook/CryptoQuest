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

			// Obsługuje odpowiedź, jeśli jest sukces
			console.log("Rejestracja zakończona sukcesem: ", response.data);
			// Możesz np. przekierować użytkownika do innej strony po udanej rejestracji:
			// window.location.href = '/login';
		} catch (err) {
			// Obsługujemy błąd, wyświetlamy komunikat lub inne działania
			if (err.response) {
				// Jeśli odpowiedź serwera jest dostępna
				console.log("Błąd w odpowiedzi serwera:", err.response.data);
				console.log("Status błędu:", err.response.status);
				// Możesz przekazać komunikat o błędzie do stanu komponentu i wyświetlić go użytkownikowi
			} else if (err.request) {
				// Jeśli zapytanie zostało wysłane, ale brak odpowiedzi
				console.log("Brak odpowiedzi od serwera:", err.request);
			} else {
				// Inne błędy, np. w kodzie axios
				console.log("Błąd podczas wykonywania zapytania:", err.message);
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
