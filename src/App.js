import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import AddProduct from './pages/AddProduct';
import Home from './pages/Home';
import Login from './pages/Login';
import { UserContext, UserProvider } from './providers/UserProvider';
import { useContext, useEffect, useState } from 'react';
import Show from './pages/Show';
import Register from './pages/Register';

function App() {
  const User = useContext(UserContext);

  const PrivateRoute = () => (User != null) ? <Outlet /> : <Navigate to='/login' />
  console.log(User);

  return (

    <div className='h-screen '>


      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/add' element={<PrivateRoute />}>
          <Route path="/add" element={<AddProduct />} />
        </Route>
        <Route path='/update' element={<PrivateRoute />}>
          <Route path="/update/:id" element={<AddProduct />} />

        </Route>
        <Route path='/show/:id' element={<Show />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>

    </div>

  );
}

export default App;
