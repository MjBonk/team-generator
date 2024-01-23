import { useState, useEffect } from "react";

function Clock() {
	const [time, setTime] = useState(new Date());

	function formatTime() {
		const hour = time.getHours();
		const min = time.getMinutes();
		const sec = time.getSeconds();

		return `${hour}:${min}:${sec}`;
	}

	useEffect(() => {
		const clockInterval = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(clockInterval)
	},[]);

	return <div className=" text-lb">{formatTime()}</div>;
}

export default Clock;
