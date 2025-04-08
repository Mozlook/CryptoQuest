import React, { Suspense, lazy, useState } from "react";
import Header from "./components/Header";
import SubmitForm from "./components/SubmitForm";
import Footer from "./components/Footer";
import About from "./components/About";
import IssueForm from "./components/IssueForm";
import "./index.css";

const DynamicComponent = React.memo(({ puzzleId }) => {
	const Component = lazy(() =>
		import(`./components/puzzles/Puzzle${puzzleId}.jsx`).catch(() =>
			import(`./components/puzzles/Puzzle0.jsx`)
		)
	);

	return (
		<Suspense fallback={<div>Ładowanie...</div>}>
			<Component />
		</Suspense>
	);
});

function App() {
	const [puzzleId, setPuzzleId] = useState(1);
	const [isAboutOpen, setIsAboutOpen] = useState(false);
	const [isIssueFormOpen, setIsIssueFormOpen] = useState(false);
	const [wynik, setWynik] = useState("");
	const [tekst, setTekst] = useState("");

	const checkAnswer = async (e) => {
		e.preventDefault();

		const requestData = {
			numer: parseInt(puzzleId),
			tekst: tekst,
		};
		setTekst("");
		try {
			const response = await fetch("http://127.0.0.1:8000/api/sprawdz/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestData),
			});

			const data = await response.json();
			console.log(data);

			if (response.ok) {
				if (data.result === true) {
					setPuzzleId((prevPuzzleId) => prevPuzzleId + 1);
				} else {
					console.log("Zła odpowiedź");
				}
			} else {
				console.log("Błąd: " + data.error);
			}
		} catch (error) {
			console.log("Wystąpił błąd podczas wysyłania zapytania.");
		}
	};

	return (
		<main className="main">
			<Header
				setIsAboutOpen={setIsAboutOpen}
				setIsIssueFormOpen={setIsIssueFormOpen}
				setPuzzleId={setPuzzleId}
			/>
			<DynamicComponent puzzleId={puzzleId} />
			<SubmitForm checkAnswer={checkAnswer} setTekst={setTekst} tekst={tekst} />
			<Footer />
			{isAboutOpen && <About setIsAboutOpen={setIsAboutOpen} />}
			{isIssueFormOpen && <IssueForm setIsIssueFormOpen={setIsIssueFormOpen} />}
		</main>
	);
}

export default App;
