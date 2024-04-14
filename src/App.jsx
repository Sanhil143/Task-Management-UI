import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/common/Dashboard';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
