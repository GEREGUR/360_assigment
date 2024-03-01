import React, { ChangeEventHandler } from 'react'



interface Props {
  min?: number
  max?: number
  value?: number
  buffered?: number
  onChange?(value:number): void
}

const SliderTest: React.FC<Props> = ({min, max, value, buffered, onChange}) => {

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!onChange) return
    const { value } = e.target
    onChange(+value)
  }
  return (
    <div className='relative flex items-center'>
      <input type="range" min={min} max={max} value={value} onChange={handleOnChange}className='appearance-none h-3 bg-transparent z-10' />
      <div className={`absolute h-full bg-slate-400 rounded-sm z-[2]`} style={{width: buffered + '%'}}></div>
      <div className={`absolute h-full bg-red-600 rounded-sm z-20`} style={{width: value + '%'}}></div>
    </div>
  )
}

export default SliderTest
