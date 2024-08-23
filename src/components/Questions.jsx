import { useState } from "react";
import CardIcon from "../assets/CardIcon";
import "../Questions.css";

export const Questions = ({ result }) => {
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const parseQuestions = (text) => {
    const lines = text.split("\n").filter((line) => line.trim() !== "");

    const questionsArray = [];
    for (let i = 0; i < lines.length; i += 2) {
      questionsArray.push({
        question: lines[i].trim(),
        answer: lines[i + 1]?.trim() || "Respuesta no disponible",
      });
    }
    return questionsArray;
  };

  const questionsArray = parseQuestions(result.questions.content);
  const pairs = questionsArray.flatMap((qa) => [
    { text: qa.question, id: qa.question, isQuestion: true },
    { text: qa.answer, id: qa.question, isQuestion: false },
  ]);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2) return;

    if (!flippedCards.includes(index) && !matchedCards.includes(index)) {
      const newFlipped = [...flippedCards, index];
      setFlippedCards(newFlipped);

      if (newFlipped.length === 2) {
        const [firstIndex, secondIndex] = newFlipped;
        const firstCard = pairs[firstIndex];
        const secondCard = pairs[secondIndex];

        if (
          firstCard.id === secondCard.id &&
          firstCard.isQuestion !== secondCard.isQuestion
        ) {
          setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
        }

        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const isFlipped = (index) =>
    flippedCards.includes(index) || matchedCards.includes(index);

  const isMatched = (index) => matchedCards.includes(index);

  return (
    <section className="quiz__container">
      <p className="summary__content">{result.summary.content}</p>

      <div className="grid__container">
        <div className="memory__grid">
          {pairs.map((card, index) => (
            <div
              key={index}
              className={`memory__card ${isFlipped(index) ? "flipped" : ""} ${
                isMatched(index) ? "matched" : ""
              }`}
              onClick={() => handleCardClick(index)}
            >
              <div className="card__content">
                {isFlipped(index) ? card.text : <CardIcon />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Questions;
