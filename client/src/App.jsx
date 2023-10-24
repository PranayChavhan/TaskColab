import { Dashboard, Auth } from "@/layouts";
import { SignIn } from "./pages/auth";
import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { useState } from 'react';
import { DataProvider } from "./context/DataProvider";
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ isAuthenticated }) => {
    if (isAuthenticated) {
      return (
        <Outlet />
      )
    }
    else {
      return <Navigate replace to='/auth/sign-in' />
    }
  }

  return (

    <DataProvider>
      <Routes>
        <Route path="/auth/sign-in" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />

        {/* Protected */}
        <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
        </Route>
      </Routes>
    </DataProvider>
  );
}

export default App;
