import React from 'react';
import { 
  LuLayoutGrid, 
  LuFolderOpen, 
  LuCalendar, 
  LuSettings, 
  LuLogOut 
} from "react-icons/lu";

import { FiBarChart2 } from "react-icons/fi";

export default function Sidebar({onMenuClick}) {
  return (
    <aside className="w-16 h-full bg-[#111827] border-r border-slate-800 flex flex-col items-center py-6 justify-between">
      <div className="flex flex-col items-center gap-8">
        <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-500/30 mb-4">
          S
        </div>

        <nav className="flex flex-col gap-6">
          <button className="text-teal-400 p-2 bg-slate-800/50 rounded-lg transition-colors">
            <LuLayoutGrid size={20} />
          </button>
          <button onClick={() => onMenuClick('Folders')} className="text-slate-400 hover:text-white transition-colors p-2">
            <LuFolderOpen size={20} />
          </button>
          
          {/* chart bar */}
          <button onClick={() => onMenuClick('Statistics')} className="text-slate-400 hover:text-white transition-colors p-2">
            <FiBarChart2 size={20} />
          </button>

          <button onClick={() => onMenuClick('Calendar')} className="text-slate-400 hover:text-white transition-colors p-2">
            <LuCalendar size={20} />
          </button>
          <button onClick={() => onMenuClick('Settings')} className="text-slate-400 hover:text-white transition-colors p-2">
            <LuSettings size={20} />
          </button>
        </nav>
      </div>

      <button onClick={() => onMenuClick('Logout')} className="text-slate-400 hover:text-red-400 transition-colors p-2">
        <LuLogOut size={20} />
      </button>
    </aside>
  );
}