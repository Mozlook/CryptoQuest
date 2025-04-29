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

/**
 * Dynamically imports and renders a puzzle component based on `puzzleId`.
 * If the specific puzzle component fails to load, it falls back to `PuzzleFinal`.
 *
 * @component
 * @param {Object} props
 * @param {number} props.puzzleId - The current puzzle's ID.
 */
const DynamicComponent = React.memo(({ puzzleId }) => {
	const Component = lazy(() =>
		import(`./components/puzzles/Puzzle${puzzleId}.jsx`).catch(() =>
			import(`./components/puzzles/PuzzleFinal.jsx`)
		)
	);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Component />
		</Suspense>
	);
});

/**
 * The main application component.
 * Manages user state, authentication, puzzle progression, and modal visibility.
 *
 * @component
 */
function App() {
	const [puzzleId, setPuzzleId] = useState(1);
	const [isAboutOpen, setIsAboutOpen] = useState(false);
	const [isIssueFormOpen, setIsIssueFormOpen] = useState(false);
	const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
	const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);
	const [tekst, setTekst] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(
		!!localStorage.getItem("authToken") || !!sessionStorage.getItem("authToken")
	);
	let localToken;
	if (localStorage.getItem("authToken")) {
		localToken = localStorage.getItem("authToken");
	} else if (sessionStorage.getItem("authToken")) {
		localToken = sessionStorageStorage.getItem("authToken");
	}

	/**
	 * Checks the user's puzzle progress on app load or login.
	 * If the user is not logged in, resets the puzzle to ID 1.
	 */
	useEffect(() => {
		if (!isLoggedIn) {
			setPuzzleId(1);
			return;
		}

		const token = localToken ? localToken : sessionStorage.getItem("authToken");

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
				console.error("Error:", error);
				setPuzzleId(1);
			});
	}, [isLoggedIn]);

	/**
	 * Submits the user's answer and updates puzzle progression if correct.
	 *
	 * @param {React.FormEvent<HTMLFormElement>} e - Form submission event.
	 */
	const checkAnswer = async (e) => {
		e.preventDefault();

		setTekst("");
		const token = sessionStorage.getItem("authToken");

		try {
			const config = {};

			if (isLoggedIn) {
				config.headers = {
					Authorization: `Token ${token}`,
				};
			}

			const response = await axios.post(
				"https://api.mmozoluk.com/api/sprawdz-odpowiedz/",
				{ answer: tekst },
				config
			);

			if (response.data.answer === true) {
				if (isLoggedIn) {
					axios
						.get("https://api.mmozoluk.com/api/sprawdz-progres/", {
							headers: { Authorization: `Token ${token}` },
						})
						.then((response) => {
							setPuzzleId(response.data.progress);
						})
						.catch((error) => {
							console.error("Error:", error);
							setPuzzleId(1);
						});
				} else {
					setPuzzleId(2);
				}
			}
		} catch (err) {
			console.log(err.response);
			if (err.response && err.response.data) {
				setError(err.response.data);
			}
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

			{/* Display login screen if not logged in and progressed beyond puzzle 1 */}
			{!isLoggedIn && puzzleId > 1 && (
				<LoginMain
					setIsRegisterFormOpen={setIsRegisterFormOpen}
					setIsLoggedIn={setIsLoggedIn}
					puzzleId={puzzleId}
				/>
			)}

			{/* Render the dynamic puzzle component and answer submission form */}
			<DynamicComponent puzzleId={puzzleId} />
			<SubmitForm checkAnswer={checkAnswer} setTekst={setTekst} tekst={tekst} />

			<Footer />

			{/* Conditionally rendered modals/forms */}
			{isAboutOpen && <About setIsAboutOpen={setIsAboutOpen} />}
			{isIssueFormOpen && <IssueForm setIsIssueFormOpen={setIsIssueFormOpen} />}
			{isLoginFormOpen && (
				<Login
					setIsLoginFormOpen={setIsLoginFormOpen}
					setIsLoggedIn={setIsLoggedIn}
					setIsRegisterFormOpen={setIsRegisterFormOpen}
					puzzleId={puzzleId}
				/>
			)}
			{isRegisterFormOpen && (
				<Register setIsRegisterFormOpen={setIsRegisterFormOpen} />
			)}
		</main>
	);
}

export default App;
