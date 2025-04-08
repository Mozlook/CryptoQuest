export default function Header({
	setIsAboutOpen,
	setIsIssueFormOpen,
	setPuzzleId,
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
				{/* <button onClick={() => setPuzzleId(prev => prev + 1)}><i className="fas fa-cog"></i>PlaceHolder</button> */}
			</div>
		</header>
	);
}
