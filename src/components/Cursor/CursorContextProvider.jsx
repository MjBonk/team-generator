import { createContext, useState, useRef } from "react";

//"Note that we’re exporting CursorContext because we’ll need it later to access the cursor context in other components."
export const CursorContext = createContext();

function CursorContextProvider({ children }) {
	// const [cursor, setCursor] = useState({active: false})
	let isHovering = useRef(false);

	function toggleHover() {
		isHovering.current = !isHovering.current;
	}

	//Then, we create a component named CursorContextProvider that returns the Provider component of the cursor context we
	//just created. In React, the context Provider grants any of its children access to whatever is defined in its value prop.
	// In our case, we pass a state variable cursor and the function that updates that variable setCursor. We set the initial
	//state of cursor to be an object with a single property active, which we’ll use later to give our cursor an “active” style.

	const value = {
		isHovering,
		toggleHover,
	};

	return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export default CursorContextProvider;
