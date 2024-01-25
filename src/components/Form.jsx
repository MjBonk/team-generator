import { useContext, useEffect, useState } from "react";
import { CursorContext } from "./Cursor/CursorContextProvider";
import * as XLSX from "xlsx";

function Form({ setGroups }) {
	const [people, setPeople] = useState([]);
	// const [, setCursor] = useContext(CursorContext);
	const { toggleHover } = useContext(CursorContext);
	let selectedFile;

	function setGroupObjects(people, totalGroups) {
		let newGroups = [];
		for (let i = 1; i <= totalGroups; i++) {
			newGroups = [...newGroups, { id: i, members: [] }];
		}

		let groupIndex = 1;
		for (let i = 0; i < people.length; i++) {
			newGroups = newGroups.map((group) =>
				group.id === groupIndex ? { ...group, members: [...group.members, people[i]] } : group
			);
			groupIndex = groupIndex === totalGroups ? 1 : ++groupIndex;
		}
		setGroups(newGroups);
	}

	function handleFileChange(e) {
		selectedFile = e.target.files[0];
	}

	function handleSubmit(e) {
		e.preventDefault();

		const inputList = document.querySelector("#inputList").value;
		const peopleInput = inputList.split("\n");
		const peopleList = peopleInput.filter((person) => person !== "");

		if (selectedFile) {
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
				setPeople(peopleList);
			};
		} else {
			setPeople(peopleList);
		}
	}

	useEffect(() => {
		const quantityValue = Number(document.querySelector("#quantityInput").value);
		const amountOfMembersRadio = document.querySelector("#amountOfMembers");

		let extras = people.length % quantityValue;
		let amountOfGroups = (people.length - extras) / quantityValue;

		amountOfMembersRadio.checked
			? setGroupObjects(people, amountOfGroups)
			: setGroupObjects(people, quantityValue);
	}, [people]);

	return (
		<form
			onSubmit={handleSubmit}
			className=" bg-green bg-opacity-10 p-3 flex gap-5 font-monserrat text-accent lg:justify-start"
		>
			<div className=" max-w-56 text-accent md:flex md:max-w-lg gap-3 items-center">
				<input
					type="file"
					accept=".xlsx"
					onChange={handleFileChange}
					name="fileInput"
					id="fileInput"
					onMouseEnter={toggleHover}
					onMouseLeave={toggleHover}
					className=" h-8 file:h-full  file:text-offwhite file:bg-accent bg-accent bg-opacity-25 file:hover:bg-opacity-100 hover:bg-opacity-100 hover:text-offwhite text-sm rounded-md w-full file:border-none file:transition-all file:duration-500 transition-all duration-500"
				/>

				<p>and/or</p>
				<textarea
					placeholder="Write team members "
					id="inputList"
					onMouseEnter={toggleHover}
					onMouseLeave={toggleHover}
					className=" h-8 w-[100%] p-1 bg-accent bg-opacity-25 hover:bg-opacity-100 hover:placeholder:text-offwhite hover:text-offwhite placeholder:text-accent transition-all duration-500 ease-in-out rounded-md hover:h-20  focus:h-20 focus:outline-none text-sm"
				/>
			</div>
			<div className=" flex flex-col md:flex-row gap-5 ">
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
								className=" appearance-none w-4 h-4 rounded-full bg-accent bg-opacity-50 checked:bg-opacity-100 hover:bg-accent transition-all duration-500 mr-1"
							/>
							members
						</label>

						<label className="flex items-center">
							<input
								type="radio"
								name="typeOfGenerator"
								id="amountOfGroups"
								onMouseEnter={toggleHover}
								onMouseLeave={toggleHover}
								className="appearance-none w-4 h-4 rounded-full bg-accent bg-opacity-50 checked:bg-opacity-100 hover:bg-accent transition-all duration-500 mr-1"
							/>
							teams
						</label>
					</div>
				</div>

				<input
					type="number"
					min={0}
					id="quantityInput"
					defaultValue={0}
					onMouseEnter={toggleHover}
					onMouseLeave={toggleHover}
					className="  rounded-md p-1 w-20 bg-opacity-25 bg-accent hover:text-offwhite hover:bg-opacity-100 transition-all duration-500"
				/>
			</div>

			<button
				onMouseEnter={toggleHover}
				onMouseLeave={toggleHover}
				className=" mx-auto p-2 w-28 h-28 md:h-auto rounded-full bg-accent bg-opacity-25 hover:bg-opacity-100 hover:text-offwhite transition-all duration-500 cursor-none"
			>
				GENERATE!
			</button>
		</form>
	);
}

export default Form;
