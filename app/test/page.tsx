"use client";

import { CardStack } from "@/components/CardStack";
import Slider from "@/components/Slider";
import { useState } from "react";

const CARDS = [
  {
    id: 0,
    content:
      "These cards are amazing, I want to use them in my project. Framer motion is a godsend ngl tbh fam 🙏",
  },
  {
    id: 1,
    content:
      "I dont like this Twitter thing, deleting it right away because yolo. Instead, I would like to call it X.com so that it can easily be confused with adult sites.",
  },
  {
    id: 2,
    content:
      "The first rule of Fight Club is that you do not talk about fight club. The second rule of Fight club is that you DO NOT TALK about fight club.",
  },
  {
    id: 3,
    content: "test card",
  },
];

const TestPage = () => {
  const [value, setValue] = useState(5);
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex h-[50vh] items-center justify-center">
        <CardStack items={CARDS} />
      </div>
      <div className="mt-10 flex w-[70vh] flex-col items-center justify-center space-y-10">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DBE4FF]/60">
          <div className="text-3xl text-[#1A3199]/80">{value}</div>
        </span>
        <Slider min={0} max={10} value={value} onChange={setValue} />
      </div>

      {/* <div className="h-full border-t border-2">тут можно тестить свои компоненты, создавая для каждого компонента такой контейнер</div> */}
    </div>
  );
};

export default TestPage;
