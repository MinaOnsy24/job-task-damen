import './App.scss';
import Router from '../utils/router';
import { BrowserRouter } from 'react-router-dom';
import Navbar  from "../components/NavBar";
function App() {
  return (
    <>
    <BrowserRouter>
        <Navbar />
        <div className=''>
          <Router />
        </div>

    </BrowserRouter>
    </>
  );
}

export default App;
