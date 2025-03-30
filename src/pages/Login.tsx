
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import GoogleSignIn from '@/components/auth/GoogleSignIn';
import { Recycle } from 'lucide-react';

const Login = () => {
  const { user, loading } = useAuth();

  // Redirect if already logged in
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 earth-pattern">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary flex items-center justify-center">
            <Recycle className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Trash 2 Tech</h1>
          <p className="mt-2 text-gray-600">
            Turn waste into wisdom with AI-powered recycling guidance
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="bg-t2t-green-100 p-4 rounded-lg">
            <p className="text-sm text-t2t-green-700">
              Help make a difference to our planet by making better decisions about waste.
            </p>
          </div>

          <GoogleSignIn />
        </div>
      </div>
    </div>
  );
};

export default Login;
