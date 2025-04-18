import { useState } from "react";
import axios from "axios";

export default function Register({ setIsRegisterFormOpen }) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [formErrors, setFormErrors] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		let errors = null;
		setFormErrors({});

		try {
			const response = await axios.post(
				"https://api.mmozoluk.com/api/register/",
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

			console.log(response.data);
			setIsRegisterFormOpen(false);
		} catch (err) {
			if (err.response) {
				errors = err.response.data.errors;
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
		<div className="reg-overlay">
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
					{formErrors.username && (
						<span className="error">{formErrors.username[0]}</span>
					)}
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					{formErrors.email && (
						<span className="error">{formErrors.email[0]}</span>
					)}

					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<label>Confirm Password:</label>
					<input
						type="password"
						value={password2}
						onChange={(e) => setPassword2(e.target.value)}
					/>
					{formErrors.password && (
						<span className="error">{formErrors.password[0]}</span>
					)}
					<div className="buttons-container">
						<button type="submit" className="submit-issue">
							Register
						</button>
						<button
							type="button"
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
