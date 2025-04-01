import React, { Suspense, lazy, useState, useMemo } from "react";
import Header from "./components/Header";
import SubmitForm from "./components/SubmitForm";
import Footer from "./components/Footer";
import About from "./components/About";
import IssueForm from "./components/IssueForm";

const DynamicComponent = ({ puzzleId }) => {
	const Component = lazy(() =>
		import(
			/* @vite-ignore */ `./components/puzzles/Puzzle${puzzleId}.jsx`
		).catch(() => ({
			default: () => <div>Nie znaleziono komponentu</div>,
		}))
	);

	return (
		<Suspense fallback={<div>Ładowanie...</div>}>
			<Component />
		</Suspense>
	);
};

function App() {
	const [puzzleId, setPuzzleId] = useState(1);
	const [isAboutOpen, setIsAboutOpen] = useState(false);
	const [isIssueFormOpen, setIsIssueFormOpen] = useState(false);
	const [wynik, setWynik] = useState(""); // Stan do wyświetlania wyniku
	const [tekst, setTekst] = useState(""); // Stan do przechowywania tekstu odpowiedzi

	const memoizedPuzzle = useMemo(
		() => <DynamicComponent puzzleId={puzzleId} />,
		[puzzleId]
	);

	// Funkcja do sprawdzania odpowiedzi
	const checkAnswer = async (e) => {
		e.preventDefault();

		const requestData = {
			numer: parseInt(puzzleId),
			tekst: tekst, // Używamy stanu tekstu
		};

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
					setWynik("Odpowiedź jest niepoprawna.");
				}
			} else {
				setWynik("Błąd: " + data.error);
			}
		} catch (error) {
			setWynik("Wystąpił błąd podczas wysyłania zapytania.");
		}
	};

	return (
		<main className="main">
			<Header
				setIsAboutOpen={setIsAboutOpen}
				setIsIssueFormOpen={setIsIssueFormOpen}
				setPuzzleId={setPuzzleId}
			/>
			{memoizedPuzzle}
			<SubmitForm checkAnswer={checkAnswer} setTekst={setTekst} />
			<Footer />
			{isAboutOpen && <About setIsAboutOpen={setIsAboutOpen} />}
			{isIssueFormOpen && <IssueForm setIsIssueFormOpen={setIsIssueFormOpen} />}
			{wynik && <div>{wynik}</div>} {/* Wyświetlamy wynik */}
		</main>
	);
}

export default App;
