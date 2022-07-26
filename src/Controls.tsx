import React, { useState, useReducer } from 'react';
type ControlsProps = {
  controls: Controls;
  handleControlChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Controls = ({ controls, handleControlChange }: ControlsProps) => {
  return (
    <div className='Controls'>
      CONTROLS
      {controls.map(control => (
        <div key={control.name} className='Control'>
          <div className='Name'>{control.name}</div>
          <div className='RangeControl'>
            <input
              type='range'
              name={control.name}
              min={control.min}
              max={control.max}
              onChange={handleControlChange}
              value={controls.value(control.name)}
            />
          </div>
          <div className='NumberControl'>
            <input
              type='number'
              name={control.name}
              onChange={handleControlChange}
              value={controls.value(control.name)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const reducer = (controls: Controls, action: ReducerAction) => {
  const { control, value } = action;
  // done this way to preserve order
  const controlToReplace = controls.find(c => c.name === control)!;
  const indexOfControlToReplace = controls.indexOf(controlToReplace);
  const newControls = [...controls];
  newControls[indexOfControlToReplace] = { ...controlToReplace, value };
  return newControls;
};

if (!Array.prototype.value) {
  Object.defineProperty(Array.prototype, 'value', {
    value: function (name: String) {
      return this.find((c: Control) => c.name === name)!.value;
    },
  });
}

export const useControls = (controlsInitialState: Controls) => {
  const [showControls, setShowControls] = useState(false);

  const [controls, dispatch] = useReducer(reducer, controlsInitialState);
  const handleControlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ control: event.target.name, value: Number(event.target.value) });
  };
  return { controls, handleControlChange, showControls, setShowControls };
};

export default Controls;
