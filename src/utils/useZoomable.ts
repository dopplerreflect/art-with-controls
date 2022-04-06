import { useState } from 'react';

const useZoomable = (width: number, height: number) => {
  const [scrollOffset, setScrollOffset] = useState(0);

  const handleScroll = (event: React.MouseEvent<SVGElement>) => {
    if (!event.altKey) return;
    setScrollOffset(o =>
      o + event.movementY < width / 2 && o + event.movementY > -1 ? o + event.movementY : o
    );
  };

  const viewBox = `-${width / 2 - scrollOffset} -${height / 2 - scrollOffset} ${
    width - scrollOffset * 2
  } ${height - scrollOffset * 2}`;

  return { handleScroll, viewBox };
};

export default useZoomable;
