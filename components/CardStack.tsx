"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Card = {
  id: number;
  content: string;
};

export const CardStack = ({ items }: { items: Card[] }) => {
  const [cards, setCards] = useState<Card[]>(items);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [direction, setDirection] = useState("forward");

  const handleNext = () => {
    setDirection("forward");
    setTimeout(
      () => setQuestionNumber((prev) => Math.min(prev + 1, cards.length - 1)),
      0,
    );
  };

  const handlePrev = () => {
    setDirection("back");
    setTimeout(() => setQuestionNumber((prev) => Math.max(prev - 1, 0)), 0);
  };

  const variants = {
    initial: { opacity: 0, x: 20, y: -20 },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -100 },
    initialBack: { opacity: 0, x: -100 },
    animateBack: { opacity: 1, x: 0 },
    exitBack: {
      x: questionNumber === cards.length - 1 ? 10 : 20,
      y: questionNumber === cards.length - 1 ? -10 : -20,
      backgroundColor: "#1A3199",
    },
  };

  if (!cards.length) return <div>Произошла ошибка.</div>;

  return (
    <div className="relative h-72 w-4/5 md:h-[380px] md:w-[700px]">
      <AnimatePresence initial={false} custom={questionNumber}>
        <motion.div
          key={questionNumber}
          className={cn(
            "absolute right-[10px] top-[10px] z-10 flex h-72 w-full flex-col justify-between rounded-3xl bg-[#6580D8] p-4 shadow-xl shadow-black/[0.1] md:h-[380px] dark:shadow-white/[0.05]",
            questionNumber === cards.length - 1 && "right-0 top-0",
          )}
          variants={variants}
          initial={direction === "forward" ? "initial" : "initialBack"}
          animate={direction === "forward" ? "animate" : "animateBack"}
          exit={direction === "forward" ? "exit" : "exitBack"}
          custom={questionNumber}
          transition={{ duration: 0.2, type: "linear" }}
        >
          <div className="relative h-full text-white">
            <div className="absolute top-4 w-full text-center">
              вопрос {questionNumber + 1}/{cards.length}
            </div>
            <div className="mx-2 flex h-full items-center justify-center text-center md:text-lg">
              {cards[questionNumber].content}
            </div>
          </div>
        </motion.div>
        {questionNumber !== cards.length - 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, type: "linear", ease: "easeInOut" }}
            className="absolute bottom-[10px] left-[10px] z-0 flex h-72 w-full flex-col justify-between rounded-3xl bg-[#1A3199] p-4 shadow-xl shadow-black/[0.1] md:h-[380px] dark:shadow-white/[0.05]"
          />
        )}
      </AnimatePresence>
      <div className="flex justify-center gap-x-4 pt-80">
        <button
          onClick={handlePrev}
          className={cn(
            "rounded-xl border px-4 py-2",
            questionNumber === 0 && "cursor-default opacity-50",
          )}
        >
          prev
        </button>
        <button onClick={handleNext} className="rounded-xl border px-4 py-2">
          next
        </button>
      </div>
    </div>
  );
};
