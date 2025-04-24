import "../Styles/IssueForm.css";
import { useState } from "react";
import axios from "axios";
export default function IssueForm({ setIsIssueFormOpen }) {
	const [puzzle_name, setPuzzleName] = useState("");
	const [issue_description, setIssueDescription] = useState("");
	const [image, setImage] = useState(null);

	const SubmitIssue = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("numer", puzzle_name);
		formData.append("opis", issue_description);
		if (image) {
			formData.append("image", image);
		}

		try {
			const response = await axios.post(
				"https://api.mmozoluk.com/api/bledy/",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			console.log("Zgłoszenie wysłane:", response.data);
			setIsIssueFormOpen(false);
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
					<label>Attach a image</label>
					<input
						type="file"
						accept="image/*"
						onChange={(e) => setImage(e.target.files[0])}
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
