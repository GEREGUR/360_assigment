import React, { ChangeEventHandler } from "react";

interface Props {
  min?: number;
  max?: number;
  value?: number;
  onChange?(value: number): void;
}

const Slider: React.FC<Props> = ({
  min = 1,
  max = 10,
  value = 1,
  onChange,
}) => {
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!onChange) return;
    const { value } = e.target;
    return onChange(+value);
  };
  const ticks = Array.from(
    { length: max - min + 1 },
    (_, index) => min + index,
  );

  return (
    <div className="relative w-full">
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={handleOnChange}
        className="relative z-10 h-1 w-full appearance-none bg-[#DBE4FF] accent-[#1A3199]"
      />
      <div className="absolute top-2 flex w-full items-center justify-between ">
        {ticks.map((tick) => (
          <span
            key={tick}
            className="h-[1rem] w-1 transform bg-[#DBE4FF]"
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
