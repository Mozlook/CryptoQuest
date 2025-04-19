import { useState, useEffect } from "react";

export default function PuzzlePiece({ img, containerRef, height, width, id }) {
	const [isPressed, setIsPressed] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

	useEffect(() => {
		if (containerRef.current) {
			const containerRect = containerRef.current.getBoundingClientRect();
			const maxX = Math.max(0, containerRect.width - width);
			const maxY = Math.max(0, containerRect.height - height);

			setPosition({
				x: Math.floor(Math.random() * maxX),
				y: Math.floor(Math.random() * maxY),
			});
		}
	}, [containerRef, width, height]);

	function handlePointerDown(e) {
		const elementRect = e.target.getBoundingClientRect();
		setDragOffset({
			x: e.clientX - elementRect.left,
			y: e.clientY - elementRect.top,
		});
		setIsPressed(true);
		e.target.style.zIndex = "10";
	}

	function handlePointerUp() {
		setIsPressed(false);
		if (document.getElementById(id)) {
			document.getElementById(id).style.zIndex = "1";
		}
	}

	function handlePointerMove(e) {
		if (isPressed && containerRef.current) {
			const containerRect = containerRef.current.getBoundingClientRect();

			let x = e.clientX - containerRect.left - dragOffset.x;
			let y = e.clientY - containerRect.top - dragOffset.y;

			const containerWidth = containerRect.width;
			const containerHeight = containerRect.height;

			x = Math.max(0, Math.min(x, containerWidth - width));
			y = Math.max(0, Math.min(y, containerHeight - height));

			setPosition({ x, y });
		}
	}

	useEffect(() => {
		window.addEventListener("pointerup", handlePointerUp);
		window.addEventListener("pointermove", handlePointerMove);

		return () => {
			window.removeEventListener("pointerup", handlePointerUp);
			window.removeEventListener("pointermove", handlePointerMove);
		};
	}, [isPressed, dragOffset, width, height]);

	return (
		<div
			id={id}
			onPointerDown={handlePointerDown}
			onDragStart={(e) => e.preventDefault()}
			style={{
				position: "absolute",
				left: position.x,
				top: position.y,
				cursor: isPressed ? "grabbing" : "grab",
				userSelect: "none",
				height: `${height}px`,
				width: `${width}px`,
				backgroundImage: `url(${img})`,
				backgroundSize: "contain",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				zIndex: isPressed ? "10" : "1",
			}}
		/>
	);
}
