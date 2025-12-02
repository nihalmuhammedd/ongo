import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard';
import VehicleDetails from './pages/VehicleDetails';
import DriverDashboard from './pages/DriverDashboard';
import Login from './pages/Login';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect based on role if trying to access unauthorized page
    return <Navigate to={user.role === 'admin' ? '/' : '/driver'} replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/vehicles" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/vehicle/:id" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <VehicleDetails />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/driver" element={
            <ProtectedRoute allowedRoles={['driver']}>
              <Layout>
                <DriverDashboard />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="*" element={<div className="text-center py-20 text-gray-500">Page not found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
