
# NCD EarlyDetect Uganda - Full Stack Deployment

This platform runs 100% locally. No patient data ever leaves the clinic's local network.

## Project Structure
- `backend/`: FastAPI + MONAI AI Processing pipeline.
- `local_storage/`: Encrypted local folder for clinical records.
- `frontend/`: React dashboard (handled by index.tsx).

## Installation

### 1. Requirements
Install the local AI & 3D processing stack:
```bash
pip install fastapi uvicorn sqlalchemy torch monai simpleitk vtk numpy opencv-python pyjwt passlib[bcrypt] fpdf
```

### 2. Run Backend
From the project root:
```bash
python -m backend.main
```
The API will be available at `http://localhost:8000`.

### 3. Run Frontend
Open `index.html` in a local browser or use a dev server:
```bash
npm run dev
```

## Security Implementation
- **Anonymization**: `backend/utils.py` handles PII removal.
- **RBAC**: User roles (DOCTOR, ADMIN, etc.) are enforced via JWT.
- **Privacy**: No external cloud APIs are used for medical analysis.
