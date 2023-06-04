import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  NavLink as Link,
  Route,
  Routes,
} from 'react-router-dom';
const Contact = lazy(() => import(/* webpackChunkName: "contact" */ './components/Contact'));
const Home = lazy(() => import(/* webpackChunkName: "home" */ './components/Home'));
const About = lazy(() => import(/* webpackChunkName: "about" */ './components/About'));

//import Contact from './components/Contact';
//import About from './components/About';
//import Home from './components/Home';
import './styles.scss';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <div className='menu'>
          <Link to='/' className='active'>
            Home
          </Link>
          <Link to='/about' className='active'>
            About
          </Link>
          <Link to='/contact' className='active'>
            Contact
          </Link>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
