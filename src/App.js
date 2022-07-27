import { Toaster } from 'react-hot-toast';
import { Routes,Route } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import Modal from './components/Modal';
import { useSelector } from 'react-redux';
import Settings from './pages/Settings';


function App() {
  const { open,data } = useSelector(state => state.modal)
  return (
    <>
    {open && <Modal name={open} data={data} />}
   <Toaster position="top-right" />
   <Routes>
     <Route path='/' element={<Home />} />
     <Route path='/register' element={<Register />} />
     <Route path='/login' element={<Login />} />
     <Route path='/settings' element={<Settings/>} />

   </Routes>


    </>
  );
}

export default App;
