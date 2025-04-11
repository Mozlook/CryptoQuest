export default function Header({
	setIsAboutOpen,
	setIsIssueFormOpen,
	setPuzzleId,
	setIsLoginFormOpen,
	setIsRegisterFormOpen,
}) {
	const token = sessionStorage.getItem("authToken");
	return (
		<header>
			<div className="button-container">
				<button onClick={() => setIsAboutOpen(true)}>
					<i className="fas fa-info-circle"></i> About
				</button>
				<button onClick={() => setIsIssueFormOpen(true)}>
					<i className="fas fa-bug"></i>Report Issue
				</button>
				{token ? (
					<button onClick={() => sessionStorage.removeItem("authToken")}>
						Logout
					</button>
				) : (
					<button onClick={() => setIsLoginFormOpen(true)}>Login</button>
				)}
				<button onClick={() => setIsLoginFormOpen(true)}>Login</button>
				{/* <button onClick={() => setPuzzleId(prev => prev + 1)}><i className="fas fa-cog"></i>PlaceHolder</button> */}
			</div>
		</header>
	);
}
