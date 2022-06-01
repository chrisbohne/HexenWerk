import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import {
  About,
  Admin,
  Blog,
  Discover,
  Home,
  Login,
  NotFound,
  Playground,
  Profile,
  Registration,
  Unauthorized,
} from '../../../pages';
import { PersistLoginWrapper, RequireAuth } from '../';
import Nav from '../../Nav/Nav';
import { NotificationProvider } from '../../../components';

export const Routing = () => {
  return (
    <Router>
      <NotificationProvider />
      <PersistLoginWrapper>
        <Nav />
      </PersistLoginWrapper>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* <Route element={<PersistentLoginOutlet />}> */}
        <Route path="/playground" element={<Playground />} />

        {/* protected routes for logged in users */}
        <Route element={<RequireAuth allowedRoles={['USER']} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        {/* protected routes for admins */}
        <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        {/* </Route> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
