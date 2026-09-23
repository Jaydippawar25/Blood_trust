import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function ProtectedRoute() {
  const { currentUser, loading } = useAuth();
  if (loading) return <div className="p-8 text-center text-slate-500 font-semibold">Verifying session...</div>;
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}

export function DonorRoute() {
  const { currentUser, userRole, loading } = useAuth();
  if (loading) return <div className="p-8 text-center text-slate-500 font-semibold">Verifying donor permissions...</div>;
  if (!currentUser) return <Navigate to="/login" replace />;
  const isAllowed = userRole === 'donor' || userRole === 'admin';
  return isAllowed ? <Outlet /> : <Navigate to="/unauthorized" replace />;
}

export function AdminRoute() {
  const { currentUser, userRole, loading } = useAuth();
  if (loading) return <div className="p-8 text-center text-slate-500 font-semibold">Verifying admin permissions...</div>;
  if (!currentUser) return <Navigate to="/login" replace />;
  const isAllowed = userRole === 'admin';
  return isAllowed ? <Outlet /> : <Navigate to="/unauthorized" replace />;
}
