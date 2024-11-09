import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const hardcodedUsername = 'Thien-Nguyen@elysium.com';
  const hardcodedPassword = 'pmelysium';

  const handleLogin = () => {
    if (username === hardcodedUsername && password === hardcodedPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-blue-700">
      <div className="flex bg-white rounded-xl shadow-2xl overflow-hidden" style={{ width: '900px', height: '600px' }}>
        {/* Left side - Login form */}
        <div className="w-1/2 p-12 flex flex-col">
          <div className="mb-8">
            <img src={"/Logo.png"} alt="Logo" className="h-12" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
          <p className="text-gray-500 mb-8">Enter your credentials to login</p>
          
          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          <div className="space-y-6 flex-grow">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Forgot password?</a>
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full p-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:from-green-500 hover:to-blue-600 transition-colors"
            >
              Sign in
            </button>
          </div>
        </div>
        
        {/* Right side - Image */}
        <div className="w-1/2 relative">
          <img 
            src="/Login-bg.jpg" 
            alt="Decorative" 
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;