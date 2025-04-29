import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Plant from "./Plant.jsx";

export default function Field({
	cropAmount,
	setCropAmount,
	plants,
	setPlants,
	MAX,
	setPage,
	unlocks,
}) {
	const [isPlantOpen, setIsPlantOpen] = useState(false);
	const [activeButton, setActiveButton] = useState(null);

	const handleButtonClick = (actionName, plantList) => {
		setIsPlantOpen(plantList);
		setActiveButton(actionName);
	};

	const setCrop = (id, PlantType) => {
		setCropAmount((prevCropAmount) => {
			const newCropAmount = [...prevCropAmount];
			newCropAmount[PlantType - 1] = newCropAmount[PlantType - 1] - 1;
			return newCropAmount;
		});
		setPlants((prevPlants) => {
			const newPlants = [...prevPlants];
			if (newPlants[id].type === 0) {
				newPlants[id] = {
					...newPlants[id],
					type: PlantType,
					stage: 1,
					growthCount: 0,
					spoilCount: 0,
					spoiled: false,
					ready: false,
				};
			}

			return newPlants;
		});
	};

	const handleElementClick = (id) => {
		const plant = plants[id];

		if (activeButton === "Pszenica") {
			if (cropAmount[0] > 0) {
				setCrop(id, 1);
			}
		} else if (activeButton === "Marchewka") {
			if (cropAmount[1] > 0) {
				setCrop(id, 2);
			}
		} else if (activeButton === "Ziemniak") {
			if (cropAmount[2] > 0) {
				setCrop(id, 3);
			}
		} else if (activeButton === "Podlewanie") {
			setPlants((prevPlants) => {
				const newPlants = [...prevPlants];
				const plant = newPlants[id];
				const newGrowthCount = plant.growthCount + unlocks.wateringSpeed;

				newPlants[id] = {
					...plant,
					growthCount: newGrowthCount,
					ready:
						newGrowthCount >= MAX - unlocks.growthSpeed && plant.stage < 4
							? true
							: plant.ready,
				};
				return newPlants;
			});
		} else if (activeButton === "Nawozenie" && plant.ready && !plant.spoiled) {
			setPlants((prevPlants) => {
				const newPlants = [...prevPlants];
				newPlants[id] = {
					...newPlants[id],
					stage: Math.min(4, newPlants[id].stage + 1),
					ready: false,
					growthCount: 0,
					spoilCount: 0,
				};
				return newPlants;
			});
		} else if (activeButton === "Ratowanie" && plant.spoiled) {
			setPlants((prevPlants) => {
				const newPlants = [...prevPlants];
				newPlants[id] = {
					...newPlants[id],
					spoiled: false,
					spoilCount: 0,
					ready: false,
					growthCount: 0,
					stage: newPlants[id].stage === 4 ? 3 : newPlants[id].stage,
				};
				return newPlants;
			});
		} else if (activeButton === "Scinanie") {
			if (plants[id].stage === 4) {
				setCropAmount((prevAmount) => {
					const newAmount = [...prevAmount];
					newAmount[plants[id].type - 1] =
						newAmount[plants[id].type - 1] + unlocks.cropYield;
					return newAmount;
				});
			}
			setPlants((prevPlants) => {
				const newPlants = [...prevPlants];

				newPlants[id] = {
					...newPlants[id],
					type: 0,
					stage: 1,
					growthCount: 0,
					spoilCount: 0,
					spoiled: false,
					ready: false,
				};

				return newPlants;
			});
		}
	};

	// Wzrost rosliny
	useEffect(() => {
		const growthTimer = setInterval(() => {
			setPlants((prevPlants) => {
				return prevPlants.map((plant) => {
					if (plant.type === 0 || plant.spoiled) return plant;

					if (
						plant.stage < 4 &&
						plant.growthCount < MAX - unlocks.growthSpeed
					) {
						const newGrowthCount = plant.growthCount + 0.1;
						const becomeReady =
							newGrowthCount >= MAX - unlocks.growthSpeed && !plant.ready;

						return {
							...plant,
							growthCount: newGrowthCount,
							ready: becomeReady ? true : plant.ready,
						};
					}
					return plant;
				});
			});
		}, 100);

		return () => clearInterval(growthTimer);
	}, []);

	// Psucie rosliny
	useEffect(() => {
		const spoilTimer = setInterval(() => {
			setPlants((prevPlants) => {
				return prevPlants.map((plant) => {
					if (
						plant.type === 0 ||
						(!plant.ready && plant.stage !== 4) ||
						plant.spoiled
					)
						return plant;

					const newSpoilCount = plant.spoilCount + 1;
					const becomeSpoiled = newSpoilCount >= MAX;

					return {
						...plant,
						spoilCount: newSpoilCount,
						spoiled: becomeSpoiled ? true : plant.spoiled,
					};
				});
			});
		}, 1000);

		return () => clearInterval(spoilTimer);
	}, []);
	return (
		<>
			<Header
				handleButtonClick={handleButtonClick}
				isPlantOpen={isPlantOpen}
				cropAmount={cropAmount}
				setPage={setPage}
				unlocks={unlocks}
			/>
			<div className="pole">
				{plants.map((plant, index) => (
					<Plant
						key={index}
						id={index}
						type={plant.type}
						stage={plant.stage}
						max={MAX}
						interval={1000}
						spoiled={plant.spoiled}
						ready={plant.ready}
						growthCount={plant.growthCount}
						spoilCount={plant.spoilCount}
						handleElementClick={handleElementClick}
						unlocks={unlocks}
					/>
				))}
			</div>
		</>
	);
}
