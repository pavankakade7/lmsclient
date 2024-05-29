import axios from "axios";


const REST_API_BASE_URL = 'http://localhost:8080/api/employees'
const REST_API_USER = 'http://localhost:8080/api/users'
const REST_API_LEAVE = 'http://localhost:8080/api/leave-requests'


// Employee
export const listEmployees = () => axios.get(REST_API_BASE_URL);
export const createEmployee = (employee) => axios.post(REST_API_BASE_URL,employee);
export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL + "/" + employeeId);
export const updateEmployee = (employeeId, employee) => axios.put(REST_API_BASE_URL + "/"+ employeeId,employee);
export const deleteEmployee= (employeeId) => axios.delete(REST_API_BASE_URL + "/" + employeeId);


// user
export const addUser= (user) => axios.post(REST_API_USER , user);



// leave -request
export const leaveRequest = (userId) => axios.post(REST_API_LEAVE + userId)