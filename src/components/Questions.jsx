import { useState } from "react";
import CardIcon from "../assets/CardIcon";
import SummaryIcon from "../assets/SummaryIcon";
import GameIcon from "../assets/GameIcon";

export const Questions = ({ result }) => {
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const parseQuestions = (text = "") => {
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

  const questionsArray = result?.questions
    ? parseQuestions(result.questions)
    : [];
  const summaryContent = result?.summary || "Resumen no disponible";

  const pairs = questionsArray.flatMap((qa) => [
    { text: qa.question, id: qa.question, isQuestion: true },
    { text: qa.answer, id: qa.question, isQuestion: false },
  ]);

  // Función para mezclar el arreglo de cartas
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Mezcla el arreglo de pairs antes de mapear
  const shuffledPairs = shuffleArray(pairs);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2) return;

    if (!flippedCards.includes(index) && !matchedCards.includes(index)) {
      const newFlipped = [...flippedCards, index];
      setFlippedCards(newFlipped);

      if (newFlipped.length === 2) {
        const [firstIndex, secondIndex] = newFlipped;
        const firstCard = shuffledPairs[firstIndex];
        const secondCard = shuffledPairs[secondIndex];

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
    <section className="bg-[#1A1A1A] p-8 mt-6 rounded-lg shadow-lg box-border">
      <h2 className="text-2xl text-[#D75A5A] font-bold mb-4 flex justify-center items-center gap-4">
        Resumen
        <SummaryIcon />
      </h2>
      <p className="text-white text-lg text-balance font-semibold mb-6">
        {summaryContent}
      </p>

      <h2 className="text-2xl text-[#D75A5A] font-bold flex items-center justify-center gap-4 mb-6">
        Juego de Memoria
        <GameIcon />
      </h2>
      <div className="w-full mt-4">
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(285px,_1fr))] gap-6 px-2">
          {shuffledPairs.map((card, index) => (
            <div
              key={index}
              className={`flex justify-center items-center cursor-pointer p-2 border-2 border-transparent rounded-lg text-[#FFFA] transition-colors duration-300 ease-in-out ${
                isFlipped(index) ? "flipped" : ""
              } ${
                isMatched(index) ? "matched bg-[#D75A5ABB]" : ""
              } hover:border-[#FFFA]`}
              onClick={() => handleCardClick(index)}
            >
              <div
                className={`h-[24rem] flex justify-center items-center transform ${
                  isFlipped(index) ? "rotate-y-0" : "rotate-y-180"
                } transition-transform duration-600 ease-in-out rounded-lg text-white font-semibold`}
              >
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
