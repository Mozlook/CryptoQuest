import React from "react";

export default function Login() {
	return (
		<div className="form-container">
			<h3>Submit Your Answer:</h3>
			<form onSubmit={checkAnswer}>
				<label htmlFor="tekst">Login</label>
				<input type="text" id="login" name="login" required />
				<label htmlFor="password">Password</label>
				<input type="password" id="password" name="password" required />
				<button type="submit">Submit answer</button>
			</form>
		</div>
	);
}
