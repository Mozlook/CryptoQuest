import React, { Suspense, lazy, useState, useEffect } from "react";
import Header from "./components/Header";
import SubmitForm from "./components/SubmitForm";
import Footer from "./components/Footer";
import About from "./components/About";
import IssueForm from "./components/IssueForm";
import "./index.css";

const saveToLocalStorage = (key, data) => {
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch (error) {
		console.error("Błąd zapisu do LocalStorage:", error);
	}
};

const getFromLocalStorage = (key) => {
	try {
		const data = localStorage.getItem(key);
		return data ? JSON.parse(data) : null;
	} catch (error) {
		console.error("Błąd odczytu z LocalStorage:", error);
		return null;
	}
};

const DynamicComponent = React.memo(({ puzzleId }) => {
	const Component = lazy(() =>
		import(`./components/puzzles/Puzzle${puzzleId}.jsx`).catch(() =>
			import(`./components/puzzles/PuzzleFinal.jsx`)
		)
	);

	return (
		<Suspense fallback={<div>Ładowanie...</div>}>
			<Component />
		</Suspense>
	);
});

function getCookie(name) {
	const cookies = document.cookie.split(";");
	for (let cookie of cookies) {
		const [cookieName, cookieValue] = cookie.trim().split("=");
		if (cookieName === name) {
			return decodeURIComponent(cookieValue);
		}
	}
	return null;
}

function App() {
	const [puzzleId, setPuzzleId] = useState(() => {
		const savedPuzzleId = getFromLocalStorage("puzzleId");
		return savedPuzzleId !== null ? savedPuzzleId : 1;
	});
	const [isAboutOpen, setIsAboutOpen] = useState(false);
	const [isIssueFormOpen, setIsIssueFormOpen] = useState(false);
	const [wynik, setWynik] = useState("");
	const [tekst, setTekst] = useState("");
	const [csrftoken, setCsrftoken] = useState("");

	useEffect(() => {
		const fetchCsrfToken = async () => {
			try {
				let token = getCookie("csrftoken");
				if (!token) {
					const response = await fetch(
						"https://www.mmozoluk.com/api/get-csrf/",
						{
							method: "GET",
							credentials: "include",
							headers: {
								Accept: "application/json",
							},
						}
					);

					if (!response.ok) {
						throw new Error("Nie udało się pobrać tokena CSRF");
					}
					await new Promise((resolve) => setTimeout(resolve, 100));
					token = getCookie("csrftoken");
				}
				if (token) {
					setCsrftoken(token);
				} else {
					console.error("Brak tokena CSRF w ciasteczkach!");
				}
			} catch (error) {
				console.error("Błąd podczas pobierania tokena CSRF:", error);
			}
		};

		fetchCsrfToken();
	}, []);

	React.useEffect(() => {
		saveToLocalStorage("puzzleId", puzzleId);
	}, [puzzleId]);

	const checkAnswer = async (e) => {
		e.preventDefault();

		if (!csrftoken) {
			console.error("Brak tokena CSRF!");
			return;
		}

		const requestData = {
			numer: parseInt(puzzleId),
			tekst: tekst,
		};
		setTekst("");
		try {
			const response = await fetch("https://www.mmozoluk.com/api/sprawdz/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": csrftoken, // Dodaj token CSRF do nagłówków
				},
				credentials: "include", // Wymagane do przesyłania ciasteczek
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
