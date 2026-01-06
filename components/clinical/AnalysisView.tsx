
import React, { useState, useEffect } from 'react';
import { PatientCase, AIAnalysisResult } from '../../types';
import { analyzeMedicalImage } from '../../services/geminiService';

interface AnalysisViewProps {
  patientCase: PatientCase;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ patientCase }) => {
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showMask, setShowMask] = useState(true);

  const fetchAnalysis = async () => {
    setLoading(true);
    try {
      // Simulate real-time inference or retrieval
      const res = await analyzeMedicalImage(patientCase.imageUrl, patientCase.modality);
      setAnalysis(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientCase.status === 'ANALYZED') {
      fetchAnalysis();
    }
  }, [patientCase]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {/* Main Viewer */}
        <div className="relative bg-black rounded-2xl overflow-hidden aspect-video flex items-center justify-center border-4 border-slate-200">
          {loading ? (
            <div className="text-white flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="animate-pulse">Running MONAI Inference Pipeline...</p>
            </div>
          ) : (
            <>
              <img src={patientCase.imageUrl} alt="Scan" className="w-full h-full object-contain" />
              {showHeatmap && (
                <div className="absolute inset-0 opacity-50 bg-gradient-to-tr from-blue-500/40 via-yellow-500/40 to-red-500/40 pointer-events-none mix-blend-overlay"></div>
              )}
              {showMask && analysis && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
                  <path d="M100,100 Q150,50 200,100 T300,150 Q250,250 150,200 Z" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" />
                  <circle cx="250" cy="180" r="30" fill="#ef4444" className="animate-pulse" />
                </svg>
              )}
              
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button 
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${showHeatmap ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur'}`}
                >
                  HEATMAP
                </button>
                <button 
                  onClick={() => setShowMask(!showMask)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${showMask ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur'}`}
                >
                  SEGMENTATION
                </button>
              </div>
            </>
          )}
        </div>

        {/* Viewer Tools */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <button className="flex-1 flex flex-col items-center gap-1 p-2 hover:bg-slate-50 rounded-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M2 12h20"/></svg>
            <span className="text-[10px] font-bold text-slate-500">PAN</span>
          </button>
          <button className="flex-1 flex flex-col items-center gap-1 p-2 hover:bg-slate-50 rounded-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
            <span className="text-[10px] font-bold text-slate-500">ZOOM</span>
          </button>
          <button className="flex-1 flex flex-col items-center gap-1 p-2 hover:bg-slate-50 rounded-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v20"/><path d="m2 12 5-5 5 5-5 5-5-5Z"/><path d="m17 12 5-5-5 5 5 5-5-5Z"/></svg>
            <span className="text-[10px] font-bold text-slate-500">WINDOW</span>
          </button>
          <div className="w-px h-8 bg-slate-200"></div>
          <button className="flex-1 flex flex-col items-center gap-1 p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" x2="12" y1="22.08" y2="12"/></svg>
            <span className="text-[10px] font-bold">GENERATE 3D</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Results Sidebar */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">AI Findings Summary</h3>
            {analysis ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-slate-900">{analysis.classification}</span>
                  <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">
                    {(analysis.confidence * 100).toFixed(1)}% Confidence
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  "{analysis.findings_summary}"
                </p>
                
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900">Recommended Next Steps</h4>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((rec, i) => (
                      <li key={i} className="flex gap-2 text-xs text-slate-600">
                        <span className="text-blue-500 font-bold">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400">Analysis results not available. Start inference pipeline.</p>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-sm transition shadow-md">
              Download Clinical Report (PDF)
            </button>
            <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-lg text-sm transition">
              Annotate & Save
            </button>
            <button className="w-full border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-2.5 rounded-lg text-sm transition">
              Share with Specialist
            </button>
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-4 text-white space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Metadata (Anonymized)</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <span className="text-slate-500">Modality:</span> <span>{patientCase.modality}</span>
            <span className="text-slate-500">Study UID:</span> <span>1.3.6.1.4.1.9...</span>
            <span className="text-slate-500">Resolution:</span> <span>2048 x 2048</span>
            <span className="text-slate-500">Pipeline:</span> <span>MONAI-v1.2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisView;
