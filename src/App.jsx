
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './login/Login'
import SignUp from './login/SignUp'
import UserDashboard from './user/UserDashboard'
import LeaveCalendar from './common/LeaveCalendar'
import EmployeeComponent from './employee/EmployeeComponents'
import Employees from './employee/Employees'
import RequestLeave from './employee/RequestLeave'
import AdminDashboard from './admin/AdminDashboard'
import Logout from './login/Logout'
import DashboardLayout from './common/DashboardLayout'


function App() {


  return (
    <>
    <div></div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element= {<Login/>} />
        <Route path='/login' element= {<Login/>} />
        <Route path='/signup' element= {<SignUp/>} />
        <Route path='/dashboard' element= {<DashboardLayout/>} />
        <Route path='/user-dashboard' element= {<UserDashboard/>} />
        <Route path='/admin-dashboard' element= {<AdminDashboard/>} />
        <Route path='/request-leave/:userId' element= {<RequestLeave/>} />
        <Route path='/leave-calendar' element={<LeaveCalendar/>} />
        <Route path='/employees' element={<Employees/>}/>
        <Route path='/add-employee' element={<EmployeeComponent/>} />
        <Route path='/update-employee/:id'element={<EmployeeComponent/>}/>
        <Route path='/logout' element= {<Logout/>} />
        
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
