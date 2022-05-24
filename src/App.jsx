import { useEffect, useMemo, useState } from "react";
import "./app.css";
import Maintenance from "./components/Maintenance";
import Start from "./components/Start";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import { data } from "./assets/questions";

function App() {
	const moneyPyramid = useMemo(
		() =>
			[
				{ id: 1, amount: "$ 100" },
				{ id: 2, amount: "$ 200" },
				{ id: 3, amount: "$ 300" },
				{ id: 4, amount: "$ 500" },
				{ id: 5, amount: "$ 1.000" },
				{ id: 6, amount: "$ 2.000" },
				{ id: 7, amount: "$ 4.000" },
				{ id: 8, amount: "$ 8.000" },
				{ id: 9, amount: "$ 16.000" },
				{ id: 10, amount: "$ 32.000" },
				{ id: 11, amount: "$ 64.000" },
				{ id: 12, amount: "$ 125.000" },
				{ id: 13, amount: "$ 250.000" },
				{ id: 14, amount: "$ 500.000" },
				{ id: 15, amount: "$ 1.000.000" },
			].reverse(),
		[]
	);

	const [username, setUsername] = useState(localStorage.getItem("username"));
	const [questionNumber, setQuestionNumber] = useState(1);
	const [stop, setStop] = useState(false);
	const [earned, setEarned] = useState("$ 0");

	useEffect(() => {
		questionNumber > 1 && setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
	}, [moneyPyramid, questionNumber]);

	const handleLogout = () => {
		localStorage.removeItem("username");
		setUsername(null);
	};

	const handleRestart = () => {
		setQuestionNumber(1);
		setStop(false);
		setEarned("$ 0");
	};

	return (
		<div className="app">
			<Maintenance />
			{username ? (
				<>
					<div className="main">
						{stop ? (
							<div className="theEnd">
								<h1 className="endText">You earned: {earned} </h1>
								<button className="endButton" onClick={handleRestart}>
									Play again ?
								</button>
							</div>
						) : (
							<>
								<div className="top">
									<div className="timer">
										<Timer setStop={setStop} questionNumber={questionNumber} />
									</div>
								</div>
								<div className="bottom">
									<Trivia data={data} setStop={setStop} questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} />
								</div>
							</>
						)}
					</div>
					<div className="pyramid">
						<div className="username">
							<div className="user">Hi, {username}</div>
							<div className="logout" onClick={handleLogout}>
								LOGOUT
							</div>
						</div>
						<ul className="moneyList">
							{moneyPyramid.map((m) => {
								return (
									<li className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"} key={m.id}>
										<span className="moneyListItemNumber">{m.id}</span>
										<span className="moneyListItemAmount">{m.amount}</span>
									</li>
								);
							})}
						</ul>
						<div className="footer">
							<h3>Who Wants to Be a Millionaire?</h3>
							<h5>By Zainal Abidin</h5>
						</div>
					</div>
				</>
			) : (
				<Start username={username} setUsername={setUsername} />
			)}
		</div>
	);
}

export default App;
