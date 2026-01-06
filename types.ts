
export enum UserRole {
  DOCTOR = 'DOCTOR',
  RADIOLOGIST = 'RADIOLOGIST',
  NURSE = 'NURSE',
  DEVELOPER = 'DEVELOPER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
  fullName: string;
}

export interface PatientCase {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  modality: 'DICOM' | 'PNG' | 'JPEG';
  imageUrl: string;
  status: 'PENDING' | 'ANALYZED' | 'FAILED';
  findings?: string;
  confidence?: number;
  timestamp: string;
}

// Fixed: Added findings_summary property to match AI analysis output and resolve UI type errors
export interface AIAnalysisResult {
  classification: string;
  confidence: number;
  findings_summary: string;
  heatmapUrl?: string;
  segmentationMask?: string; // Base64 mask
  recommendations: string[];
}

export interface TrainingJob {
  id: string;
  modelName: string;
  version: string;
  status: 'QUEUED' | 'TRAINING' | 'COMPLETED' | 'FAILED';
  progress: number;
  accuracy?: number;
  loss?: number;
}