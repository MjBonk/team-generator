import { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";

function Form({ setGroups, isHoveringRef }) {
	const [people, setPeople] = useState([]);
	let selectedFile;

	function handleFileChange(e) {
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
			className=" bg-green bg-opacity-10 p-3 flex gap-5 font-monserrat text-accent lg:justify-start"
		>
			<div className=" max-w-56 text-accent md:flex md:max-w-lg gap-3 items-center">
				<input
					type="file"
					accept=".xlsx"
					onChange={handleFileChange}
					name="fileInput"
					id="fileInput"
					className=" h-8 file:h-full  file:text-offwhite file:bg-accent bg-accent bg-opacity-25 file:hover:bg-opacity-100 hover:bg-opacity-100 text-sm rounded-md w-full file:border-none file:transition-all file:duration-200 transition-all duration-200"
				/>

				<p>and/or</p>
				<textarea
					placeholder="Write team members "
					id="inputList"
					className=" h-8 w-[100%] p-1 bg-accent bg-opacity-25 hover:bg-opacity-100 hover:placeholder:text-offwhite hover:text-offwhite placeholder:text-accent transition-all duration-500 ease-in-out rounded-md hover:h-20  focus:h-20 focus:outline-none text-sm"
				/>
			</div>
			<div className=" flex flex-col md:flex-row gap-5 ">
				<div>
					<p>Generate based on:</p>
					<div className=" flex gap-2 text-sm">
						<label htmlFor="amountOfMembers" className="flex items-center">
							<input
								type="radio"
								name="typeOfGenerator"
								id="amountOfMembers"
								defaultChecked
								className=" appearance-none w-4 h-4 rounded-full bg-accent bg-opacity-50 checked:bg-opacity-100 hover:bg-accent transition-all duration-200 mr-1"
							/>
							members
						</label>

						<label htmlFor="amountOfGroups" className="flex items-center">
							<input
								type="radio"
								name="typeOfGenerator"
								id="amountOfGroups"
								className="appearance-none w-4 h-4 rounded-full bg-accent bg-opacity-50 checked:bg-opacity-100 hover:bg-accent transition-all duration-200 mr-1"
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
					className="  rounded-md p-1 w-12  bg-opacity-25 bg-accent hover:text-offwhite hover:bg-opacity-100 transition-all duration-200"
				/>
			</div>

			<button
				// onMouseEnter={() => handleHover(true)}
				// onMouseLeave={() => handleHover(false)}
				className=" mx-auto p-2 w-28 h-28 md:h-auto rounded-full bg-accent bg-opacity-25 hover:bg-opacity-100 hover:text-offwhite transition-all duration-200"
			>
				GENERATE!
			</button>
		</form>
	);
}

export default Form;
