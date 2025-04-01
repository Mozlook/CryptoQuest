import React from "react";

export default function SubmitForm({ checkAnswer, setTekst }) {
	const handleChange = (e) => {
		setTekst(e.target.value); // Ustawiamy tekst z formularza
	};

	return (
		<div className="form-container">
			<h3>Submit Your Answer:</h3>
			<form onSubmit={checkAnswer}>
				<label htmlFor="tekst">Wpisz odpowiedź:</label>
				<input
					type="text"
					id="tekst"
					name="tekst"
					onChange={handleChange}
					required
				/>
				<button type="submit">Sprawdź odpowiedź</button>
			</form>
		</div>
	);
}
