export default function Header({
	isPlantOpen,
	handleButtonClick,
	cropAmount,
	setPage,
	unlocks,
}) {
	return (
		<header className="header">
			<nav className="nav">
				<div className="dropdown">
					<button
						onClick={() => handleButtonClick(null, !isPlantOpen)}
						className="nav-button dropdown-button"
					>
						Crops
					</button>
					{isPlantOpen && (
						<ul className="plant-list">
							<li onClick={() => handleButtonClick("Pszenica", false)}>
								<img src="Puzzle9Images/wheatIcon.webp" alt="wheat icon" />
								{`Wheat: ${cropAmount[0]}`}
							</li>
							{unlocks.carrotsUnlocked && (
								<li onClick={() => handleButtonClick("Marchewka", false)}>
									<img src="Puzzle9Images/carrotIcon.webp" alt="wheat icon" />
									{`Carrot: ${cropAmount[1]}`}
								</li>
							)}
							{unlocks.potatosUnlocked && (
								<li onClick={() => handleButtonClick("Ziemniak", false)}>
									<img src="Puzzle9Images/potatoIcon.webp" alt="wheat icon" />
									{`Potato: ${cropAmount[2]}`}
								</li>
							)}
						</ul>
					)}
				</div>
				<button
					onClick={() => handleButtonClick("Podlewanie", false)}
					className="nav-button"
				>
					Watering
				</button>
				<button
					onClick={() => handleButtonClick("Nawozenie", false)}
					className="nav-button"
				>
					Fertilize
				</button>
				<button
					onClick={() => handleButtonClick("Ratowanie", false)}
					className="nav-button"
				>
					Rescue
				</button>
				<button
					onClick={() => handleButtonClick("Scinanie", false)}
					className="nav-button"
				>
					Harvest
				</button>
				<button onClick={() => setPage(2)} className="nav-button">
					Shop
				</button>
			</nav>
		</header>
	);
}
