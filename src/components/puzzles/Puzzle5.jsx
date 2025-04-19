import { useEffect } from "react";

export default function Puzzle() {
	useEffect(() => {
		const style = document.createElement("link");
		style.rel = "stylesheet";
		style.href = "puzzlesStyle/Puzzle5.css";
		style.dataset.dynamic = "true";
		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
		};
	}, []);
	return (
		<div className="puzzle-container">
			<h2>It's empty</h2>
			<div className="puzzle-content">
				<p>Oh look it's not really empty</p>
				<p className="bot">Hdfc2xx!</p>
			</div>
		</div>
	);
}
