
import React from 'react';

export const MEDICAL_DISCLAIMER = "This system is an AI-assisted medical imaging platform intended to support healthcare professionals. It does not provide diagnoses or treatment advice.";

export const MODALITIES = ['Chest X-Ray', 'CT Scan', 'MRI', 'Ultrasound'];

export const ROLE_PERMISSIONS = {
  CLINICAL: ['DOCTOR', 'RADIOLOGIST', 'NURSE'],
  TECHNICAL: ['DEVELOPER', 'ADMIN']
};

export const MOCK_CASES = [
  {
    id: 'CASE-001',
    patientId: 'UG-1092',
    patientName: 'K. Musoke',
    age: 45,
    gender: 'M',
    modality: 'DICOM',
    imageUrl: 'https://picsum.photos/seed/case1/800/600',
    status: 'ANALYZED',
    findings: 'Potential early stage pneumonia indicators detected in lower left lobe.',
    confidence: 0.89,
    timestamp: '2024-05-10 09:30'
  },
  {
    id: 'CASE-002',
    patientId: 'UG-3321',
    patientName: 'A. Nakato',
    age: 32,
    gender: 'F',
    modality: 'PNG',
    imageUrl: 'https://picsum.photos/seed/case2/800/600',
    status: 'PENDING',
    timestamp: '2024-05-11 14:15'
  }
];
