import { useEffect } from "react";

export default function Puzzle() {
	useEffect(() => {
		const style = document.createElement("link");
		style.rel = "stylesheet";
		style.href = "puzzlesStyle/PuzzleFinal.css";
		style.dataset.dynamic = "true";
		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
		};
	}, []);
	return (
		<div className="puzzle-container">
			<h2>This is the end</h2>
			<div className="puzzle-content">
				<p>🎉Congratulations you've completed every puzzle🎉</p>
				<p>Please revisit this site in the future to checkout new puzzles</p>
			</div>
		</div>
	);
}
