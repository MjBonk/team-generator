function TeamCard(props) {
	return (
		<div className="p-2 mw-40 bg-beige grid gap-2 rounded-xl">
			<h1 style={{ color: `${props.textColor}` }} className=" font-black font-monserrat">
				TEAM {props.id}
			</h1>
			<ul
				style={{
					backgroundColor: `${props.bgColor}`,
					color: props.bgColor === "#F6ED59" ? "#0D5747" : "#F5F5F5",
				}}
				className=" p-2"
			>
				{props.members.map((member, index) => {
					return (
						<li key={index} className=" font-monserrat">
							⚉ {member}
						</li>
					);
				})}
			</ul>
			<div style={{ backgroundColor: `${props.textColor}` }} className=" w-7 h-2"></div>
		</div>
	);
}

export default TeamCard;
