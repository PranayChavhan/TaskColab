import AboutPage from './pages/AboutPage';
import Homepage from './pages/Homepage';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom'
import Login from './pages/Login';
import "./App.css"
import { DataProvider } from './context/DataProvider'
import { useState } from 'react';

const PrivateRoute = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return (
        <Outlet />
    )
  }
  else {
    return <Navigate replace to='/login' />
  }
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />

          <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path='/' element={<Homepage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<AboutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App