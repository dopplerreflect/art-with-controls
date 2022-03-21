import { ChangeEvent, useReducer, useRef, useState } from 'react';
import '../Image.css';

type Control = {
  name: string;
  value: number;
  min: number;
  max: number;
};

type Controls = Control[];

type ReducerAction = {
  control: string;
  value: number;
};

const controlsInitialState: Controls = [
  { name: 'hue', value: 180, min: 0, max: 359 },
  { name: 'radius', value: 45, min: 1, max: 64 },
];

const reducer = (controls: Controls, action: ReducerAction) => {
  const { control, value } = action;
  const newControls: Controls = [
    ...controls.filter(c => c.name !== control),
    { ...controls.find(c => c.name === control)!, value },
  ].sort((a, b) => (a.name > b.name ? 1 : -1));
  return newControls;
};

const One = () => {
  const controlsRef = useRef<HTMLDivElement>(null);
  const toggleControls = () => {
    const controls = controlsRef.current!;
    controls.classList.toggle('hidden');
  };

  const [controls, dispatch] = useReducer(reducer, controlsInitialState);

  const handleControlChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ control: event.target.name, value: Number(event.target.value) });
  };

  return (
    <div className='Container'>
      <div ref={controlsRef} className='Controls hidden'>
        CONTROLS
        {controls.map(control => (
          <input
            key={control.name}
            type='range'
            name={control.name}
            min={control.min}
            max={control.max}
            onChange={handleControlChange}
            value={controls.find((c: Control) => c.name === control.name)!.value}
          />
        ))}
      </div>
      <div className='Image' onClick={toggleControls}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'>
          <rect
            width={128}
            height={128}
            fill={`hsl(${controls.find(c => c.name === 'hue')!.value}, 100%, 50%)`}
          />
          <circle cx={64} cy={64} r={controls.find(c => c.name === 'radius')!.value} />
        </svg>
      </div>
    </div>
  );
};

export default One;
