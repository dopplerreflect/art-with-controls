import { ChangeEvent, MutableRefObject, useRef, useState } from 'react';
import '../Image.css';
const One = () => {
  const controlsRef = useRef<HTMLDivElement>(null);
  const toggleControls = () => {
    const controls = controlsRef.current!;
    controls.classList.toggle('hidden');
  };

  const [hue, setHue] = useState(0);
  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHue(Number(event.target.value));
  };

  return (
    <div className='Container'>
      <div ref={controlsRef} className='Controls hidden'>
        CONTROLS
        <input type='range' min={0} max={359} value={hue} onChange={handleRangeChange} />
      </div>
      <div className='Image' onClick={toggleControls}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'>
          <rect width={128} height={128} fill={`hsl(${hue}, 100%, 50%)`} />
        </svg>
      </div>
    </div>
  );
};

export default One;
