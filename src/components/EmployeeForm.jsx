import { useState } from "react";

const emptyForm = { name: "", email: "", phone: "", dob: "", department: "" };

function EmployeeForm({ employee, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(employee || emptyForm);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter the employee name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter an email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email, like name@example.com.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter a phone number.";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a 10-digit mobile number starting with 6, 7, 8 or 9.";
    }

    if (!formData.dob) {
      newErrors.dob = "Please select a date of birth.";
    } else if (new Date(formData.dob) > new Date()) {
      newErrors.dob = "Date of birth cannot be in the future.";
    }

    if (!formData.department) {
      newErrors.department = "Please select a department.";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label>Employee Name</label>
        <input
          type="text"
          name="name"
          placeholder="e.g. Rahul Sharma"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "has-error" : ""}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}
      </div>

      <div className="field">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "has-error" : ""}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      <div className="field">
        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="10-digit mobile number"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? "has-error" : ""}
        />
        {errors.phone && <p className="error-text">{errors.phone}</p>}
      </div>

      <div className="field">
        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className={errors.dob ? "has-error" : ""}
        />
        {errors.dob && <p className="error-text">{errors.dob}</p>}
      </div>

      <div className="field">
        <label>Department</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className={errors.department ? "has-error" : ""}
        >
          <option value="">Select department</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Sales">Sales</option>
          <option value="Operations">Operations</option>
        </select>
        {errors.department && <p className="error-text">{errors.department}</p>}
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {employee ? "Save Changes" : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;
