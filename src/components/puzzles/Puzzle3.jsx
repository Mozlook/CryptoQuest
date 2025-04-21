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
	function handleMouseMove(e) {
		const cover = document.querySelector(".img-cover");
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const gradient = `radial-gradient(circle 50px at ${x}px ${y}px, transparent 0%, black 100%)`;
		cover.style.maskImage = gradient;
		cover.style.webkitMaskImage = gradient;
	}

	function handleMouseLeave() {
		const cover = document.querySelector(".img-cover");
		const gradient = `radial-gradient(circle 50px at -100px -100px, transparent 0%, black 100%)`;
		cover.style.maskImage = gradient;
		cover.style.webkitMaskImage = gradient;
	}
	return (
		<div className="puzzle-container">
			<h2>Let's learn some empathy</h2>
			<div
				className="puzzle-content"
				onMouseMove={(e) => handleMouseMove(e)}
				onMouseLeave={handleMouseLeave}
			>
				<div className="img-cover"></div>
				<img src="/puzzle3_img.png" alt="img with code" />
			</div>
		</div>
	);
}
