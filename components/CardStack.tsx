"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Slider from "./Slider";
import { GrLinkPrevious } from "react-icons/gr";

type Card = {
  id: number;
  content: string;
};

export const CardStack = ({ items }: { items: Card[] }) => {
  const [cards, setCards] = useState<Card[]>(items);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [direction, setDirection] = useState("forward");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleNext = () => {
    setDirection("forward");
    setTimeout(() => {
      // Store the selected value of the current question in the array
      const selectedValue = String(value);
      cards.length === selectedValues.length
        ? null
        : setSelectedValues((prevValues) => [...prevValues, selectedValue]);
      setQuestionNumber((prev) => Math.min(prev + 1, cards.length - 1));
    }, 0);
  };

  const handlePrev = () => {
    setDirection("back");
    setTimeout(() => {
      setQuestionNumber((prev) => Math.max(prev - 1, 0));
      selectedValues.pop();
    }, 0);
  };

  console.log(selectedValues);

  const [value, setValue] = useState(5);

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
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="absolute top-0 my-10 h-2 w-[24em] rounded-full bg-[#DBE4FF] md:w-[56em]">
        {/* Progressive Bar */}
        <div
          className={`absolute left-0 z-10 h-2 rounded-full bg-[#1A3199] transition-all`}
          style={{
            width: `${(questionNumber + 1) * 25}%`,
          }}
        />
      </div>

      <button
        onClick={handlePrev}
        className="my-10 flex h-12 w-20 items-center justify-center rounded-xl bg-[#1A3199] text-white"
      >
        <GrLinkPrevious size={24} />
      </button>
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
      </div>
      <div className="mb-4 mt-10 flex h-10 w-10 items-center justify-center rounded-xl bg-[#DBE4FF]">
        <span className="text-2xl text-[#1A3199]">{value}</span>
      </div>
      <div className="flex w-[70vh] flex-col items-center justify-center space-y-10">
        <Slider min={0} max={10} value={value} onChange={setValue} />
      </div>
      <button
        onClick={handleNext}
        className="my-10 h-12 w-[70vh] rounded-xl bg-[#1A3199]"
      >
        <span className="text-white">
          {questionNumber === cards.length - 1 ? (
            <p>Завершить</p>
          ) : (
            <p>Следующий вопрос</p>
          )}
        </span>
      </button>
    </div>
  );
};
