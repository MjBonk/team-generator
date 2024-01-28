import { useState, useEffect, useContext } from "react";
import { CursorContext } from "../Provider";

function Cursor() {
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const { isHovering } = useContext(CursorContext);

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
		<>
			<div
				style={{
					top: `${cursorPosition.y}px`,
					left: `${cursorPosition.x}px`,
					pointerEvents: "none",
					scale: isHovering.current ? "0" : "1",
					backgroundColor: isHovering.current ? "#F5F5F5" : "#494943",
					transition: "scale .2s ease-in",
				}}
				className=" w-7 h-7 bg-accent rounded-full fixed  -translate-x-[50%] -translate-y-[50%] z-50 origin-top-left"
			></div>
			{/* <div
				style={{
					top: `${cursorPosition.y}px`,
					left: `${cursorPosition.x}px`,
					pointerEvents: "none",
					scale: isHovering.current ? "1" : "0",
					transition: "scale .2s linear",
					translate: "-50% -50%",
				}}
				className="fixed w-80 h-80 rounded-full bg-accent -z-0"
			></div> */}
		</>
	);
}

export default Cursor;
