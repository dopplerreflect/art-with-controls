import Controls, { useControls } from '../Controls';
import {
  radialPointString,
  Point,
  radialPoint,
  ator,
  rtoa,
} from '@dopplerreflect/drawring-utils';
import useSaveSVG from '@dopplerreflect/use-save-svg';
import '../Image.css';
import { hsluvToHex } from 'hsluv';

const PHI = (Math.sqrt(5) + 1) / 2;
const width = 1080;
const height = 1080;

const angles = [...Array(10).keys()].map(k => (k * Math.PI) / 5);
const angles20 = [...Array(20).keys()].map(k => (k * Math.PI) / 10);
const chord = (width / 2) * Math.sin(ator(144));

const radii = [
  chord * (PHI - 1),
  width / 4 - (width / 4) * (PHI - 1) ** 4,
  chord,
  width / 4 + (width / 4) * (PHI - 1) ** 2,
  chord * PHI,
];

const starPath = (radius: number, center?: Point): string =>
  [
    `M${radialPointString(angles[0], radius, { center })}`,
    [...angles.slice(1, angles.length)]
      .map(
        (a, i) =>
          `L${radialPointString(a, i % 2 === 0 ? radius * (PHI - 1) ** 2 : radius, {
            center,
          })}`
      )
      .join(' '),
    'Z',
  ].join(' ');

const controlsInitialState: Controls = [];

const Two = () => {
  const { controls, handleControlChange, showControls, setShowControls } =
    useControls(controlsInitialState);

  const svgRef = useSaveSVG();

  return (
    <div className='Container'>
      {showControls && (
        <Controls controls={controls} handleControlChange={handleControlChange} />
      )}
      <div className='Image' onClick={() => setShowControls(!showControls)}>
        <svg
          ref={svgRef}
          id='RadialStarMosaic'
          xmlns='http://www.w3.org/2000/svg'
          viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
        >
          <defs>
            <path
              id='tile-0'
              d={`M0 0 L${radialPointString(angles20[19], radii[0])} ${radialPointString(
                angles[0],
                radii[1]
              )} ${radialPointString(angles20[1], radii[0])}Z`}
            />
            <path
              id='tile-1'
              d={`M${radialPointString(angles20[1], radii[0])}L${radialPointString(
                angles20[0],
                radii[1]
              )} ${radialPointString(angles20[1], radii[2])} ${radialPointString(
                angles20[2],
                radii[1]
              )}Z`}
            />
            <path
              id='tile-2'
              d={`M${radialPointString(angles20[0], radii[1])}L${radialPointString(
                angles20[19],
                radii[2]
              )} ${radialPointString(angles20[1], radii[2])}Z`}
            />
            <path
              id='tile-3'
              d={`M${radialPointString(angles20[19], radii[2])}L${radialPointString(
                angles20[19],
                radii[4]
              )} ${radialPointString(angles20[0], radii[3])}Z`}
            />
            <path
              id='tile-4'
              d={`M${radialPointString(angles20[19], radii[2])}L${radialPointString(
                angles20[0],
                radii[3]
              )} ${radialPointString(angles20[1], radii[2])}Z`}
            />
            <path
              id='tile-5'
              d={`M${radialPointString(angles20[0], radii[3])}L${radialPointString(
                angles20[1],
                radii[4]
              )} ${radialPointString(angles20[1], radii[2])}Z`}
            />
          </defs>

          <rect
            x={-width / 2}
            y={-height / 2}
            width={width}
            height={height}
            fill={hsluvToHex([250, 100, 90])}
          />

          {angles.map((a, i) => (
            <g key={i}>
              <use
                href='#tile-0'
                transform={`rotate(${rtoa(a)})`}
                fill={hsluvToHex([250, 100, i % 2 === 0 ? 64 : 61])}
              />
              <use
                href='#tile-1'
                transform={`rotate(${rtoa(a)})`}
                fill={hsluvToHex([250, 100, i % 2 === 0 ? 70 : 67])}
              />
              <use
                href='#tile-2'
                transform={`rotate(${rtoa(a)})`}
                fill={hsluvToHex([250, 100, i % 2 === 0 ? 76 : 73])}
              />
              <use
                href='#tile-3'
                transform={`rotate(${rtoa(a)})`}
                fill={hsluvToHex([250, 100, i % 2 === 0 ? 85 : 88])}
              />
              <use
                href='#tile-4'
                transform={`rotate(${rtoa(a)})`}
                fill={hsluvToHex([250, 100, i % 2 === 0 ? 79 : 82])}
              />
              <use
                href='#tile-5'
                transform={`rotate(${rtoa(a)})`}
                fill={hsluvToHex([250, 100, i % 2 === 0 ? 85 : 88])}
              />
            </g>
          ))}

          {angles.map(a => (
            <path
              key={a}
              d={starPath(width / 4, radialPoint(a, width / 4))}
              stroke={hsluvToHex([250, 50, 80])}
              fill='none'
              transform={`rotate(${rtoa(a) - 180}, ${radialPoint(a, width / 4).x}, ${
                radialPoint(a, width / 4).y
              })`}
            />
          ))}

          {/* {angles.map(a => (
            <circle
              key={a}
              cx={radialPoint(a, width / 4).x}
              cy={radialPoint(a, width / 4).y}
              r={width / 4}
              stroke={hsluvToHex([250, 50, 80])}
              fill='none'
            />
          ))}
          {angles.map(a => (
            <circle
              key={a}
              cx={radialPoint(a, width / 4).x}
              cy={radialPoint(a, width / 4).y}
              r={(width / 4) * (PHI - 1) ** 2}
              stroke={hsluvToHex([250, 50, 80])}
              fill='none'
            />
          ))}
          {angles.map(a => (
            <circle
              key={a}
              cx={radialPoint(a, width / 4).x}
              cy={radialPoint(a, width / 4).y}
              r={(width / 4) * (PHI - 1) ** 4}
              stroke={hsluvToHex([250, 50, 80])}
              fill='none'
            />
          ))}
          {radii.map(r => (
            <circle key={r} r={r} stroke={hsluvToHex([250, 50, 80])} fill='none' />
          ))}
          {angles20.map((a, i) => (
            <line
              key={a}
              x2={radialPoint(a, width / 2).x}
              y2={radialPoint(a, width / 2).y}
              stroke={hsluvToHex([250, 50, 80])}
            />
          ))} */}
        </svg>
      </div>
    </div>
  );
};

export default Two;
