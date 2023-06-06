import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter,
  NavLink as Link,
  Route,
  Routes,
} from 'react-router-dom';
import styles from './app.module.scss';

// import Contact from './components/Contact';
// import About from './components/About';
// import Home from './components/Home';

const Contact = lazy(() => import(/* webpackChunkName: "contact" */ './components/contact/Contact'));
const Home = lazy(() => import(/* webpackChunkName: "home" */ './components/home/Home'));
const About = lazy(() => import(/* webpackChunkName: "about" */ './components/about/About'));

const App = () => (
  <BrowserRouter>
    <div>
      <div className={styles.menu}>
        <Link to="/" className={styles.active}>
          Home
        </Link>
        <Link to="/about" className={styles.active}>
          About
        </Link>
        <Link to="/contact" className={styles.active}>
          Contact
        </Link>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </div>
  </BrowserRouter>
);

export default App;
