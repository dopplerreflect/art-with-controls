import '../Image.css';

const width = 1080;
const height = 1080;

const PHI = (Math.sqrt(5) + 1) / 2;

const radii = [...Array(7).keys()].map(k => (width / 2) * (PHI - 1) ** k);

const stroke = `hsl(0, 0%, 50%)`;

const Four = () => {
  return (
    <div className='Container'>
      <div className='Image'>
        <svg
          id='StarLattice2'
          xmlns='http://www.w3.org/2000/svg'
          viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
        >
          {radii.map((r, ri) => (
            <g key={r}>
              <circle key={r} r={r} stroke={stroke} fill='none' />
              <circle r={height / 2 - r} stroke={stroke} fill='none' />
            </g>
          ))}
          {[...Array(5).keys()].map((a, ai) => (
            <g key={ai} transform={`rotate(${72 * a})`}>
              {radii.map((r, ri) => (
                <g key={ai}>
                  <path
                    d={`M${-width},${-height / 2 + r}L${width},${-height / 2 + r}`}
                    stroke={stroke}
                  />
                  <path d={`M${-width},${-r}L${width},${-r}`} stroke={stroke} />
                  <path d={`M${-width},${r}L${width},${r}`} stroke={stroke} />
                  <path
                    d={`M${-width},${height / 2 - r}L${width},${height / 2 - r}`}
                    stroke={stroke}
                  />
                </g>
              ))}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Four;
