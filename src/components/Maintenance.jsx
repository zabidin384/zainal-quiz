import "./maintenance.css";
import React from "react";
import construction from "../assets/construction.png";

export default function Maintenance() {
	return (
		<div className="maintenance">
			<div className="maintenanceTitle">Who Wants to Be a Millionaire?</div>
			<div className="author">By Zainal Abidin</div>
			<img src={construction} alt="" />
			<div className="maintenanceDesc">
				This website is not yet available in the mobile/tablet version, please re-open it using your PC. <br /> Thank you 🙏
			</div>
		</div>
	);
}
