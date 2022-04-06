import Controls, { useControls } from '../Controls';
import { Point, radialPoint, radialPointString } from '@dopplerreflect/drawring-utils';
import useSaveSvg from '@dopplerreflect/use-save-svg';
import '../Image.css';

const PHI = (Math.sqrt(5) + 1) / 2;
const width = 1920;
const height = 1920;

const radii = [...Array(25).keys()].map(k => (width / 2) * (PHI - 1) ** k);
const angles = [...Array(10).keys()].map(k => 36 * k - 90);
const hues = [0, 30, 60, 120, 210, 300];

const starPath = (radius: number, center?: Point): string =>
  [
    `M${radialPointString(angles[0], radius, { center, degrees: true })}`,
    [...angles.slice(1, angles.length)]
      .map(
        (a, i) =>
          `L${radialPointString(a, i % 2 === 0 ? radius * (PHI - 1) ** 2 : radius, {
            center,
            degrees: true,
          })}`
      )
      .join(' '),
    'Z',
  ].join(' ');

const controlsInitialState: Controls = [
  { name: 'dark', value: 0, min: 0, max: 1 },
  { name: 'zoom', value: 0, min: 0, max: width / 2 - 2 },
  { name: 'left', value: 0, min: -width, max: width },
  { name: 'top', value: 0, min: -height, max: height },
];

const One = () => {
  const svgRef = useSaveSvg();

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
        <svg id='StarThing' ref={svgRef} xmlns='http://www.w3.org/2000/svg' viewBox={viewBox}>
          <rect
            x={-width / 2}
            y={-height / 2}
            width={width}
            height={height}
            fill={`hsl(240, 100%, ${controls.value('dark') === 0 ? '5%' : '95%'})`}
          />
          {radii.map(r => (
            <circle
              key={r}
              r={r}
              stroke={`hsl(240, 100%, ${controls.value('dark') === 0 ? '95%' : '5%'})`}
              fill='none'
              strokeWidth={(r * (PHI - 1) ** 8) / 2}
            />
          ))}
          {radii.map(
            (r, ri) =>
              radii[ri + 1] && (
                <g key={r}>
                  {angles.map(
                    (a, i) =>
                      i % 2 === 0 && (
                        <g key={i}>
                          <circle
                            key={i}
                            cx={radialPoint(a, r, { degrees: true }).x}
                            cy={radialPoint(a, r, { degrees: true }).y}
                            r={radii[ri + 1]}
                            stroke={`hsl(240, 100%, ${
                              controls.value('dark') === 0 ? '95%' : '5%'
                            })`}
                            strokeWidth={(r * (PHI - 1) ** 8) / 2}
                            fill='none'
                          />

                          <path
                            d={starPath(
                              radii[ri + 1],
                              radialPoint(a, radii[ri], { degrees: true })
                            )}
                            stroke={`hsl(${hues[ri % hues.length]}, 100%, 50%)`}
                            strokeWidth={r * (PHI - 1) ** 8}
                            strokeLinejoin='bevel'
                            fill='none'
                            transform={`rotate(36, ${
                              radialPoint(a, radii[ri], { degrees: true }).x
                            }, ${radialPoint(a, radii[ri], { degrees: true }).y})`}
                          />

                          <path
                            d={starPath(
                              radii[ri + 1],
                              radialPoint(a, radii[ri], { degrees: true })
                            )}
                            stroke={`hsl(${hues[ri % hues.length]}, 100%, 90%)`}
                            strokeWidth={r * (PHI - 1) ** 9}
                            strokeLinejoin='bevel'
                            fill='none'
                            transform={`rotate(36, ${
                              radialPoint(a, radii[ri], { degrees: true }).x
                            }, ${radialPoint(a, radii[ri], { degrees: true }).y})`}
                          />

                          <path
                            d={starPath(
                              radii[ri + 1],
                              radialPoint(a, radii[ri], { degrees: true })
                            )}
                            stroke={`hsl(${hues[ri % hues.length]}, 100%, 50%)`}
                            strokeWidth={r * (PHI - 1) ** 8}
                            strokeLinejoin='bevel'
                            fill='none'
                          />
                          <path
                            d={starPath(
                              radii[ri + 1],
                              radialPoint(a, radii[ri], { degrees: true })
                            )}
                            stroke={`hsl(${hues[ri % hues.length]}, 100%, 90%)`}
                            strokeWidth={r * (PHI - 1) ** 9}
                            strokeLinejoin='bevel'
                            fill='none'
                          />
                        </g>
                      )
                  )}
                </g>
              )
          )}
        </svg>
      </div>
    </div>
  );
};

export default One;
