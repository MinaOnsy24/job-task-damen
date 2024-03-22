import './App.scss';
// import Router from '../utils/router';
import { BrowserRouter } from 'react-router-dom';
import Navbar from "../components/NavBar";
import { lazy, Suspense } from 'react';
import Loading from '../components/Loading';
function App() {
  const Router = lazy(() => import('../utils/router'));

  return (
    <>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Navbar />
          <div className=''>
            <Router />
          </div>
        </BrowserRouter>
      </Suspense>

    </>
  );
}

export default App;
