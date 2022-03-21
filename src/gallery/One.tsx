import { ChangeEvent, useReducer, useRef, useState } from 'react';
import '../Image.css';

type Controls = {
  hue: number;
  radius: number;
};

type ReducerAction = {
  control: string;
  value: number;
};

const controlsInitialState: Controls = {
  hue: 180,
  radius: 30,
};

const reducer = (controls: Controls, action: ReducerAction) => {
  const { control, value } = action;
  switch (control) {
    default:
      return { ...controls, [control]: value };
  }
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
        <input
          name='hue'
          type='range'
          min={0}
          max={359}
          value={controls.hue}
          onChange={handleControlChange}
        />
        <input
          name='radius'
          type='range'
          min={1}
          max={64}
          value={controls.radius}
          onChange={handleControlChange}
        />
      </div>
      <div className='Image' onClick={toggleControls}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'>
          <rect width={128} height={128} fill={`hsl(${controls.hue}, 100%, 50%)`} />
          <circle cx={64} cy={64} r={controls.radius} />
        </svg>
      </div>
    </div>
  );
};

export default One;
