import React from 'react';
import {
  LuLayoutDashboard,
  LuFolder,
  LuCpu,
  LuTarget,
  LuSettings,
  LuBell,
  LuChevronDown
} from "react-icons/lu";

import { FiBarChart2 } from "react-icons/fi"; 

export default function Header({ onMenuClick }) {
  return (
    <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 text-sm">
      
      {/* left content */}
      <nav className="flex items-center gap-6 text-slate-400">
        {/* active menu Dashboard */}
        <a href="#" className="flex items-center gap-2 text-teal-400 border-b-2 border-teal-400 h-16 px-1 font-medium">
          <LuLayoutDashboard size={18} />
          Dashboard
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); onMenuClick('Accounts'); }} className="flex items-center gap-2 hover:text-white transition-colors">
          <LuFolder size={18} />
          Accounts
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); onMenuClick('Analytics'); }} className="flex items-center gap-2 hover:text-white transition-colors">
          <FiBarChart2 size={18} />
          Analytics
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); onMenuClick('Finn AI Advisor'); }} className="flex items-center gap-2 hover:text-white transition-colors">
          <LuCpu size={18} />
          AI Advisor
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); onMenuClick('Goals & Targets'); }} className="flex items-center gap-2 hover:text-white transition-colors">
          <LuTarget size={18} />
          Goals
        </a>
        <a href="#" onClick={() => onMenuClick('Settings')} className="flex items-center gap-2 hover:text-white transition-colors">
          <LuSettings size={18} />
          Settings
        </a>
      </nav>

      {/* Right content notification and profile */}
      <div className="flex items-center gap-6">
        <button onClick={() => onMenuClick('Notifications')} className="text-slate-400 hover:text-white relative mt-1">
          <LuBell size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div onClick={() => onMenuClick('Profile Settings')} className="flex items-center gap-3 border-l border-slate-800 pl-6 cursor-pointer">
          <img
            src="/mari.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full border border-slate-700"
          />
          <span className="text-slate-200 font-medium">Mari</span>
          <LuChevronDown className="text-slate-400" size={16} />
        </div>
      </div>

    </header>
  );
}