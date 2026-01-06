
import React, { useState } from 'react';
import { User, UserRole, PatientCase } from '../types';
import { ROLE_PERMISSIONS, MOCK_CASES } from '../constants';
import CaseList from './clinical/CaseList';
import UploadArea from './clinical/UploadArea';
import AnalysisView from './clinical/AnalysisView';
import DeveloperModule from './developer/DeveloperModule';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [selectedCase, setSelectedCase] = useState<PatientCase | null>(null);
  const [view, setView] = useState<'LIST' | 'ANALYSIS' | 'UPLOAD'>('LIST');

  const handleCaseSelect = (patientCase: PatientCase) => {
    setSelectedCase(patientCase);
    setView('ANALYSIS');
  };

  const handleUploadClick = () => setView('UPLOAD');
  const handleBackToList = () => setView('LIST');

  // Role Routing
  if (ROLE_PERMISSIONS.TECHNICAL.includes(user.role)) {
    return <DeveloperModule user={user} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {view === 'LIST' && 'Clinical Workspace'}
            {view === 'UPLOAD' && 'New Image Upload'}
            {view === 'ANALYSIS' && `Case Analysis: ${selectedCase?.id}`}
          </h2>
          <p className="text-slate-500">
            {view === 'LIST' && 'Manage and review patient NCD imaging records.'}
            {view === 'UPLOAD' && 'Process new DICOM, PNG, or JPEG modalities for AI analysis.'}
            {view === 'ANALYSIS' && `Reviewing AI segmentation and findings for ${selectedCase?.patientName}.`}
          </p>
        </div>
        {view === 'LIST' && (
          <button 
            onClick={handleUploadClick}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            New Scan
          </button>
        )}
        {view !== 'LIST' && (
          <button 
            onClick={handleBackToList}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back to List
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {view === 'LIST' && <CaseList cases={MOCK_CASES as PatientCase[]} onSelect={handleCaseSelect} />}
        {view === 'UPLOAD' && <UploadArea onComplete={handleBackToList} />}
        {view === 'ANALYSIS' && selectedCase && <AnalysisView patientCase={selectedCase} />}
      </div>
    </div>
  );
};

export default Dashboard;
