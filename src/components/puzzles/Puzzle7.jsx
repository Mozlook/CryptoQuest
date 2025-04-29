import PuzzlePiece from "./PuzzlePiece7.jsx";
import { useRef, useEffect, useState } from "react";

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
	const [scale, setScale] = useState(1);

	// Bazowe rozmiary puzzli (projektowe)
	const basePuzzlePieces = [
		{ img: "/part1.png", width: 181, height: 136 },
		{ img: "/part2.png", width: 160, height: 136 },
		{ img: "/part3.png", width: 232, height: 110 },
		{ img: "/part4.png", width: 109, height: 205 },
		{ img: "/part5.png", width: 232, height: 95 },
	];

	useEffect(() => {
		const handleResize = () => {
			const baseWidth = 1920; // szerokość projektowa
			const baseHeight = 1080; // wysokość projektowa

			const widthScale = window.innerWidth / baseWidth;
			const heightScale = window.innerHeight / baseHeight;

			const newScale = Math.min(widthScale, heightScale, 1);
			// nigdy nie skalujemy ponad oryginał (czyli max 1)

			setScale(newScale);
		};

		window.addEventListener("resize", handleResize);
		handleResize(); // od razu przy starcie

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const puzzlePieces = basePuzzlePieces.map((piece) => ({
		...piece,
		width: Math.round(piece.width * scale),
		height: Math.round(piece.height * scale),
	}));

	return (
		<div className="puzzle-container">
			<h2>Isn't it funny – a puzzle inside a puzzle?</h2>
			<div className="puzzle-content" ref={containerRef}>
				{puzzlePieces.map((piece, index) => (
					<PuzzlePiece
						key={index}
						img={piece.img}
						containerRef={containerRef}
						width={piece.width}
						height={piece.height}
						id={`piece-${index}`}
					/>
				))}
			</div>
		</div>
	);
}
