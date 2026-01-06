
import React, { useState } from 'react';
import { User } from '../../types';

interface DeveloperModuleProps {
  user: User;
}

const DeveloperModule: React.FC<DeveloperModuleProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'DATA' | 'TRAIN' | 'LOGS'>('TRAIN');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Developer Control Panel</h2>
          <p className="text-slate-500">Manage local datasets, model versions, and training pipelines.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('DATA')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'DATA' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            Datasets
          </button>
          <button 
            onClick={() => setActiveTab('TRAIN')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'TRAIN' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            Models
          </button>
          <button 
            onClick={() => setActiveTab('LOGS')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'LOGS' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            System Logs
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'TRAIN' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Active Training Jobs</h3>
                <button className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-lg font-bold">New Training Job</button>
              </div>
              <div className="divide-y divide-slate-100">
                <TrainingJobItem 
                  name="NCD-Lung-Seg-Net" 
                  version="v1.4.2" 
                  status="TRAINING" 
                  progress={72} 
                  accuracy={0.92}
                />
                <TrainingJobItem 
                  name="Cardio-Risk-Classify" 
                  version="v0.9.1" 
                  status="COMPLETED" 
                  progress={100} 
                  accuracy={0.88}
                />
                <TrainingJobItem 
                  name="Liver-Density-Estimator" 
                  version="v1.0.0" 
                  status="FAILED" 
                  progress={15} 
                />
              </div>
            </div>
          )}

          {activeTab === 'DATA' && (
            <div className="grid grid-cols-2 gap-4">
              <DataCard title="Lung X-Ray Dataset" count={1240} labels={1240} size="4.2 GB" />
              <DataCard title="Cardiac MRI" count={450} labels={320} size="12.1 GB" />
              <DataCard title="Retinal Scans" count={2800} labels={2800} size="1.8 GB" />
              <div className="border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center p-8 hover:bg-slate-50 cursor-pointer transition">
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-400">+ New Dataset Path</p>
                  <p className="text-xs text-slate-400">Add local folder or NFS share</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'LOGS' && (
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-green-400 h-[400px] overflow-y-auto space-y-1">
              <p>[2024-05-12 10:15:02] INFO: Initializing PyTorch Local Worker...</p>
              <p>[2024-05-12 10:15:05] INFO: GPU detected: NVIDIA RTX A4000 (16GB VRAM)</p>
              <p>[2024-05-12 10:15:10] WARN: Storage space on /data is below 20%</p>
              <p>[2024-05-12 10:16:33] SUCCESS: User "Dr. Musoke" authenticated (Local JWT)</p>
              <p>[2024-05-12 10:20:11] INFO: Inference job "CASE-001" submitted to MONAI</p>
              <p>[2024-05-12 10:21:45] INFO: Segmentation complete. Generating STL Mesh...</p>
              <p className="animate-pulse">_</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Node Health</h3>
            <div className="space-y-4">
              <HealthBar label="CPU Usage" value={45} color="blue" />
              <HealthBar label="GPU Memory" value={82} color="red" />
              <HealthBar label="Disk Space" value={18} color="yellow" />
              <HealthBar label="RAM Usage" value={60} color="green" />
            </div>
          </div>

          <div className="bg-blue-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-bold mb-2">Private ML Network</h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              This instance is running as a localized edge node. Distributed training is enabled across Node_Kampala_01 and Node_Kampala_02.
            </p>
            <button className="mt-4 w-full bg-white text-blue-600 font-bold py-2 rounded-lg text-sm">
              Manage Cluster
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrainingJobItem = ({ name, version, status, progress, accuracy }: any) => (
  <div className="p-4 flex items-center justify-between">
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="font-bold text-slate-900">{name}</span>
        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{version}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-32 bg-slate-200 rounded-full h-1.5">
          <div className={`h-1.5 rounded-full ${status === 'FAILED' ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${progress}%` }}></div>
        </div>
        <span className="text-xs text-slate-500 font-medium">{progress}%</span>
      </div>
    </div>
    <div className="text-right">
      <div className={`text-xs font-bold ${status === 'COMPLETED' ? 'text-green-600' : status === 'FAILED' ? 'text-red-600' : 'text-blue-600'}`}>
        {status}
      </div>
      {accuracy && <div className="text-[10px] text-slate-400">Acc: {(accuracy * 100).toFixed(1)}%</div>}
    </div>
  </div>
);

const DataCard = ({ title, count, labels, size }: any) => (
  <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm space-y-3">
    <div className="flex justify-between items-start">
      <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
      <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold">{size}</span>
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-slate-50 p-2 rounded text-center">
        <div className="text-xs font-bold text-slate-900">{count}</div>
        <div className="text-[10px] text-slate-500 uppercase">Images</div>
      </div>
      <div className="bg-slate-50 p-2 rounded text-center">
        <div className="text-xs font-bold text-slate-900">{labels}</div>
        <div className="text-[10px] text-slate-500 uppercase">Labels</div>
      </div>
    </div>
  </div>
);

const HealthBar = ({ label, value, color }: any) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center text-xs">
      <span className="text-slate-500 font-medium">{label}</span>
      <span className="text-slate-900 font-bold">{value}%</span>
    </div>
    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
      <div className={`h-1.5 rounded-full bg-${color}-500`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

export default DeveloperModule;
