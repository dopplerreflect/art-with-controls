import { ChangeEventHandler, useRef } from 'react';
type ControlsProps = {
  controls: Controls;
  handleControlChange: ChangeEventHandler<HTMLInputElement>;
};

const Controls = ({ controls, handleControlChange }: ControlsProps) => {
  return (
    <div className='Controls'>
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
  );
};

export default Controls;
