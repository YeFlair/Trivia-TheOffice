import React, { useState, useEffect, useCallback } from 'react';
import styles from './TriviaGame.module.css';
import CategorySelector from './CategorySelector';
import Question from './Question';
import questions from './questions';
import { database } from '../firebase';

const TriviaGame = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [username, setUsername] = useState('');
  const [showScoreSubmission, setShowScoreSubmission] = useState(false);
  const [nameError, setNameError] = useState('');
  const [remainingTime, setRemainingTime] = useState(30);
  const [isNameValid, setIsNameValid] = useState(false);

  const handleAnswer = useCallback((answer) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: answer });
  }, [selectedAnswers, currentQuestionIndex]);

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    resetTimer();
  };

  const handlePrev = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    resetTimer();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
  };

  const categories = Array.from(
    new Set(questions.map((question) => question.category))
  );

  const filteredQuestions =
    selectedCategory === ''
      ? questions
      : questions.filter(
          (question) => question.category === selectedCategory
        );

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const calculateScore = () => {
    return filteredQuestions.reduce((score, question, index) => {
      if (selectedAnswers[index] === question.answer) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  const submitScore = async () => {
    await database.ref('scores').push({
      username,
      score: calculateScore(),
    });
    setShowScoreSubmission(false);
  };

  const validateName = () => {
    if (username.trim().length < 3) {
      setNameError("Name must be at least 3 characters long");
      setIsNameValid(false);
      return false;
    }
    setNameError("");
    setIsNameValid(true);
    return true;
  };

  const handleSubmit = () => {
    if (validateName()) {
      submitScore();
    }
  };

  useEffect(() => {
    if (remainingTime === 0) {
      handleAnswer(null);
      handleNext();
    } else {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [remainingTime]);

  const resetTimer = () => {
    setRemainingTime(30);
  };

  return (
    <div className={styles.container}>
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={handleCategoryChange}
      />
      <Question
        question={currentQuestion.question}
        options={currentQuestion.options}
        selectedAnswer={selectedAnswers[currentQuestionIndex]}
        handleAnswer={handleAnswer}
      />
      <div>Time remaining: {remainingTime}s</div>
      {currentQuestionIndex > 0 && (
        <button className={styles.button} onClick={handlePrev}>
          Previous
        </button>
      )}
      {currentQuestionIndex < filteredQuestions.length - 1 ? (
        <button className={styles.button} onClick={handleNext}>
          Next
        </button>
      ) : (
        <button
          className={styles.button}
          onClick={() => setShowScoreSubmission(true)}
        >
          Submit
        </button>
      )}

      {showScoreSubmission ? (
        <div className={styles.submitScore}>
          <h3>Submit your score</h3>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              validateName();
            }}
          />
          {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
          <button
            className={styles.button}
            onClick={handleSubmit}
            disabled={!isNameValid}
          >
            Submit
          </button>
          <button
            className={styles.button}
            onClick={() => setShowScoreSubmission(false)}
          >
            Cancel
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default TriviaGame;
