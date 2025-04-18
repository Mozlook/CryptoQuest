import React from "react";

export default function SubmitForm({ checkAnswer, setTekst, tekst }) {
	const handleChange = (e) => {
		setTekst(e.target.value);
	};

	return (
		<div className="form-container">
			<h3>Submit Your Answer:</h3>
			<form onSubmit={checkAnswer}>
				<label htmlFor="tekst">Answer here:</label>
				<input
					type="text"
					id="tekst"
					name="tekst"
					value={tekst}
					onChange={handleChange}
					required
				/>
				<button type="submit">Submit answer</button>
			</form>
		</div>
	);
}
