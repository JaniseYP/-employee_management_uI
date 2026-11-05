function EmployeeTable({ employees, onEdit, onDelete, searching }) {
  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-title">{searching ? "No employees found" : "No employees yet"}</p>
        <p>{searching ? "Try a different name." : "Click Add Employee to create one."}</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th className="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td data-label="Employee ID">{emp.id}</td>
              <td data-label="Name">{emp.name}</td>
              <td data-label="Email">{emp.email}</td>
              <td data-label="Department">
                <span className="dept-pill">{emp.department}</span>
              </td>
              <td data-label="Actions" className="actions-col">
                <button className="btn btn-ghost" onClick={() => onEdit(emp)}>Edit</button>
                <button className="btn btn-danger-ghost" onClick={() => onDelete(emp)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
