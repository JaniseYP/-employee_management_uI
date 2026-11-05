# Employee Management UI

A simple Employee Management page built with React, inspired by the Meepl HRMS employee screen. I made it as my first internship task at Meepl. It is a standalone frontend project, so there is no backend, database or API. All the employee data is stored in React state, which means it resets when the page is refreshed.

## What it does

- Shows a list of employees with their ID, name, email and department
- Search employees by name
- Shows a "No employees found" message when nothing matches
- Add a new employee using a form with name, email, phone number, date of birth and department
- Checks the form before saving: all fields are required, the email must be valid and the phone number must be a 10-digit mobile number
- Edit an existing employee using the same form
- Delete an employee after a confirmation popup
- Shows a success message after adding, updating or deleting

## Technologies used

- React.js (functional components, `useState` hook, props)
- JavaScript
- HTML
- CSS
- Vite
- Git and GitHub

## Folder structure

-employee_management_uI/
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

## How to set it up

1. Clone the repository
   ```
   git clone https://github.com/JaniseYP/-employee_management_uI
   ```
2. Go into the project folder
   ```
   cd -employee_management_uI
   ```
3. Switch to the working branch
   ```
   git checkout feature/-employee_management_uI
   ```
4. Install the packages
   ```
   npm install
   ```

## How to run it

Start the development server:

```
npm run dev
```

Then open the link shown in the terminal (usually http://localhost:5173).

## Screenshots

![Employee list](docs/employee-list.png)
![Add employee form](docs/add-employee.png)

## Git branches

- `main` - stable code
- `develop` - development code
- `feature/-employee_management_uI` - the branch I worked on for this task.
