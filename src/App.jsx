import React, { Suspense, lazy, useState, useEffect } from "react";
import Header from "./components/Header";
import SubmitForm from "./components/SubmitForm";
import Footer from "./components/Footer";
import About from "./components/About";
import IssueForm from "./components/IssueForm";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
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
	if (typeof document === "undefined") return null;

	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);

	if (parts.length === 2) {
		const cookieValue = parts.pop().split(";").shift();
		console.log(`Found cookie ${name} with value:`, cookieValue);
		return cookieValue;
	}

	console.log(`Cookie ${name} not found in:`, document.cookie);
	return null;
}

function App() {
	const [puzzleId, setPuzzleId] = useState(() => {
		const savedPuzzleId = getFromLocalStorage("puzzleId");
		return savedPuzzleId !== null ? savedPuzzleId : 1;
	});
	const [isAboutOpen, setIsAboutOpen] = useState(false);
	const [isIssueFormOpen, setIsIssueFormOpen] = useState(false);
	const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
	const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);
	const [wynik, setWynik] = useState("");
	const [tekst, setTekst] = useState("");
	const [csrftoken, setCsrftoken] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(
		!!sessionStorage.getItem("authToken")
	);

	useEffect(() => {
		const fetchCsrfToken = async () => {
			try {
				const response = await fetch("https://api.mmozoluk.com/api/get-csrf/", {
					method: "GET",
					credentials: "include",
					headers: {
						Accept: "application/json",
					},
				});

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const data = await response.json();

				const token = data.csrftoken;

				if (token) {
					setCsrftoken(token);
					console.log("CSRF token received:", token);
				} else {
					console.error("No CSRF token in response");
				}
			} catch (error) {
				console.error("Error fetching CSRF token:", error);
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
			const response = await fetch("https://api.mmozoluk.com/api/sprawdz/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": csrftoken,
				},
				credentials: "include",
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
			console.log(error);
		}
	};

	return (
		<main className="main">
			<Header
				setIsAboutOpen={setIsAboutOpen}
				setIsIssueFormOpen={setIsIssueFormOpen}
				setPuzzleId={setPuzzleId}
				setIsLoginFormOpen={setIsLoginFormOpen}
				setIsRegisterFormOpen={setIsRegisterFormOpen}
				setIsLoggedIn={setIsLoggedIn}
				isLoggedIn={isLoggedIn}
			/>
			{!isLoggedIn && puzzleId > 1 ? (
				<span>Login to play further</span>
			) : (
				<>
					<DynamicComponent puzzleId={puzzleId} />
					<SubmitForm
						checkAnswer={checkAnswer}
						setTekst={setTekst}
						tekst={tekst}
					/>
				</>
			)}

			<Footer />
			{isAboutOpen && <About setIsAboutOpen={setIsAboutOpen} />}
			{isIssueFormOpen && <IssueForm setIsIssueFormOpen={setIsIssueFormOpen} />}
			{isLoginFormOpen && (
				<Login
					setIsLoginFormOpen={setIsLoginFormOpen}
					setIsLoggedIn={setIsLoggedIn}
				/>
			)}
			{isRegisterFormOpen && (
				<Register setIsRegisterFormOpen={setIsRegisterFormOpen} />
			)}
		</main>
	);
}

export default App;
