import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import LocationsOverview from './pages/LocationsOverview';
import LocationDetails from './pages/LocationDetails';
import FrontOffice from './pages/FrontOffice';
import Housekeeping from './pages/Housekeeping';
import Marketing from './pages/Marketing';
import Login from './pages/Login';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider, useUser } from './context/UserContext';

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
  </div>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading, checkAuth } = useUser();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const isAuthenticated = user?.isAuthenticated && checkAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  const { user, isLoading, checkAuth } = useUser();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const isAuthenticated = user?.isAuthenticated && checkAuth();

  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/" /> : <Login />
      } />
      
      <Route path="/" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/locations" element={
        <ProtectedRoute>
          <Layout>
            <LocationsOverview />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/location/:id" element={
        <ProtectedRoute>
          <Layout>
            <LocationDetails />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/front-office" element={
        <ProtectedRoute>
          <Layout>
            <FrontOffice />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/housekeeping" element={
        <ProtectedRoute>
          <Layout>
            <Housekeeping />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/marketing" element={
        <ProtectedRoute>
          <Layout>
            <Marketing />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;