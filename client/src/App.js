import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './componentes/Home'
import Login from './componentes/Login'
import {AuthProvider} from './context/authContext'

import Register from './componentes/Register';

import ServiceDetail from './componentes/ServiceDetail';
import Servicios from './componentes/Servicios';

import Landing from './componentes/landing/Landing.jsx';
import Navbar from './componentes/PrivateRoute/Navbar';

import RequestService from './componentes/RequestService';



//comentario borrar
function App() {
  return (
    <AuthProvider>
      {/* <Route  path='/' element={<Navbar />}/> */}
      <Routes>
        <Route exact path='/' element={[<Navbar />, <Landing />]} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/home' element={<Home />}/>
        <Route path='/register' element={<Register/>}/>
        {/* <Route exact path='/home/services/:id'  element={<ServiceDetail />}/> */}
        <Route exact path='/home/createService' element={<Servicios/>}/>
        <Route exact path='/home/services/:id' element={<RequestService />}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
