import React from 'react';
import './App.css';
type GalleryProps = {
  images: any;
};
const Gallery = () => <div>Gallery</div>;
function App({ images }: GalleryProps) {
  return (
    <ul>
      {images.map((Image: React.FunctionComponent) => {
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
