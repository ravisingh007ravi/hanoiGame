import React, { useState } from 'react';
import { Gamepad2, Mail, User, Phone, Lock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './Ui/card';
import { Alert, AlertDescription } from './Ui/Alert';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup = ({isUserAuthentication}) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  const submitLogInDataBase = async (e) => {
    e.preventDefault()
    try {
        const url ='http://localhost:5000/createuser';
        
        let logInUser = await axios.post(url, formData)
        
        if (logInUser.status === false) window.alert("invalid data");

        else {
            isUserAuthentication(true);
            navigate('/game');
        }
    }
    catch (err) { 
      // console.log(err.response)
      window.alert(err.response.data.message) }
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-2 border-purple-500/20">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Gamepad2 className="h-12 w-12 text-purple-400 animate-pulse" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Join the Game
          </CardTitle>
          <p className="text-sm text-gray-300">
            Create your gaming account to start your journey
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Username"
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-2 bg-black/20 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-400"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="Email"
                  className="w-full pl-10 pr-4 py-2 bg-black/20 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-400"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  autoComplete="Mobile Number"
                  className="w-full pl-10 pr-4 py-2 bg-black/20 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-400"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 bg-black/20 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-400"
                  required
                   autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button
            onClick={submitLogInDataBase}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center space-x-2 group"
            >
              <span>Start Your Adventure</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {success && (
            <Alert className="mt-4 bg-green-500/20 text-green-300 border-green-500/30">
              <AlertDescription>
                Successfully signed up! Welcome to the game!
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;