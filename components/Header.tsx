
import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div className="flex-1 flex items-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            className="w-full bg-slate-100 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Search cases, patients, or models..."
          />
          <div className="absolute left-3 top-2 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-6 w-px bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">
            {user.role} VIEW
          </span>
          <span className="text-sm font-medium text-slate-700">Node: Kampala_Central_Private</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
