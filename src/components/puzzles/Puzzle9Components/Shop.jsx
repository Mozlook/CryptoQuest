export default function Shop({
	setPage,
	cropAmount,
	setCropAmount,
	unlocks,
	setUnlocks,
	hints,
	setHints,
}) {
	const addNewPlot = () => {
		if (cropAmount[0] - 15 > 0) {
			setCropAmount((prevCropAmount) => {
				const newCropAmount = [...prevCropAmount];
				newCropAmount[0] = newCropAmount[0] - 15;
				return newCropAmount;
			});
			setUnlocks((prevUnlocks) => ({
				...prevUnlocks,
				unlockedPlots: prevUnlocks.unlockedPlots + 1,
			}));
		}
	};

	const unlockCarrot = () => {
		if (cropAmount[0] - 10 > 0) {
			setCropAmount((prevCropAmount) => {
				const newCropAmount = [...prevCropAmount];
				newCropAmount[0] = newCropAmount[0] - 10;
				return newCropAmount;
			});
			setUnlocks((prevUnlocks) => ({
				...prevUnlocks,
				carrotsUnlocked: true,
			}));
		}
	};

	const unlockPotato = () => {
		if (cropAmount[0] - 15 > 0 && cropAmount[1] - 15 > 0) {
			setCropAmount((prevCropAmount) => {
				const newCropAmount = [...prevCropAmount];
				newCropAmount[0] = newCropAmount[0] - 15;
				newCropAmount[1] = newCropAmount[1] - 15;
				return newCropAmount;
			});
			setUnlocks((prevUnlocks) => ({
				...prevUnlocks,
				potatosUnlocked: true,
			}));
		}
	};

	const upgradeWatering = () => {
		if (cropAmount[0] - 10 > 0 && cropAmount[1] - 10 > 0) {
			setCropAmount((prevCropAmount) => {
				const newCropAmount = [...prevCropAmount];
				newCropAmount[0] = newCropAmount[0] - 10;
				newCropAmount[1] = newCropAmount[1] - 10;
				return newCropAmount;
			});
			setUnlocks((prevUnlocks) => ({
				...prevUnlocks,
				wateringSpeed: prevUnlocks.wateringSpeed + 1,
			}));
		}
	};

	const upgradeCropYield = () => {
		if (cropAmount[1] - 15 > 0 && cropAmount[2] - 15 > 0) {
			setCropAmount((prevCropAmount) => {
				const newCropAmount = [...prevCropAmount];
				newCropAmount[1] = newCropAmount[1] - 15;
				newCropAmount[2] = newCropAmount[2] - 15;
				return newCropAmount;
			});
			setUnlocks((prevUnlocks) => ({
				...prevUnlocks,
				cropYield: prevUnlocks.cropYield + 1,
			}));
		}
	};

	const upgradeGrowthSpeed = () => {
		if (
			cropAmount[0] - 5 > 0 &&
			cropAmount[1] - 5 > 0 &&
			cropAmount[2] - 5 > 0
		) {
			setCropAmount((prevCropAmount) => {
				const newCropAmount = [...prevCropAmount];
				newCropAmount[1] = newCropAmount[1] - 5;
				newCropAmount[2] = newCropAmount[2] - 5;
				newCropAmount[3] = newCropAmount[3] - 5;
				return newCropAmount;
			});
		}
		setUnlocks((prevUnlocks) => ({
			...prevUnlocks,
			growthSpeed: prevUnlocks.growthSpeed + 1,
		}));
	};

	const buyHint = () => {
		switch (hints) {
			case 0:
				if (
					cropAmount[0] - 15 > 0 &&
					cropAmount[1] - 15 > 0 &&
					cropAmount[2] - 15 > 0
				) {
					setCropAmount((prevCropAmount) => {
						const newCropAmount = [...prevCropAmount];
						newCropAmount[1] = newCropAmount[1] - 15;
						newCropAmount[2] = newCropAmount[2] - 15;
						newCropAmount[3] = newCropAmount[3] - 15;
						return newCropAmount;
					});
					setHints(1);
				}
				break;
			case 1:
				if (
					cropAmount[0] - 35 > 0 &&
					cropAmount[1] - 35 > 0 &&
					cropAmount[2] - 35 > 0
				) {
					setCropAmount((prevCropAmount) => {
						const newCropAmount = [...prevCropAmount];
						newCropAmount[1] = newCropAmount[1] - 35;
						newCropAmount[2] = newCropAmount[2] - 35;
						newCropAmount[3] = newCropAmount[3] - 35;
						return newCropAmount;
					});
					setHints(2);
				}
				break;
			case 2:
				if (
					cropAmount[0] - 55 > 0 &&
					cropAmount[1] - 55 > 0 &&
					cropAmount[2] - 55 > 0
				) {
					setCropAmount((prevCropAmount) => {
						const newCropAmount = [...prevCropAmount];
						newCropAmount[1] = newCropAmount[1] - 55;
						newCropAmount[2] = newCropAmount[2] - 55;
						newCropAmount[3] = newCropAmount[3] - 55;
						return newCropAmount;
					});
					setHints(3);
				}
				break;
			default:
				break;
		}
	};

	return (
		<>
			<div className="shop">
				<header className="header">
					<nav className="nav">
						<div className="nav-button">
							<p>
								<img
									src="Puzzle9Images/wheatIcon.webp"
									alt="wheat icon"
									className="shop-icon"
								/>
								{`Wheat ${cropAmount[0]}`}
							</p>
							{unlocks.carrotsUnlocked && (
								<p>
									{" "}
									<img
										src="Puzzle9Images/carrotIcon.webp"
										alt="carrot icon"
										className="shop-icon"
									/>
									{`Carrots ${cropAmount[1]}`}
								</p>
							)}
							{unlocks.potatosUnlocked && (
								<p>
									<img
										src="Puzzle9Images/potatoIcon.webp"
										alt="potato icon"
										className="shop-icon"
									/>
									{`Potatos ${cropAmount[2]}`}
								</p>
							)}
						</div>
						<button onClick={() => setPage(1)} className="nav-button">
							Back to the Field
						</button>
					</nav>
				</header>

				<div className="upgrades-container">
					{unlocks.unlockedPlots < 10 ? (
						<div className="upgrade">
							<p>Unlock New Plot</p>
							<button onClick={() => addNewPlot()} className="shop-button">
								15 Wheat
							</button>
						</div>
					) : (
						<div className="upgrade">
							<p>All plots unlocked!</p>
						</div>
					)}
					{!unlocks.carrotsUnlocked ? (
						<div className="upgrade">
							<p>Unlock Carrots</p>
							<button onClick={() => unlockCarrot()} className="shop-button">
								10 wheat
							</button>
						</div>
					) : !unlocks.potatosUnlocked ? (
						<div className="upgrade">
							<p>Unlock Potato</p>
							<button onClick={() => unlockPotato()} className="shop-button">
								<p>15 wheat</p>
								<p>15 carrots</p>
							</button>
						</div>
					) : (
						<div className="upgrade">
							<p>All crops Unlocked!</p>
						</div>
					)}
					<div className="upgrade">
						<p>Hint!</p>
						<button onClick={() => buyHint()} className="shop-button">
							{hints === 0 ? (
								<>
									<p>15 wheat</p>
									<p>15 carrots</p>
									<p>15 potato</p>
								</>
							) : hints === 1 ? (
								<>
									<p>35 wheat</p>
									<p>35 carrots</p>
									<p>35 potato</p>
								</>
							) : hints === 2 ? (
								<>
									<p>55 wheat</p>
									<p>55 carrots</p>
									<p>55 potato</p>
								</>
							) : (
								<p>All hints obtained</p>
							)}
						</button>
					</div>
					{unlocks.wateringSpeed < 10 ? (
						<div className="upgrade">
							<p>Upgrade Watering Can</p>
							<button onClick={() => upgradeWatering()} className="shop-button">
								<p>10 wheat</p>
								<p>10 carrots</p>
							</button>
						</div>
					) : (
						<div className="upgrade">
							<p>Maxed watering speed!</p>
						</div>
					)}

					{unlocks.cropYield < 10 ? (
						<div className="upgrade">
							<p>Upgrade Crop Yield</p>
							<button
								onClick={() => upgradeCropYield()}
								className="shop-button"
							>
								<p>15 carrots</p>
								<p>15 potatos</p>
							</button>
						</div>
					) : (
						<div className="upgrade">
							<p>Maxed crop yield!</p>
						</div>
					)}

					{unlocks.growthSpeed < 10 ? (
						<div className="upgrade">
							<p>Upgrade Growth Speed</p>
							<button
								onClick={() => upgradeGrowthSpeed()}
								className="shop-button"
							>
								<p>5 wheat</p>
								<p>5 carrots</p>
								<p>5 potatos</p>
							</button>
						</div>
					) : (
						<div className="upgrade">
							<p>Maxed growth speed!</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
