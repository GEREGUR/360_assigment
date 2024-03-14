"use client";

import Slider from "@/components/Slider";
// import SliderTest  from "@/components/SlidertTest";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState(5);
  return (
    <div className="flex h-96 items-center">
      <div className="mx-auto w-4/5">
        <Slider min={0} max={10} value={value} onChange={setValue} />
      </div>
    </div>
  );
}
