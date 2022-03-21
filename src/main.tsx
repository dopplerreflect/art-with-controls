import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import './index.css';
import App from './App';

const GalleryContent = import.meta.globEager('./gallery/*.tsx');
const imageKeys = Object.keys(GalleryContent).map(s => s.match(/([-\w]+)\.tsx/)![1]);
const images = Object.values(GalleryContent).map(v => v.default);

const NoMatch = () => <div>Not Found</div>;

const Image = () => {
  const { image } = useParams();
  if (!image || imageKeys.indexOf(image) < 0) return <NoMatch />;

  const Component: React.FunctionComponent = images[imageKeys.indexOf(image)];
  return (
    <div>
      <Component />
    </div>
  );
};

console.log(imageKeys);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<App />} />
        <Route path={`:image`} element={<Image />} />
        <Route path={'*'} element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
