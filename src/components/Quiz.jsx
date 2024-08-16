import { useState, useCallback } from 'react';
import QUESTIONS from '../questions';
import Question from './Question';
import quizCompleteImg from '../assets/quiz-complete.png';

export default function Quiz() {

    const [answerState, setAnswerState] = useState('');  // Ensure answerState is defined
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback((selectedAnswer) => {
        setAnswerState('answered');
        setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);

        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }

            setTimeout(() => {
                setAnswerState('');
            }, 2000);
        }, 1000);
    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null);
    }, [handleSelectAnswer]);

    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Trophy icon" />
                <h2>Quiz Completed!</h2>
            </div>
        );
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                questionText={QUESTIONS[activeQuestionIndex].text}
                answers={QUESTIONS[activeQuestionIndex].answers}
                answerState={answerState}  // Pass answerState here
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}
