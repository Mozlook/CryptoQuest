import "../Styles/IssueForm.css";
import { useState } from "react";
export default function IssueForm({ setIsIssueFormOpen }) {
	const [puzzle_name, setPuzzleName] = useState("");
	const [issue_description, setIssueDescription] = useState("");

	const SubmitIssue = async (e) => {
		e.preventDefault();
		setIsIssueFormOpen(false);
		const requestData = {
			numer: puzzle_name,
			opis: issue_description,
		};

		try {
			const response = await fetch("https://api.mmozoluk.com/api/bledy/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.error("Błąd z backendu:", errorData);
				return;
			}

			const data = await response.json();
			console.log("Zgłoszenie wysłane:", data);
		} catch (error) {
			console.error("Wystąpił błąd podczas wysyłania zapytania:", error);
		}
	};

	return (
		<div className="overlay">
			<div
				className="issue-form-container"
				onClick={(e) => e.stopPropagation()}
			>
				<p>Report an Issue</p>
				<form>
					<label>Name or number of puzzle</label>
					<input
						type="text"
						id="puzzle_name"
						name="puzzle_name"
						placeholder="Cezar cipher"
						onChange={(e) => setPuzzleName(e.target.value)}
					/>
					<label>Describe the issue</label>
					<textarea
						rows="10"
						id="issue_description"
						name="issue_description"
						placeholder="Describe your issue here..."
						onChange={(e) => setIssueDescription(e.target.value)}
					/>
					<div className="buttons-container">
						<button className="submit-issue" onClick={(e) => SubmitIssue(e)}>
							Submit
						</button>
						<button
							className="cancel"
							onClick={() => setIsIssueFormOpen(false)}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
