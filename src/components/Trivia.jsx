import "./trivia.css";
import { useEffect, useState } from "react";
import nextId from "react-id-generator";
import useSound from "use-sound";
import correct from "../sounds/correct.mp3";
import play from "../sounds/play.mp3";
import wait from "../sounds/wait.mp3";
import wrong from "../sounds/wrong.mp3";

export default function Trivia({ data, setStop, questionNumber, setQuestionNumber }) {
	const [question, setQuestion] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [className, setClassName] = useState("answer");
	const [letsPlay] = useSound(play);
	const [correctAnswer] = useSound(correct);
	const [waitAnswer, { stop }] = useSound(wait);
	const [wrongAnswer] = useSound(wrong);

	const delay = (duration, callback) => {
		setTimeout(() => {
			callback();
		}, duration);
	};

	useEffect(() => {
		letsPlay();
	}, [letsPlay]);

	useEffect(() => {
		setQuestion(data[Math.floor(Math.random() * 5)].questions[questionNumber - 1]);
	}, [data, questionNumber]);

	const handleClick = (a) => {
		waitAnswer();
		setSelectedAnswer(a);
		setClassName("answer active");
		const keyAnswer = question.content[question.correct];
		delay(3000, () => setClassName(a === keyAnswer ? "answer correct" : "answer wrong"));
		delay(5000, () => {
			if (a === keyAnswer) {
				correctAnswer();
				delay(1000, () => stop());
				delay(1000, () => {
					setQuestionNumber((prev) => prev + 1);
					setSelectedAnswer(null);
				});
			} else {
				wrongAnswer();
				delay(1000, () => stop());
				delay(1000, () => setStop(true));
			}
		});
	};

	return (
		<div className="trivia">
			<div className="question">{question?.question}</div>
			<div className="answers">
				{question?.content.map((a) => (
					<div key={nextId()} className={selectedAnswer === a ? className : "answer"} onClick={() => handleClick(a)}>
						{a}
					</div>
				))}
			</div>
		</div>
	);
}
