import { useState } from "react";
import "../App.css";

export const Questions = ({ result }) => {
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

  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

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
      <div>
        <p className="summary__content">{result.summary.content}</p>
      </div>

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
                {isFlipped(index) ? (
                  card.text
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-play-card"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    stroke-width="0.5"
                    stroke="#d75a5a"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M19 5v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z" />
                    <path d="M8 6h.01" />
                    <path d="M16 18h.01" />
                    <path d="M12 16l-3 -4l3 -4l3 4z" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Questions;
