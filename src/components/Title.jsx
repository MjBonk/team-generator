import { useEffect, useState } from "react";
function Title() {
	return (
		<div className=" text-3xl md:text-4xl lg:text-5xl font-monserrat p-2 text-title flex flex-col items-center text-center md:justify-center md:flex-row">
			<h1>I'LL PUT YOU IN THE </h1>
			<div className=" flex items-center">
				<img src="./public/Comp 1.gif" className=" w-36 md:w-40 lg:w-52 h-[100%] -my-5 -mx-1" />
				<img src="./public/giphy.gif" alt="" />
				<h1>TEAM</h1>
			</div>
		</div>
	);
}

export default Title;
