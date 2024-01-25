import { useState, useEffect, useContext, } from "react";
import { CursorContext } from "./CursorContextProvider";

function Cursor(props) {
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	// const [cursor] = useContext(CursorCotext);
	const {isHovering} = useContext(CursorContext);


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
				scale: isHovering.current ? "0" : "1",
				transition: "scale .1s linear",
			}}
			className=" w-7 h-7 bg-accent rounded-full fixed -translate-x-3.5 -translate-y-3.5 z-50 origin-top-left"
		></div>
	);
}

export default Cursor;
