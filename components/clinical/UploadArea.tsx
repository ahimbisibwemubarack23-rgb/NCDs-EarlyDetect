
import React, { useState, useRef } from 'react';
import { MODALITIES } from '../../constants';

interface UploadAreaProps {
  onComplete: () => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onComplete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [modality, setModality] = useState(MODALITIES[0]);
  const [anonymize, setAnonymize] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const startUpload = () => {
    if (!selectedFile) return;
    setIsUploading(true);
    // Simulate pipeline: Anonymization -> Storage -> Model Queue
    setTimeout(() => {
      setIsUploading(false);
      onComplete();
    }, 2500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
            selectedFile ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
          }`}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileChange}
            accept=".dcm,.png,.jpg,.jpeg"
          />
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
            </div>
            {selectedFile ? (
              <div className="space-y-1">
                <p className="text-lg font-bold text-slate-900">{selectedFile.name}</p>
                <p className="text-sm text-slate-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready to analyze</p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-lg font-bold text-slate-900">Drop DICOM or Image files</p>
                <p className="text-sm text-slate-500">DICOM, PNG, or JPEG supported (Max 50MB)</p>
              </div>
            )}
          </div>
        </div>

        {isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-blue-600">Local Pipeline: Anonymizing Metadata...</span>
              <span>65%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full w-[65%] animate-pulse"></div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <h3 className="font-bold text-slate-900">Processing Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Imaging Modality</label>
            <select 
              value={modality}
              onChange={(e) => setModality(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm"
            >
              {MODALITIES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div>
              <p className="text-sm font-bold text-slate-900">Anonymize Patient Data</p>
              <p className="text-xs text-slate-500">Strip DICOM tags before storage</p>
            </div>
            <button 
              onClick={() => setAnonymize(!anonymize)}
              className={`w-10 h-6 rounded-full transition-colors relative ${anonymize ? 'bg-blue-600' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${anonymize ? 'right-1' : 'left-1'}`}></div>
            </button>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
            <p className="text-xs text-yellow-800 leading-relaxed font-medium">
              Note: This scan will be processed locally on Node Kampala_Central_Private. No data will leave the local network.
            </p>
          </div>
        </div>

        <button 
          disabled={!selectedFile || isUploading}
          onClick={startUpload}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg"
        >
          Start Analysis
        </button>
      </div>
    </div>
  );
};

export default UploadArea;
