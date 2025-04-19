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
			<h2>Quo vadis?</h2>
			<div className="puzzle-content">
				<p>
					<em>A leader of old, bold and grand,</em>
					<br />
					<em>With fate in grasp and sword in hand.</em>
				</p>

				<p>
					<em>Three words he spoke, so fierce, so free,</em>
					<br />
					<em>Of triumph, time, and destiny.</em>
				</p>

				<p>But to reveal them, break the code:</p>

				<h3>
					🔐 <b>Enwr, ermr, erlr</b> 🔐
				</h3>

				<p>
					<strong>What is the answer?</strong>
				</p>
			</div>
		</div>
	);
}
