import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import { useState } from "react";
import QUESTIONS from '../questions';

export default function Question({ index, questionText, answers, selectedAnswer, answerState, onSelectAnswer, onSkipAnswer }) {  // Use answerState directly

    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        });

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            });

            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);

        }, 1000);
    }

    let computedAnswerState = '';
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        computedAnswerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        computedAnswerState = 'answered';
    }

    return (
        <div id="question">
            <QuestionTimer
                timeout={10000}
                onTimeout={onSkipAnswer}
            />
            <h2>{QUESTIONS[index].text}</h2>
            <Answers
                answers={QUESTIONS[index].answers}
                answerState={computedAnswerState}  // Use computedAnswerState
                selectedAnswer={answer.selectedAnswer}
                onSelect={handleSelectAnswer}
            />
        </div>
    );
}
