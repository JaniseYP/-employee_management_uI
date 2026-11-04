import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeModal from "./components/EmployeeModal";

const startingEmployees = [
  { id: "EMP001", name: "Rahul", email: "rahul@gmail.com", phone: "9876543210", dob: "1995-04-12", department: "IT" },
  { id: "EMP002", name: "Priya", email: "priya@gmail.com", phone: "9123456780", dob: "1997-08-23", department: "HR" },
  { id: "EMP003", name: "Amit", email: "amit@gmail.com", phone: "9988776655", dob: "1993-01-30", department: "Finance" },
];

function App() {
  const [employees, setEmployees] = useState(startingEmployees);
  const [searchText, setSearchText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deletingEmployee, setDeletingEmployee] = useState(null);
  const [message, setMessage] = useState("");

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

  function handleSave(formData) {
    if (editingEmployee) {
      const updatedList = employees.map((emp) =>
        emp.id === editingEmployee.id ? { ...emp, ...formData } : emp
      );
      setEmployees(updatedList);
      showMessage("Employee updated successfully.");
    } else {
      const newEmployee = { id: getNextId(), ...formData };
      setEmployees([...employees, newEmployee]);
      showMessage("Employee added successfully.");
    }
    closeForm();
  }

  function handleDelete() {
    const updatedList = employees.filter((emp) => emp.id !== deletingEmployee.id);
    setEmployees(updatedList);
    setDeletingEmployee(null);
    showMessage("Employee deleted successfully.");
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
