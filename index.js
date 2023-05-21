// Your code here
function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(employeesData) {
  return employeesData.map(employeeData => createEmployeeRecord(employeeData));
}

function createTimeInEvent(employee, dateTimeStamp) {
  const [date, time] = dateTimeStamp.split(' ');
  employee.timeInEvents.push({ type: "TimeIn", hour: parseInt(time), date });
  return employee;
}

function createTimeOutEvent(employee, dateTimeStamp) {
  const [date, time] = dateTimeStamp.split(' ');
  employee.timeOutEvents.push({ type: "TimeOut", hour: parseInt(time), date });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(event => event.date === date);
  const timeOut = employee.timeOutEvents.find(event => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}

function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map(event => event.date);
  return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employee, date), 0);
}

function calculatePayroll(employees) {
  return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}