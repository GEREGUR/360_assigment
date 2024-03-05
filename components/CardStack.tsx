'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Card = {
  id: number;
  content: string;
};

export const CardStack = ({
  items,
  offset = 10,
}: {
  items: Card[];
  offset?: number;
}) => {
  const [cards, setCards] = useState<Card[]>(items);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const prevCard = () => {
    if (questionNumber > 0) {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
      setQuestionNumber((prev) => prev - 1);
    }
  };

  const nextCard = () => {
    if (questionNumber + 1 < cards.length) {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards];
        newArray.push(newArray.shift()!);
        return newArray;
      });
      setQuestionNumber((prev) => prev + 1);
    } else {
      setIsDone(true);
    }
  };

  if (!cards.length) return <div>Произошла ошибка.</div>;
  if (isDone) return <div>Опрос завершен.</div>;

  return (
    <div className="relative h-72 w-4/5 md:w-[700px]">
      {cards.map((card, i) => {
        if (i > 1) return;

        return (
          <motion.div
            key={card.id}
            className={cn(
              'absolute bg-[#6580D8] h-72 w-full rounded-3xl p-4 shadow-xl shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between z-10',
              card.id % 2 === 0 ? 'bg-[#6580D8]' : 'bg-[#1A3199]',
              cards.length % 2 !== 0 &&
                questionNumber + i === cards.length &&
                'bg-[#1A3199]',
              i !== 0 && 'z-0'
            )}
            animate={{
              top: i === 0 ? offset : i * -offset,
              left: i === 0 ? -offset : i * offset,
              transition: { ease: 'easeIn', duration: 0.3 },
            }}
          >
            <div className="h-full relative text-white">
              <div className="absolute top-4 text-center w-full">
                вопрос {questionNumber + 1}/{cards.length}
              </div>
              <div className="h-full flex items-center justify-center text-center mx-2 md:text-lg">
                {card.content}
              </div>
            </div>
          </motion.div>
        );
      })}
      <div className="flex justify-center gap-x-4 pt-80">
        <button
          onClick={prevCard}
          className={cn(
            'border rounded-xl py-2 px-4',
            questionNumber === 0 && 'cursor-default opacity-50'
          )}
        >
          prev
        </button>
        <button
          onClick={nextCard}
          className="border rounded-xl py-2 px-4"
        >
          next
        </button>
      </div>
    </div>
  );
};
