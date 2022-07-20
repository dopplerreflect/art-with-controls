import { Point } from '../../../drawring-utils/src';
import useSaveSVG from '@dopplerreflect/use-save-svg';
import '../Image.css';
import { radialPoint, radialPointString } from '@dopplerreflect/drawring-utils';

const width = 3600;
const height = 3600;
const PHI = (Math.sqrt(5) + 1) / 2;
const radius = width / 2 - (width / 2) * (PHI - 1) ** 5;
const radii = [...Array(6).keys()].map(k => radius * (PHI - 1) ** k);

const angles = [...Array(20).keys()].map(k => (Math.PI / 10) * k - Math.PI / 2);

const ys = new Set();

const ys2 = [
  -1638, -1205, -1103, -938, -773, -671, -506, -341, -239, -74, 193, 358, 460, 626, 791, 893,
  1058, 1160, 1325,
];

const pentagram = (radius: number, center?: Point, inverted?: boolean) => {
  const angleIndices = inverted ? [2, 10, 18, 6, 14] : [0, 8, 16, 4, 12];

  // angleIndices.map(ai => {
  //   console.log(ai);
  //   if (radius === radii[4])
  //     points.add(JSON.stringify(radialPoint(angles[ai], radius, { center })));
  // });

  angleIndices.map(ai => {
    const y = Math.round(radialPoint(angles[ai], radius, { center }).y);
    if (!ys.has(y)) ys.add(y);
  });

  const pathd = `M${angleIndices
    .map(ai => radialPointString(angles[ai], radius, { center }))
    .join('L')}Z`;
  return <path d={pathd} stroke={stroke} strokeWidth={2} fill='none' />;
};

const stroke = `hsl(240, 0%, 50%)`;

const controlsInitialState: Controls = [
  { name: 'zoom', value: 0, min: 0, max: width / 2 },
  { name: 'left', value: 0, min: -width, max: width },
  { name: 'top', value: 0, min: -height, max: height },
];

const Three = () => {
  const svgRef = useSaveSVG();
  return (
    <div className='Container'>
      <div className='Image'>
        <svg
          id='StarLattice'
          ref={svgRef}
          xmlns='http://www.w3.org/2000/svg'
          viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
        >
          {/* <path
            d={`M${-width / 2} ${-width / 2}H${width / 2}V${width / 2}H${-width / 2}Z`}
            fill={`hsl(240, 50%, 90%)`}
          /> */}
          <g id='concentricCircles'>
            {radii.map((r, ri) => (
              <circle key={ri} id={`circle-${ri}`} r={r} stroke={stroke} fill='none' />
            ))}
          </g>
          <g id='radials'>
            {angles.map((a, ai) => (
              <g id={`radial-${ai}`} key={a}>
                <path d={`M0,0L${radialPointString(a, radius)}`} stroke={stroke} />
                <text x={radialPoint(a, radius + 10).x} y={radialPoint(a, radius + 10).y}>
                  {ai}
                </text>
              </g>
            ))}
          </g>
          <g id='outerStar'>{pentagram(radii[0])}</g>
          {pentagram(radii[2], { x: 0, y: 0 }, true)}
          {pentagram(radii[4], { x: 0, y: 0 })}

          {pentagram(radii[3], radialPoint(angles[0], radii[2]), true)}
          {pentagram(radii[3], radialPoint(angles[4], radii[2]), true)}
          {pentagram(radii[3], radialPoint(angles[8], radii[2]), true)}
          {pentagram(radii[3], radialPoint(angles[12], radii[2]), true)}
          {pentagram(radii[3], radialPoint(angles[16], radii[2]), true)}
          {pentagram(radii[4], radialPoint(angles[0], radii[1]), true)}
          {pentagram(radii[4], radialPoint(angles[4], radii[1]), true)}
          {pentagram(radii[4], radialPoint(angles[8], radii[1]), true)}
          {pentagram(radii[4], radialPoint(angles[12], radii[1]), true)}
          {pentagram(radii[4], radialPoint(angles[16], radii[1]), true)}

          {pentagram(radii[5], radialPoint(angles[0], radii[2]))}
          {pentagram(radii[5], radialPoint(angles[4], radii[2]))}
          {pentagram(radii[5], radialPoint(angles[8], radii[2]))}
          {pentagram(radii[5], radialPoint(angles[12], radii[2]))}
          {pentagram(radii[5], radialPoint(angles[16], radii[2]))}

          {pentagram(radii[4], radialPoint(angles[2], radii[3]), true)}
          {pentagram(radii[4], radialPoint(angles[6], radii[3]), true)}
          {pentagram(radii[4], radialPoint(angles[10], radii[3]), true)}
          {pentagram(radii[4], radialPoint(angles[14], radii[3]), true)}
          {pentagram(radii[4], radialPoint(angles[18], radii[3]), true)}

          {[...Array(5).keys()].map(k => {
            const a = 72 * k;
            return [...ys2].map((y, i) => (
              <g key={i}>
                <path
                  key={i}
                  d={`M${-width},${y}L${width},${y}`}
                  stroke={stroke}
                  transform={`rotate(${a})`}
                />
                {/* <text dominantBaseline='middle' fontSize={50} y={y} fill='black'>
                  {y}
                </text> */}
              </g>
            ));
          })}
          {console.log([...ys])}
        </svg>
      </div>
    </div>
  );
};

export default Three;
