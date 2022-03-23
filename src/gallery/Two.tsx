import Controls, { useControls } from '../Controls';
import '../Image.css';

const controlsInitialState: Controls = [
  { name: 'hue', min: 0, max: 359, value: 45 },
  { name: 'width', min: 200, max: 1920, value: 512 },
  { name: 'height', min: 200, max: 1080, value: 256 },
];

const Two = () => {
  const { controls, handleControlChange, showControls, setShowControls } =
    useControls(controlsInitialState);
  return (
    <div className='Container'>
      {showControls && (
        <Controls controls={controls} handleControlChange={handleControlChange} />
      )}
      <div className='Image' onClick={() => setShowControls(!showControls)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox={`0 0 ${controls.value('width')} ${controls.value('height')}`}
        >
          <rect
            width={controls.value('width')}
            height={controls.value('height')}
            fill={`hsl(${controls.value('hue')}, 100%, 50%)`}
          />
        </svg>
      </div>
    </div>
  );
};

export default Two;
