import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Unauthorized() {
  const { userRole } = useAuth();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-navy-900 p-8 rounded-3xl border border-gray-100 dark:border-navy-800 shadow-xl">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
          Access Restricted (RBAC Protection)
        </h1>

        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          Your active role (<strong className="capitalize text-blood-600">{userRole.replace('_', ' ')}</strong>) does not have sufficient permissions to view this portal section.
        </p>

        <div className="pt-2 flex flex-col gap-2">
          <Link
            to="/"
            className="py-3 px-6 bg-blood-600 text-white font-bold rounded-xl shadow text-sm flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home Page</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
