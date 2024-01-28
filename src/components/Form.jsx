import { useContext, useEffect, useState, useRef } from "react";
import { CursorContext } from "../Provider";
import * as XLSX from "xlsx";

function Form({ setTeams }) {
	const [people, setPeople] = useState([]);
	const { toggleHover } = useContext(CursorContext);
	const [selectedFile, setSelectedFile] = useState([]);

	function generateTeams(people, totalteams) {
		let newteams = [];
		for (let i = 1; i <= totalteams; i++) {
			newteams = [...newteams, { id: i, members: [] }];
		}

		let teamIndex = 1;
		for (let i = 0; i < people.length; i++) {
			newteams = newteams.map((team) =>
				team.id === teamIndex ? { ...team, members: [...team.members, people[i]] } : team
			);
			teamIndex = teamIndex === totalteams ? 1 : ++teamIndex;
		}
		setTeams(newteams);
	}

	function handleFileChange(e) {
		const file = e.target.files[0];
		setSelectedFile(file);
	}

	function readFile(selectedFile, peopleList) {
		let fileReader = new FileReader();
		fileReader.readAsBinaryString(selectedFile);

		fileReader.onload = (e) => {
			let data = e.target.result;
			let workbook = XLSX.read(data, { type: "binary" });

			for (let i = 0; i < workbook.Strings.length; i++) {
				if (workbook.Strings[i].t) {
					peopleList.push(workbook.Strings[i].t);
				}
			}
			peopleList = peopleList.sort((a, b) => 0.5 - Math.random());
			setPeople(peopleList);
		};
	}

	function handleSubmit(e) {
		e.preventDefault();

		const inputList = document.querySelector("#inputList").value;
		const peopleInput = inputList.split("\n");
		let peopleList = peopleInput.filter((person) => person !== "");

		if (selectedFile) {
			readFile(selectedFile, peopleList);
		} else {
			peopleList = peopleList.sort((a, b) => 0.5 - Math.random());
			setPeople(peopleList);
		}
	}

	useEffect(() => {
		const quantityValue = Number(document.querySelector("#quantityInput").value);
		const amountOfMembersRadio = document.querySelector("#amountOfMembers");

		let extras = people.length % quantityValue;
		let amountOfteams = (people.length - extras) / quantityValue;

		amountOfMembersRadio.checked
			? generateTeams(people, amountOfteams)
			: generateTeams(people, quantityValue);
	}, [people]);

	return (
		<form
			onSubmit={handleSubmit}
			className=" bg-green bg-opacity-10 p-3 flex gap-5 font-monserrat text-accent lg:justify-start"
		>
			<div className=" max-w-56 text-accent lg:flex md:max-w-lg gap-3 items-center">
				<HoverEffect rounded="rounded-md">
					<input
						type="file"
						accept=".xlsx"
						onChange={handleFileChange}
						name="fileInput"
						id="fileInput"
						onMouseEnter={toggleHover}
						onMouseLeave={toggleHover}
						className=" h-8 file:h-full cursor-pointer  file:text-offwhite file:bg-accent hover:text-offwhite text-sm max-w-60 file:border-none transition-all duration-300 "
					/>
				</HoverEffect>

				<p>and/or</p>

				<HoverEffect rounded="rounded-md">
					<textarea
						placeholder="Write members "
						id="inputList"
						onMouseEnter={toggleHover}
						onMouseLeave={toggleHover}
						className=" h-8 w-30 p-1 bg-accent bg-opacity-0 hover:placeholder:text-offwhite hover:text-offwhite placeholder:text-accent placeholder:text-opacity-50 hover:placeholder:text-opacity-50 transition-all duration-300 ease-in-out hover:h-20  focus:h-20 focus:outline-none text-sm resize-none "
					/>
				</HoverEffect>
			</div>
			<div className=" flex flex-col lg:flex-row gap-5 ">
				<div>
					<p>Generate based on:</p>
					<div className=" flex gap-2 text-sm">
						<label className="flex items-center">
							<input
								type="radio"
								name="typeOfGenerator"
								id="amountOfMembers"
								defaultChecked
								onMouseEnter={toggleHover}
								onMouseLeave={toggleHover}
								className=" appearance-none w-4 h-4 rounded-full bg-accent bg-opacity-50 checked:bg-opacity-100 hover:bg-accent transition-all duration-300 mr-1"
							/>
							members
						</label>

						<label className="flex items-center">
							<input
								type="radio"
								name="typeOfGenerator"
								id="amountOfteams"
								onMouseEnter={toggleHover}
								onMouseLeave={toggleHover}
								className="appearance-none w-4 h-4 rounded-full bg-accent bg-opacity-50 checked:bg-opacity-100 hover:bg-accent transition-all duration-300 mr-1"
							/>
							teams
						</label>
					</div>
				</div>
				<HoverEffect rounded="rounded-md">
					<input
						type="number"
						min={0}
						id="quantityInput"
						placeholder="0"
						onMouseEnter={toggleHover}
						onMouseLeave={toggleHover}
						className="  p-1 w-20 placeholder:text-opacity-50 placeholder:text-accent hover:text-offwhite hover:placeholder:text-offwhite hover:placeholder:text-opacity-50 bg-opacity-0 bg-accent"
					/>
				</HoverEffect>
			</div>
			<HoverEffect rounded="rounded-full">
				<button
					onMouseEnter={toggleHover}
					onMouseLeave={toggleHover}
					className=" mx-auto p-2 w-28 h-28 lg:h-auto z-20"
				>
					GENERATE!
				</button>
			</HoverEffect>
		</form>
	);
}

function HoverEffect(props) {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const wrapperRef = useRef(null);

	function handleCursorMove(e) {
		let wrapperPosition = wrapperRef.current.getBoundingClientRect();
		setPosition({ x: e.clientX - wrapperPosition.x, y: e.clientY - wrapperPosition.y });
	}

	useEffect(() => {
		wrapperRef.current.addEventListener("mousemove", handleCursorMove);
		return () => {
			wrapperRef.current.removeEventListener("mousemove", handleCursorMove);
		};
	}, [position]);

	return (
		<div
			ref={wrapperRef}
			className={` group relative ${props.rounded} h-auto bg-black bg-opacity-25 hover:text-offwhite m-auto overflow-hidden z-0 `}
		>
			<div
				style={{
					top: `${position.y}px`,
					left: `${position.x}px`,
					pointerEvents: "none",
				}}
				className={` scale-0 group-hover:scale-100 absolute w-96 h-96 rounded-full bg-accent -translate-x-[50%] -translate-y-[50%] -z-10 transition-scale duration-300`}
			></div>
			{props.children}
		</div>
	);
}

export default Form;
