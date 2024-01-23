import { useState, useEffect } from "react";

function Cursor(props) {
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

	function handleCursorMove(e) {
		setCursorPosition({ x: e.clientX, y: e.clientY });
	}

	useEffect(() => {
		window.addEventListener("mousemove", handleCursorMove);
		return () => {
			window.removeEventListener("mousemove", handleCursorMove);
		};
	}, []);

	return (
		<div
			style={{
				top: `${cursorPosition.y}px`,
				left: `${cursorPosition.x}px`,
				pointerEvents: "none",
				scale: props.isHovering ? "0" : "1",
				transition: "transform 5s linear",
			}}
			className=" w-7 h-7 bg-accent rounded-full fixed translate-x-[-50%] translate-y-[-50%] z-50  "
		></div>
	);
}

export default Cursor;
