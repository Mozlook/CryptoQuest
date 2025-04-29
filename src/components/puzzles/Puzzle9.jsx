import { useEffect, useState } from "react";
import Main from "./Puzzle9Components/main";
export default function Puzzle() {
	useEffect(() => {
		const style = document.createElement("link");
		style.rel = "stylesheet";
		style.href = "puzzlesStyle/Puzzle9.css";
		style.dataset.dynamic = "true";
		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
		};
	}, []);
	const [hints, setHints] = useState(0);
	return (
		<>
			{hints > 0 && (
				<div className="hints-container">
					<p>It's a mob from Minecraft</p>
					<hr />
					{hints > 1 && (
						<>
							<p>It's a combination of two mobs</p>
							<hr />
						</>
					)}
					{hints > 2 && <p>Steve says it's name in Minecraft movie</p>}
				</div>
			)}

			<div className="puzzle-container">
				<h2>I am Steve</h2>
				<div className="puzzle-content">
					<Main hints={hints} setHints={setHints} />
				</div>
			</div>
		</>
	);
}
