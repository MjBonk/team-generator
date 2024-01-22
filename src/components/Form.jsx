import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

function Form({ setGroups, isHoveringRef }) {
	const [people, setPeople] = useState([]);
	let selectedFile;

	async function handleFileChange(e) {
		selectedFile = e.target.files[0];
		return selectedFile;
	}

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
			className=" border border-black p-3 flex justify-center gap-2 font-monserrat"
		>
			{/* <label htmlFor="fileInput" className=" p3 border-1 bg-black">choose file</label> */}
			<input
				type="file"
				accept=".xlsx"
				onChange={handleFileChange}
				name="fileInput"
				id="fileInput"
				className=" border-2 border-accent rounded-md h-[100%]"
			/>
			<p>and/or</p>
			<textarea
				placeholder="Write team members "
				id="inputList"
				className=" h-10 pl-2 border-2 border-accent rounded-md flex transition-all duration-700 ease-in-out hover:h-20 focus:h-20 focus:outline-none"
			/>
			<div>
				<p>generate based on:</p>
				<input type="radio" name="typeOfGenerator" id="amountOfMembers" defaultChecked />
				<label htmlFor="amountOfMembers">
					members
					<input
						type="radio"
						name="typeOfGenerator"
						id="amountOfGroups"
						className=" cursor-pointer "
					/>
				</label>
				<label htmlFor="amountOfGroups">
					groups
					<input
						type="number"
						id="quantityInput"
						defaultValue={0}
						className=" h-5 w-10 "
					/>
				</label>
			</div>

			<button
				// onMouseEnter={(e)=> isHoveringRef.current = true}
				// onMouseLeave={(e)=> isHoveringRef.current = false}
				className=" border-2 border-accent rounded-full h-full p-2 text-accent hover:bg-accent hover:text-offwhite transition-all duration-200 "
			>
				GENERATE
			</button>
		</form>
	);
}

export default Form;
