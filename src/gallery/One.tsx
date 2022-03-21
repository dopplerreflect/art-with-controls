import { ChangeEvent, useReducer, useRef, useState } from 'react';
import Controls from '../Controls';
import reducer from '../reducer';
import '../Image.css';

const controlsInitialState: Controls = [
  { name: 'hue', value: 180, min: 0, max: 359 },
  { name: 'radius', value: 45, min: 1, max: 64 },
];

const One = () => {
  const [showControls, setShowControls] = useState(false);

  const [controls, dispatch] = useReducer(reducer, controlsInitialState);

  const handleControlChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ control: event.target.name, value: Number(event.target.value) });
  };

  return (
    <div className='Container'>
      <Controls controls={controls} handleControlChange={handleControlChange} />
      <div className='Image' onClick={() => setShowControls(!showControls)}>
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
