import React, { Suspense, lazy, useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import SubmitForm from "./components/SubmitForm";
import Footer from "./components/Footer";
import About from "./components/About";
import IssueForm from "./components/IssueForm";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import LoginMain from "./components/LoginMain.jsx";
import "./index.css";

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
	const [puzzleId, setPuzzleId] = useState(1);
	const [isAboutOpen, setIsAboutOpen] = useState(false);
	const [isIssueFormOpen, setIsIssueFormOpen] = useState(false);
	const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
	const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);
	const [tekst, setTekst] = useState("");
	const [csrftoken, setCsrftoken] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(
		!!sessionStorage.getItem("authToken")
	);

	useEffect(() => {
		if (!isLoggedIn) {
			setPuzzleId(1);
			return;
		}

		const token = sessionStorage.getItem("authToken");

		axios
			.get("https://api.mmozoluk.com/api/sprawdz-progres/", {
				headers: {
					Authorization: `Token ${token}`,
				},
			})
			.then((response) => {
				setPuzzleId(response.data.progress);
			})
			.catch((error) => {
				console.error("Błąd:", error);
				setPuzzleId(1);
			});
	}, [isLoggedIn]);

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
			console.log("Sending request with CSRF token:", csrftoken);
			const response = await fetch("https://api.mmozoluk.com/api/sprawdz/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": csrftoken,
				},
				credentials: "include",
				body: JSON.stringify(requestData),
			});

			const responseText = await response.text();
			console.log("Raw response:", responseText);

			try {
				const data = JSON.parse(responseText);

				if (response.ok) {
					if (data.result === true) {
						setPuzzleId((prevPuzzleId) => prevPuzzleId + 1);
					} else {
						console.log("Wrong Answer");
					}
				} else {
					console.log("Error: " + (data.error || "Unknown error"));
				}
			} catch (jsonError) {
				console.error("Response is not valid JSON:", jsonError);
				console.log("Response status:", response.status);
			}
		} catch (error) {
			console.log("Error while sending request");
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
			{!isLoggedIn && puzzleId > 1 && (
				<>
					<LoginMain
						setIsRegisterFormOpen={setIsRegisterFormOpen}
						setIsLoggedIn={setIsLoggedIn}
					/>
				</>
			)}
			<>
				<DynamicComponent puzzleId={puzzleId} />
				<SubmitForm
					checkAnswer={checkAnswer}
					setTekst={setTekst}
					tekst={tekst}
				/>
			</>

			<Footer />
			{isAboutOpen && <About setIsAboutOpen={setIsAboutOpen} />}
			{isIssueFormOpen && <IssueForm setIsIssueFormOpen={setIsIssueFormOpen} />}
			{isLoginFormOpen && (
				<Login
					setIsLoginFormOpen={setIsLoginFormOpen}
					setIsLoggedIn={setIsLoggedIn}
					setIsRegisterFormOpen={setIsRegisterFormOpen}
				/>
			)}
			{isRegisterFormOpen && (
				<Register setIsRegisterFormOpen={setIsRegisterFormOpen} />
			)}
		</main>
	);
}

export default App;
