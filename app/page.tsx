'use client'


import Slider from "@/components/Slider";
// import SliderTest  from "@/components/SlidertTest";
import { useState } from "react";

export default function Home() {
  const [ value, setValue ] = useState(5)
  return (
    <div className="h-96 flex items-center">
      <div className="w-4/5 mx-auto">
        <Slider min={0} max={10} value={value} onChange={setValue}/>
      </div>
      <input type="range" />
       {/* <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className={"w-[60%]"}
    /> */}
      {/* <input 
      type="range"
      min={1}
      max={10}
      step={1}
      className="w-[50%] appearance-none"
       /> */}
      {/* <SliderTest min={0} max={10} value={value} onChange={setValue} buffered={3}/> */}
    </div>
  );
}
