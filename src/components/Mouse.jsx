import { useState, useEffect } from "react";

function Mouse(props) {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	function handleMouseMove(e) {
		setMousePosition({ x: e.clientX, y: e.clientY });
	}

	useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<div
			style={{
				top: `${mousePosition.y}px`,
				left: `${mousePosition.x}px`,
				pointerEvents: "none",
				scale: props.isHovering ? "0" : "1",
				transition: "transform 5s linear",
			}}
			className=" w-7 h-7 bg-accent rounded-full fixed translate-x-[-50%] translate-y-[-50%] z-50  "
		></div>
	);
}

export default Mouse;
