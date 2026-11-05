# Employee Management UI

A standalone React frontend for managing employees, inspired by the Meepl HRMS Employee page. It uses only React state: no backend, database or API.

## Features
- View employees in a table (ID, Name, Email, Department, Actions)
- Search by name (case-insensitive) with a clear "No employees found" message
- Add employee with validation (required fields, email format, 10-digit phone, DOB not in the future)
- Edit employee using the same reusable form
- Delete employee with a confirmation dialog
- Success messages after add, update and delete
- Responsive layout for desktop, tablet and mobile

## Technologies Used
React 18 (functional components, `useState`, props), JavaScript, HTML, CSS, Vite, Git and GitHub

## Folder Structure
```
employee-management-ui/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    └── components/
        ├── Header.jsx
        ├── SearchBar.jsx
        ├── EmployeeTable.jsx
        ├── EmployeeForm.jsx
        └── EmployeeModal.jsx
```

## Installation
```bash
git clone <your-repo-url>
cd employee-management-ui
git checkout feature/employee-management-ui
npm install
```

## Run the Application
```bash
npm run dev       # development server (http://localhost:5173)
npm run build     # production build
npm run preview   # preview the production build
```

## Screenshots
_Add screenshots here (for example `docs/employee-list.png`, `docs/add-employee.png`)._

## Git Branches
- `main`: stable code
- `develop`: development code
- `feature/employee-management-ui`: working branch for this task
