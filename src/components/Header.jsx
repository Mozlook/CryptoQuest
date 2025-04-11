export default function Header({
	setIsAboutOpen,
	setIsIssueFormOpen,
	setPuzzleId,
	setIsLoginFormOpen,
	setIsRegisterFormOpen,
}) {
	return (
		<header>
			<div className="button-container">
				<button onClick={() => setIsAboutOpen(true)}>
					<i className="fas fa-info-circle"></i> About
				</button>
				<button onClick={() => setIsIssueFormOpen(true)}>
					<i className="fas fa-bug"></i>Report Issue
				</button>
				if (token)
				{<button onClick={() => sessionStorage.clear()}>Logout</button>} else
				{<button onClick={() => setIsLoginFormOpen(true)}>Login</button>}
				{/* <button onClick={() => setPuzzleId(prev => prev + 1)}><i className="fas fa-cog"></i>PlaceHolder</button> */}
			</div>
		</header>
	);
}
