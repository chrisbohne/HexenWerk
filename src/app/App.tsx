import { Route, Routes, BrowserRouter as Router, Link } from 'react-router-dom';
import Nav from './Nav/Nav';
import Blog from '../pages/Blog/Blog';
import Discover from '../pages/Discover/Discover';
import Home from '../pages/Home/Home';
import Playground from '../pages/Playground/Playground';
import About from '../pages/About/About';
import '../style/styles.scss';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import Admin from '../pages/Admin/Admin';
import RequireAuth from '../components/RequireAuth/RequireAuth';
import Unauthorized from '../pages/Unauthorized/Unauthorized';
import Profile from '../pages/Profile/Profile';

const App = () => {
  return (
    <>
      <Router>
        <Nav />
        <button>
          <Link to="/admin">Admin</Link>
        </button>
        <button>
          <Link to="/profile">Profile</Link>
        </button>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* protected routes for logged in users */}
          <Route element={<RequireAuth allowedRoles={['USER']} />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          {/* protected routes for admins */}
          <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
