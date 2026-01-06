
import React from 'react';
import { PatientCase } from '../../types';

interface CaseListProps {
  cases: PatientCase[];
  onSelect: (c: PatientCase) => void;
}

const CaseList: React.FC<CaseListProps> = ({ cases, onSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Case ID</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Modality</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Confidence</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {cases.map((c) => (
            <tr key={c.id} className="hover:bg-slate-50 transition group">
              <td className="px-6 py-4 text-sm font-medium text-blue-600">{c.id}</td>
              <td className="px-6 py-4">
                <div className="text-sm font-semibold text-slate-900">{c.patientName}</div>
                <div className="text-xs text-slate-500">ID: {c.patientId} • {c.age}Y/{c.gender}</div>
              </td>
              <td className="px-6 py-4">
                <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-medium">
                  {c.modality}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  c.status === 'ANALYZED' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'ANALYZED' ? 'bg-green-600' : 'bg-amber-600'}`}></span>
                  {c.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {c.confidence ? `${(c.confidence * 100).toFixed(1)}%` : '--'}
              </td>
              <td className="px-6 py-4 text-xs text-slate-500">{c.timestamp}</td>
              <td className="px-6 py-4">
                <button 
                  onClick={() => onSelect(c)}
                  className="text-slate-400 hover:text-blue-600 group-hover:scale-110 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CaseList;
