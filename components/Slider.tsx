import React, { ChangeEventHandler } from 'react';

interface Props {
  min?: number;
  max?: number;
  value?: number;
  onChange?(value: number): void;
}

const Slider: React.FC<Props> = ({ min = 1, max = 10, value = 1, onChange }) => {
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!onChange) return;
    const { value } = e.target;
    return onChange(+value)
    
  };
  console.log(value)
  const ticks = Array.from({ length: max - min + 1 }, (_, index) => min + index);

  return (
    <div className="relative w-full">
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={handleOnChange}
        className="appearance-none relative w-full bg-[#DBE4FF] h-1 z-10"
      />
      <div className="absolute w-full top-2 flex justify-between items-center ">
        {ticks.map((tick) => (
          <span key={tick} className="w-1 h-[1rem] bg-[#DBE4FF] transform"></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
