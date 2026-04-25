# SkillShare Platform

SkillShare is a full-stack platform for hyper-local skill discovery and mentorship. It connects learners with nearby educators and enables users to teach, learn, and manage enrollments efficiently.

## Overview

The platform helps solve the problem of finding trusted local mentors by providing location-based discovery, secure authentication, and structured enrollment workflows.

## Key Features

- Secure authentication using JWT and bcrypt  
- Location-based discovery of mentors  
- Role-based dashboards for teachers and learners  
- Enrollment management (accept/reject requests)  
- User profiles with bio, skills, languages, and links  
- Responsive UI with smooth animations  

## Live Demo

Deployment in progress

## Tech Stack

### Frontend
- React.js  
- Vite  
- React Router DOM  
- Vanilla CSS  
- Framer Motion  
- Lucide React  

### Backend
- Flask (Python)  
- SQLite3  
- PyJWT  
- bcrypt  
- Flask-CORS  

## Getting Started

### Prerequisites

- Node.js (v18 or higher)  
- Python (v3.8 or higher)  
- Git

### Future Improvements
- Real-time chat
- Payment integration
- Ratings and reviews
- Cloud deployment
- AI-powered recommendation engine
- Trust and review system
- Hybrid learning support (WebRTC)
- Contributing

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/skillshare.git
cd skillshare/WPL_PROJECT
Backend Setup
cd backend

python -m venv venv

# Activate environment

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt

python app.py

Backend runs on http://localhost:5001

Frontend Setup
cd frontend

npm install
npm run dev

Frontend runs on http://localhost:5173

Project Structure
WPL_PROJECT
 ┣ backend
 ┃ ┣ app.py
 ┃ ┣ auth.py
 ┃ ┣ models.py
 ┃ ┣ seed.py
 ┃ ┗ requirements.txt
 ┣ frontend
 ┃ ┣ src
 ┃ ┃ ┣ components
 ┃ ┃ ┣ pages
 ┃ ┃ ┣ App.jsx
 ┃ ┃ ┣ main.jsx
 ┃ ┃ ┗ index.css
 ┃ ┣ package.json
 ┃ ┗ vite.config.js

API Endpoints: 
Endpoint	Method	Description	Auth
/api/register	POST	Register user	No
/api/login	POST	Login and get JWT	No
/api/profile	GET/PUT	User profile	Yes
/api/listings	GET	Fetch listings	No
/api/listings	POST	Create listing	Yes
/api/enrollments	POST	Request enrollment	Yes
/api/enrollments/status	PATCH	Accept or reject request	Yes (Teacher)

Create a branch, commit your changes, and push:

git checkout -b feature/YourFeature
git commit -m "Add YourFeature"
git push origin feature/YourFeature

License: MIT License
