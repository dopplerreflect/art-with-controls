import Controls, { useControls } from '../Controls';
import { lerp, interpolate } from '../../../drawring-utils/src';
import '../Image.css';

const width = 1080;
const height = 1080;

const divs = interpolate(10).map(i => lerp(-width / 2, width / 2, i));

const controlsInitialState: Controls = [
  { name: 'zoom', value: 0, min: 0, max: width / 2 },
  { name: 'left', value: 0, min: -width, max: width },
  { name: 'top', value: 0, min: -height, max: height },
];

const Three = () => {
  const { controls, handleControlChange, showControls, setShowControls } =
    useControls(controlsInitialState);

  const viewBox = `${-width / 2 + ~~controls.value('zoom')! + ~~controls.value('left')!} ${
    -height / 2 + ~~controls.value('zoom')! + ~~controls.value('top')!
  } ${width - ~~controls.value('zoom')! * 2} ${height - ~~controls.value('zoom')! * 2}`;

  return (
    <div className='Container'>
      {showControls && (
        <Controls controls={controls} handleControlChange={handleControlChange} />
      )}
      <div className='Image' onClick={() => setShowControls(!showControls)}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox={viewBox}>
          <path
            d={`M${-width / 2} ${-width / 2}H${width / 2}V${width / 2}H${-width / 2}Z`}
            fill='darkblue'
          />
          {divs.map(d => (
            <g key={d}>
              <line x1={-width / 2} y1={d} x2={width / 2} y2={d} stroke='white' />
              <line x1={d} y1={-width / 2} x2={d} y2={width / 2} stroke='white' />
              {d > 0 && <circle r={d} stroke='white' fill='none' />}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Three;
