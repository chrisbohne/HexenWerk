import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Nav from './Nav/Nav';
import Blog from '../pages/Blog/Blog';
import Discover from '../pages/Discover/Discover';
import Home from '../pages/Home/Home';
import Playground from '../pages/Playground/Playground';
import About from '../pages/About/About';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import Admin from '../pages/Admin/Admin';
import RequireAuth from '../components/RequireAuth/RequireAuth';
import PersistentLoginOutlet from '../components/PersistLogin/PersistLoginOutlet';
import Unauthorized from '../pages/Unauthorized/Unauthorized';
import Profile from '../pages/Profile/Profile';
import NotFound from '../pages/NotFound/NotFound';
import '../style/styles.scss';
import PersistLoginWrapper from '../components/PersistLogin/PersistLoginWrapper';

const App = () => {
  return (
    <>
      <Router>
        <PersistLoginWrapper>
          <Nav />
        </PersistLoginWrapper>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route element={<PersistentLoginOutlet />}>
            {/* protected routes for logged in users */}
            <Route element={<RequireAuth allowedRoles={['USER']} />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            {/* protected routes for admins */}
            <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
