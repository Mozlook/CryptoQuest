import { useEffect } from "react";

export default function Puzzle() {
	useEffect(() => {
		const style = document.createElement("link");
		style.rel = "stylesheet";
		style.href = "puzzlesStyle/Puzzle3.css";
		style.dataset.dynamic = "true";
		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
		};
	}, []);
	return (
		<div className="puzzle-container">
			<h2>Light them up</h2>
			<div className="puzzle-content">
				<img src="/puzzle3_img.png" alt="img with code" />
			</div>
		</div>
	);
}
