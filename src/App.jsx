import 'antd/dist/reset.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import AttendanceSheet from './pages/section/attendance-sheet';
import Employee from './pages/section/employee';
import FullAttendance from './pages/section/full-month-attendance';
import SingleEmplopyee from './pages/section/employee/single-employee/index';
import EmplpoyeeLeave from './pages/section/employee-leaves';
import Setting from './pages/section/settings';
import EmployeeForm from './pages/section/employee/employee-form';
import PageNotFound from './pages/page-not-found';
import Login from './pages/auth/login';
import ChangePassword from './pages/section/settings/change-passoword';
import EventCalender from './pages/event-calender';
import LeavesPanel from './pages/section/settings/leave-panel';
import LeavesRequest from './pages/section/leaves-request';
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard /> }>
          <Route index element={<></>} />
          <Route index element={<Dashboard />} /> 
          <Route path="attendance" element={<AttendanceSheet />} />
          <Route path="employees" element={<Employee />} />
          <Route path="add-employee" element={<EmployeeForm />} />
          <Route path="/edit-employee/:id" element={<EmployeeForm />} />
          <Route path="full-month" element={<FullAttendance />} />
          <Route path="/profile/:id" element={<SingleEmplopyee />} />
          <Route path="employee-on-leave" element={<EmplpoyeeLeave />} />
          <Route path="event-calender" element={<EventCalender />} />
          <Route path="leaves-request" element={<LeavesRequest />} />
          {/* setting routes */}
          <Route path="settings" element={<Setting />} />
          <Route path="/settings/change-password" element={<ChangePassword />} />
          <Route path="/settings/leaves-panel" element={<LeavesPanel />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
