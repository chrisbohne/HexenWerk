import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Nav from './Nav/Nav';
import Blog from '../pages/Blog/Blog';
import Discover from '../pages/Discover/Discover';
import Home from '../pages/Home/Home';
import Playground from '../pages/Playground/Playground';
import About from '../pages/About/About';
import '../style/styles.scss';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
      </Routes>
    </Router>
  );
};

export default App;
