import React from 'react';


const Question = ({ question, options, selectedAnswer, handleAnswer }) => {
  return (
    <div>
      <h2>{question}</h2>
      {options.map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            name={`question-${question}`}
            value={option}
            checked={selectedAnswer === option}
            onChange={() => handleAnswer(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default Question;
