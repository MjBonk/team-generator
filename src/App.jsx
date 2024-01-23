import React, { useState, useRef, createContext } from "react";
import CursorContextProvider from "./components/Cursor/CursorContextProvider";
import Cursor from "./components/Cursor/Cursor";
import TeamCard from "./components/TeamCard";
import Title from "./components/Title";
import Marquee from "./components/Marquee";
import Form from "./components/Form.jsx";

function App() {
	const [groups, setGroups] = useState([]);

	function generateColorCombo() {
		const colors = ["#E578AB", "#F6ED59", "#AD283A", "#494943", "#889D81", "#DA7B00", "#3942C5", "#0D5747"];

		const color1 = colors[Math.floor(Math.random() * colors.length)];
		const filterdColors = colors.filter((color) => color !== color1);
		const color2 = filterdColors[Math.floor(Math.random() * filterdColors.length)];

		return [color1, color2];
	}

	const isHoveringRef = useRef(false);

	return (
		<CursorContextProvider>
			<Cursor />
			<main className=" bg-bg min-h-screen overflow-hidden ">
				<Title />
				<Form setGroups={setGroups} isHoveringRef={isHoveringRef} />

				<section>
					<ul className=" flex flex-wrap gap-7 justify-center p-5 lg:p-10 py-14">
						{groups.map((group, index) => {
							const [bgColor, textColor] = generateColorCombo();

							return (
								<li key={index}>
									<TeamCard
										id={group.id}
										members={group.members}
										bgColor={bgColor}
										textColor={textColor}
									/>
								</li>
							);
						})}
					</ul>
				</section>
				<Marquee />
			</main>
		</CursorContextProvider>
	);
}

export default App;
