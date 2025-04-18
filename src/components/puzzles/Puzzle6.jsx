import "./puzzlesStyle/Puzzle6.css";
import { useState } from "react";

const LETTERS = ["S", "E", "K", "R", "G", "T", "C", "O", "D", "V"];

const POSITIONS = [
	{ top: 10, left: 15 },
	{ top: 25, left: 75 },
	{ top: 40, left: 25 },
	{ top: 45, left: 85 },
	{ top: 15, left: 75 },
	{ top: 70, left: 40 },
	{ top: 60, left: 20 },
	{ top: 80, left: 70 },
	{ top: 60, left: 50 },
	{ top: 85, left: 10 },
];

export default function Puzzle() {
	return (
		<div>
			{LETTERS.map((letter, index) => (
				<PuzzleElement
					key={index}
					letter={letter}
					index={index}
					position={POSITIONS[index]}
				/>
			))}
			<div className="puzzle-container">
				<h2>All that glitters is not gold</h2>
				<div className="puzzle-content">
					<p>
						No way. A hidden clue! Look around the screen, there could be TENS
						of them.
					</p>
				</div>
			</div>
		</div>
	);
}

function PuzzleElement({ letter, index, position }) {
	const [revealed, setRevealed] = useState(false);
	const [hidden, setHidden] = useState(false);

	const handleClick = () => {
		if (!revealed) setRevealed(true);
	};

	const handleTransitionEnd = () => {
		if (revealed) setHidden(true);
	};

	return (
		<div
			className="puzzle-element"
			onClick={handleClick}
			style={{
				position: "fixed",
				top: `${position.top}vh`,
				left: `${position.left}vw`,
				zIndex: 1000,
			}}
		>
			{!hidden && (
				<div
					className={`puzzle-cover ${revealed ? "fall" : ""}`}
					onTransitionEnd={handleTransitionEnd}
				></div>
			)}
			{revealed && (
				<div className={index % 2 == 0 ? "answer-element" : "hint-element"}>
					<p>{letter}</p>
				</div>
			)}
		</div>
	);
}
