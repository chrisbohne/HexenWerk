import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './containers/Nav/Nav';
import Blog from './pages/Blog/Blog';
import Discover from './pages/Discover/Discover';
import Home from './pages/Home/Home';
import Playground from './pages/Playground/Playground';
import About from './pages/About/About';
import './styles.scss';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
