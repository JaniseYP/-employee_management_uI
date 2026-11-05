import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeModal from "./components/EmployeeModal";

const API_URL = "http://localhost:5000/api/employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deletingEmployee, setDeletingEmployee] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
  async function loadEmployees() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      showMessage("Could not load employees. Is the backend running?");
    }
  }
  loadEmployees();
}, []);

  function showMessage(text) {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  }

  function getNextId() {
    let highest = 0;
    employees.forEach((emp) => {
      const number = parseInt(emp.id.replace("EMP", ""));
      if (number > highest) highest = number;
    });
    return "EMP" + String(highest + 1).padStart(3, "0");
  }

  function openAddForm() {
    setEditingEmployee(null);
    setShowForm(true);
  }

  function openEditForm(emp) {
    setEditingEmployee(emp);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingEmployee(null);
  }

  async function handleSave(formData) {
  try {
    if (editingEmployee) {
      const response = await fetch(`${API_URL}/${editingEmployee.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Request failed");
      const updatedEmployee = await response.json();
      setEmployees(
        employees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
      );
      showMessage("Employee updated successfully.");
    } else {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Request failed");
      const newEmployee = await response.json();
      setEmployees([...employees, newEmployee]);
      showMessage("Employee added successfully.");
    }
    closeForm();
  } catch (error) {
    showMessage("Something went wrong. Please try again.");
  }
}

  async function handleDelete() {
  try {
    const response = await fetch(`${API_URL}/${deletingEmployee.id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Request failed");
    setEmployees(employees.filter((emp) => emp.id !== deletingEmployee.id));
    setDeletingEmployee(null);
    showMessage("Employee deleted successfully.");
  } catch (error) {
    showMessage("Something went wrong. Please try again.");
  }
}

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchText.trim().toLowerCase())
  );

  return (
    <div className="app">
      <div className="card">
        <Header onAddClick={openAddForm} />

        <div className="toolbar">
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
          <span className="count">
            {filteredEmployees.length} of {employees.length} employees
          </span>
        </div>

        <EmployeeTable
          employees={filteredEmployees}
          onEdit={openEditForm}
          onDelete={setDeletingEmployee}
          searching={searchText.trim() !== ""}
        />
      </div>

      {showForm && (
        <EmployeeModal
          title={editingEmployee ? "Edit Employee" : "Add Employee"}
          onClose={closeForm}
        >
          <EmployeeForm
            employee={editingEmployee}
            onSubmit={handleSave}
            onCancel={closeForm}
          />
        </EmployeeModal>
      )}

      {deletingEmployee && (
        <EmployeeModal title="Delete employee?" onClose={() => setDeletingEmployee(null)}>
          <p className="confirm-text">
            Are you sure you want to delete <strong>{deletingEmployee.name}</strong> ({deletingEmployee.id})?
          </p>
          <div className="form-actions">
            <button className="btn btn-secondary" onClick={() => setDeletingEmployee(null)}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </EmployeeModal>
      )}

      {message && <div className="toast">{message}</div>}
    </div>
  );
}

export default App;
