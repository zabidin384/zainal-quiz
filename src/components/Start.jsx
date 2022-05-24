import "./start.css";
import { useRef } from "react";
import logo from "../assets/wwtam.png";

export default function Start({ username, setUsername }) {
	const inputRef = useRef();

	const handleClick = () => {
		inputRef.current.value && setUsername(inputRef.current.value);
		localStorage.setItem("username", inputRef.current.value);
	};
	return (
		<div className="starts">
			<h1>Welcome to Who Wants to Be a Millionaire!</h1>
			<img src={logo} alt="" />
			<div className="start">
				<input type="text" placeholder="Enter your name..." className="startInput" ref={inputRef} maxLength="20" />
				<button className="startButton" onClick={handleClick}>
					Start
				</button>
			</div>
		</div>
	);
}
