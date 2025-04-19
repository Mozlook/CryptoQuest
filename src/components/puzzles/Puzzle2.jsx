import { useEffect } from "react";

export default function Puzzle() {
	useEffect(() => {
		const style = document.createElement("link");
		style.rel = "stylesheet";
		style.href = "puzzlesStyle/Puzzle2.css";
		style.dataset.dynamic = "true";
		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
		};
	}, []);
	return (
		<div className="puzzle-container">
			<h2>Needle in a haystack</h2>
			<div className="puzzle-content">
				<p>
					Oh God, there are a lot of random characters here. Maybe we can use
					something smart to Find a PASSWORD in this file.
				</p>
				<a
					href="/DefinetlyNotPassword.txt"
					download={"DefinetlyNotPassword.txt"}
				>
					DefinetlyNotPassword.txt
				</a>
			</div>
		</div>
	);
}
