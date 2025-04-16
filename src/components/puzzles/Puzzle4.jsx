import { useEffect, useState } from "react";
const useKeySequence = (targetSequence, callback) => {
	const [keys, setKeys] = useState([]);

	useEffect(() => {
		const handleKeyDown = (e) => {
			setKeys((prevKeys) => {
				const newKeys = [...prevKeys, e.key].slice(-targetSequence.length);

				if (JSON.stringify(newKeys) === JSON.stringify(targetSequence)) {
					callback();
				}

				return newKeys;
			});
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [targetSequence, callback]);
};

export default function Puzzle() {
	const [solved, setSolved] = useState(false);
	return (
		<div className="puzzle-container">
			<h2>Shh... It's a Secret</h2>
			<div className="puzzle-content">
				<p>Sometimes, pressing the right buttons brings surprising results.</p>
				<p>Can you remember the legendary cheat?</p>
				{solved && <p>Secret password is: Ghdc@3c</p>}
				{useKeySequence(
					[
						"ArrowUp",
						"ArrowUp",
						"ArrowDown",
						"ArrowDown",
						"ArrowLeft",
						"ArrowRight",
						"ArrowLeft",
						"ArrowRight",
						"b",
						"a",
					],
					() => {
						console.log("kod poprawny");
						setSolved(true);
					}
				)}
			</div>
		</div>
	);
}
