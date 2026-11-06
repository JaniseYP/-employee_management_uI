const fs = require("fs");
const os = require("os");
const path = require("path");

const sourceFile = path.join(__dirname, "..", "data", "employees.json");
const dataFile = process.env.VERCEL
  ? path.join(os.tmpdir(), "employees.json")
  : sourceFile;

if (process.env.VERCEL && !fs.existsSync(dataFile)) {
  fs.copyFileSync(sourceFile, dataFile);
}

function readEmployees() {
  const fileText = fs.readFileSync(dataFile, "utf-8");
  return JSON.parse(fileText);
}

function saveEmployees(employees) {
  fs.writeFileSync(dataFile, JSON.stringify(employees, null, 2));
}

function getNextId(employees) {
  let highest = 0;
  employees.forEach((emp) => {
    const number = parseInt(emp.id.replace("EMP", ""));
    if (number > highest) highest = number;
  });
  return "EMP" + String(highest + 1).padStart(3, "0");
}

function getEmployees(req, res) {
  res.json(readEmployees());
}

function addEmployee(req, res) {
  const employees = readEmployees();
  const newEmployee = { id: getNextId(employees), ...req.body };
  employees.push(newEmployee);
  saveEmployees(employees);
  res.status(201).json(newEmployee);
}

function updateEmployee(req, res) {
  const employees = readEmployees();
  const index = employees.findIndex((emp) => emp.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Employee not found" });
  }

  employees[index] = { ...employees[index], ...req.body, id: employees[index].id };
  saveEmployees(employees);
  res.json(employees[index]);
}

function deleteEmployee(req, res) {
  const employees = readEmployees();
  const exists = employees.some((emp) => emp.id === req.params.id);

  if (!exists) {
    return res.status(404).json({ message: "Employee not found" });
  }

  const remaining = employees.filter((emp) => emp.id !== req.params.id);
  saveEmployees(remaining);
  res.json({ message: "Employee deleted" });
}

module.exports = { getEmployees, addEmployee, updateEmployee, deleteEmployee };