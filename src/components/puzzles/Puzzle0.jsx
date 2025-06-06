import { useEffect } from "react";
export default function Puzzle() {
	useEffect(() => {
		const style = document.createElement("link");
		style.rel = "stylesheet";
		style.href = "puzzlesStyle/Puzzle1.css";
		style.dataset.dynamic = "true";
		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
		};
	}, []);
	return (
		<div className="puzzle-container">
			<h2>Puzzle Title</h2>
			<div className="puzzle-content">
				<p>Puzzle content goes here...</p>
			</div>
		</div>
	);
}
