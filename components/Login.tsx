
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.DOCTOR);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth logic
    onLogin({
      id: Math.random().toString(36).substr(2, 9),
      username: username || 'demo_user',
      role: selectedRole,
      fullName: username ? `${username}` : `Clinical User`
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-8">
        <div className="text-center">
          <div className="bg-blue-600 w-16 h-16 rounded-xl mx-auto flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">NCD EarlyDetect</h2>
          <p className="text-slate-500 mt-2">Ministry of Health - Uganda Deployment</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Username / ID</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Enter your ID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Access Token</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Login Role</label>
            <select
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
            >
              <option value={UserRole.DOCTOR}>Doctor (Clinical)</option>
              <option value={UserRole.RADIOLOGIST}>Radiologist (Clinical)</option>
              <option value={UserRole.NURSE}>Nurse (Clinical)</option>
              <option value={UserRole.DEVELOPER}>Developer (Technical)</option>
              <option value={UserRole.ADMIN}>Admin (Technical)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Authenticate
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          SECURE CLINICAL ENVIRONMENT v2.4.0-LOCAL
        </div>
      </div>
    </div>
  );
};

export default Login;
