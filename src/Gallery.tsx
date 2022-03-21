import React from 'react';
import './Gallery.css';
import { Link, useNavigate } from 'react-router-dom';
type GalleryProps = {
  images: React.FunctionComponent[];
};
function Gallery({ images }: GalleryProps) {
  const navigate = useNavigate();
  return (
    <ul className='Gallery'>
      {images.map(Image => {
        return (
          <li className='Image' key={Image.name} onClick={() => navigate(Image.name)}>
            <Link to={Image.name}>{Image.name}</Link>
            <Image />
          </li>
        );
      })}
    </ul>
  );
}

export default Gallery;
