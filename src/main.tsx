import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import './index.css';
import App from './App';

const images = Object.values(import.meta.globEager('./gallery/*.tsx')).map(
  module => module.default
);

const NoMatch = () => <div>Not Found</div>;

const Image = () => {
  const { imageName } = useParams();
  const ImageFunction: React.FunctionComponent =
    images.find(image => image.name === imageName) || NoMatch;

  return (
    <div>
      <ImageFunction />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<App images={images} />} />
        <Route path={`:imageName`} element={<Image />} />
        <Route path={'*'} element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
