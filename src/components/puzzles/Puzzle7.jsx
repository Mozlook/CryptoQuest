import PuzzlePiece from "./PuzzlePiece7.jsx";
import { useRef, useEffect } from "react";
export default function Puzzle() {
	useEffect(() => {
		const style = document.createElement("link");
		style.rel = "stylesheet";
		style.href = "puzzlesStyle/Puzzle7.css";
		style.dataset.dynamic = "true";
		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
		};
	}, []);

	const containerRef = useRef(null);

	const puzzlePieces = [
		{ img: "/part1.png", width: 181, height: 136 },
		{ img: "/part2.png", width: 160, height: 136 },
		{ img: "/part3.png", width: 232, height: 110 },
		{ img: "/part4.png", width: 109, height: 205 },
		{ img: "/part5.png", width: 232, height: 95 },
	];

	return (
		<div className="puzzle-container">
			<h2>Isn't it funny – a puzzle inside a puzzle?</h2>
			<div className="puzzle-content" ref={containerRef}>
				{puzzlePieces.map((piece, index) => (
					<PuzzlePiece
						key={index}
						img={piece.img}
						containerRef={containerRef}
						width={Math.round(piece.width)}
						height={Math.round(piece.height)}
						id={`piece-${index}`}
					/>
				))}
			</div>
		</div>
	);
}
