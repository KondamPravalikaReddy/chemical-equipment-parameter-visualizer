##  Chemical Equipment Parameter Visualizer
Hybrid Web + Desktop Application

A hybrid analytics application that runs as both a Web Application and a Desktop Application, powered by a shared Django REST backend. The system processes CSV files containing chemical equipment data, performs analytical computations, visualizes results, maintains upload history, and generates PDF reports.

##  Features

CSV upload via Web and Desktop

Data analytics using Pandas

Interactive charts (Chart.js & Matplotlib)

Upload history (last 5 datasets)

PDF report generation

Basic authentication (DRF)

Single backend for multiple frontends

##  Architecture
```
React (Web) ─┐
             ├── Django REST API ── SQLite
PyQt5 (Desktop) ┘
```

Both frontends consume the same backend APIs, ensuring consistency and reusability.

## Tech Stack

## Backend

-- Python

-- Django

-- Django REST Framework

-- Pandas

-- SQLite

-- ReportLab

## Frontend (Web)

-- React.js

-- Chart.js

-- Axios

## Frontend (Desktop)

-- PyQt5

-- Matplotlib

-- Requests

## Repository Structure
```
chemical-equipment-parameter-visualizer/
│
├── backend/
│   ├── backend/
│   ├── equipment/
│   ├── manage.py
│   └── requirements.txt
│
├── web-frontend/
│   └── src/
│
├── desktop-app/
│   └── app.py
│
├── sample_equipment_data.csv
├── README.md
└── .gitignore

```

## Setup Instructions
🔹 Prerequisites

Python 3.9+

Node.js & npm

Git

🔹 Backend Setup (Django)
cd backend
python -m venv venv


Activate virtual environment:

venv\Scripts\activate   # Windows


Install dependencies:

pip install -r requirements.txt


Run migrations:

python manage.py migrate


Start server:

python manage.py runserver


Backend runs at:

http://127.0.0.1:8000

## Web Frontend Setup (React)
cd web-frontend
npm install
npm start


Web app runs at:

http://localhost:3000


(If port is busy, React will switch to another port.)

## Desktop Application Setup (PyQt5)
cd desktop-app
pip install pyqt5 matplotlib requests
python app.py

## API Endpoints
Method	Endpoint	Description
POST	/api/upload/	Upload CSV and return analytics
GET	/api/history/	Retrieve last 5 uploaded datasets
GET	/api/report/	Download PDF report

## Sample CSV

A sample dataset is included:

sample_equipment_data.csv


Columns:

Equipment Name

Type

Flowrate

Pressure

Temperature

This file is used for demo and testing across Web and Desktop apps.

## Demo Video (2–3 Minutes)

The demo video showcases:

Backend startup

CSV upload via Web UI

Summary cards and chart visualization

Upload history tracking

PDF report download

CSV upload via Desktop app

Desktop chart visualization

## Authentication Note

Basic authentication is supported using Django REST Framework.
For development and demo purposes, authentication may be temporarily disabled and easily re-enabled.

## Task Compliance
```
✔ Hybrid Web + Desktop application
✔ Shared Django REST backend
✔ CSV analytics using Pandas
✔ Data visualization
✔ History management
✔ PDF report generation
✔ Sample CSV included
✔ GitHub-ready repository
```
