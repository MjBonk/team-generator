import React, { useState, useRef, createContext } from "react";
import CursorContextProvider from "./Provider";
import Cursor from "./components/Cursor";
import TeamCard from "./components/TeamCard";
import Title from "./components/Title";
import Marquee from "./components/Marquee";
import Form from "./components/Form.jsx";

function App() {
	const [teams, setTeams] = useState([]);

	function generateColorCombo() {
		const colors = ["#E578AB", "#F6ED59", "#AD283A", "#494943", "#889D81", "#DA7B00", "#3942C5", "#0D5747"];

		const color1 = colors[Math.floor(Math.random() * colors.length)];
		const filterdColors = colors.filter((color) => color !== color1);
		const color2 = filterdColors[Math.floor(Math.random() * filterdColors.length)];

		return [color1, color2];
	}

	return (
		<CursorContextProvider>
			<Cursor />
			<main className=" bg-bg min-h-screen overflow-hidden cursor-none ">
				<Title />
				<Form setTeams={setTeams} />

				<section className=" py-10 px-5 pb-20 md:px-10">
					<ul className=" flex flex-wrap gap-7 justify-center">
						{teams.map((team, index) => {
							const [bgColor, textColor] = generateColorCombo();

							return (
								<li key={index}>
									<TeamCard
										id={team.id}
										members={team.members}
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
