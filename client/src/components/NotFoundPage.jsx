import React from 'react';
import { Gamepad2 } from 'lucide-react';
import {Link} from 'react-router-dom';

const SimpleNotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="text-6xl text-indigo-500 flex justify-center">
          <Gamepad2 />
        </div>
        
        {/* Main Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>
          <p className="text-gray-600">
            Oops! The page you're looking for seems to have disappeared into another dimension.
          </p>
        </div>

        {/* Button */}
        <div className="pt-6">
          <Link
            to="/Signup"
            className="inline-flex items-center justify-center px-6 py-3 
                       bg-indigo-600 text-white font-medium rounded-lg
                       hover:bg-indigo-700 transition-colors duration-200"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SimpleNotFoundPage;