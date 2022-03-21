import React from 'react';
import './App.css';
type GalleryProps = {
  images: React.FunctionComponent[];
};
const Gallery = () => <div>Gallery</div>;
function App({ images }: GalleryProps) {
  return (
    <ul>
      {images.map(Image => {
        return (
          <li key={Image.name}>
            {Image.name}
            <Image />
          </li>
        );
      })}
    </ul>
  );
}

export default App;
