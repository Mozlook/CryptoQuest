import { useEffect, useState } from "react";
export default function Puzzle() {
	useEffect(() => {
		const style = document.createElement("link");
		style.rel = "stylesheet";
		style.href = "puzzlesStyle/Puzzle8.css";
		style.dataset.dynamic = "true";
		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
		};
	}, []);
	const [time, setTime] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setTime((prevTime) => prevTime + 1);
		}, 1000);

		const resetTime = () => setTime(0);

		const events = [
			"click",
			"mouseover",
			"mouseout",
			"mousemove",
			"keydown",
			"keyup",
			"input",
			"resize",
			"scroll",
			"contextmenu",
			"touchstart",
		];

		events.forEach((event) => {
			document.addEventListener(event, resetTime);
		});

		return () => {
			clearInterval(interval);
			events.forEach((event) => {
				document.removeEventListener(event, resetTime);
			});
		};
	}, []);
	return (
		<div className="puzzle-container">
			<h2>Time is money or an answer...</h2>
			<div className="puzzle-content">
				{time > 5 && (
					<p>
						Just chill for a bit. Sometimes your problems will solve themselves
					</p>
				)}
				{time > 20 && <p>See? It's really relaxing</p>}

				{time > 40 && <p>Almost there!</p>}

				{time > 60 && <p>Don't move or it will vanish. hsdSdJ</p>}
			</div>
		</div>
	);
}
