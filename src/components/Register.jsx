import { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [formErrors, setFormErrors] = useState({});

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
		<form onSubmit={handleSubmit}>
			<div>
				<label>Username:</label>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				{formErrors.username && <span>{formErrors.username[0]}</span>}
			</div>

			<div>
				<label>Email:</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				{formErrors.email && <span>{formErrors.email[0]}</span>}
			</div>

			<div>
				<label>Password:</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			<div>
				<label>Confirm Password:</label>
				<input
					type="password"
					value={password2}
					onChange={(e) => setPassword2(e.target.value)}
				/>
			</div>

			<button type="submit">Register</button>
		</form>
	);
};

export default RegistrationForm;
