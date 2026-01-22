
import React from 'react';
import { Equipment, EquipmentStatus } from '../types';

interface EquipmentRowProps {
  item: Equipment;
  onUpdate: (updated: Equipment) => void;
}

const EquipmentRow: React.FC<EquipmentRowProps> = ({ item, onUpdate }) => {
  const statuses = [
    { value: EquipmentStatus.RUNNING, label: 'ON', color: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' },
    { value: EquipmentStatus.STOPPED, label: 'OFF', color: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' },
    { value: EquipmentStatus.STANDBY, label: 'SBY', color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' },
    { value: EquipmentStatus.ANOMALY, label: 'ERR', color: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100' },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-slate-50 transition-all gap-4 group">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono font-bold text-slate-900 tracking-tight">{item.tag}</span>
          {item.comment && (
             <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold uppercase truncate max-w-[150px]">
               {item.comment}
             </span>
          )}
        </div>
        <input
          type="text"
          value={item.comment || ''}
          placeholder="Nota técnica..."
          onChange={(e) => onUpdate({ ...item, comment: e.target.value })}
          className="w-full text-xs text-slate-500 bg-transparent border-none focus:ring-0 p-0 placeholder-slate-300 italic group-hover:placeholder-slate-400 transition-all"
        />
      </div>
      
      <div className="flex items-center gap-1.5 shrink-0">
        {statuses.map((s) => {
          const isActive = item.status === s.value;
          return (
            <button
              key={s.value}
              onClick={() => onUpdate({ ...item, status: s.value })}
              className={`
                h-10 px-3 rounded-xl flex flex-col items-center justify-center border-2 transition-all active:scale-90
                ${isActive ? `${s.color} border-current shadow-sm scale-105 z-10` : 'border-transparent bg-slate-50 text-slate-300 opacity-60 hover:opacity-100'}
              `}
            >
              <span className="text-sm leading-none mb-0.5">{s.value}</span>
              <span className="text-[8px] font-black uppercase tracking-tighter leading-none">{s.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EquipmentRow;
