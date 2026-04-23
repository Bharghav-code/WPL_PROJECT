import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import RoleSelect from './pages/RoleSelect';
import LearnerDashboard from './pages/LearnerDashboard';
import TeacherList from './pages/TeacherList';
import MyEnrollments from './pages/MyEnrollments';
import TeacherDashboard from './pages/TeacherDashboard';
import ListSkill from './pages/ListSkill';
import MyListings from './pages/MyListings';

// Simple PrivateRoute wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/role-select" element={
          <PrivateRoute><RoleSelect /></PrivateRoute>
        } />
        
        <Route path="/learner/dashboard" element={
          <PrivateRoute><LearnerDashboard /></PrivateRoute>
        } />
        
        <Route path="/learner/category/:category" element={
          <PrivateRoute><TeacherList /></PrivateRoute>
        } />
        
        <Route path="/learner/enrollments" element={
          <PrivateRoute><MyEnrollments /></PrivateRoute>
        } />
        
        <Route path="/teacher/dashboard" element={
          <PrivateRoute><TeacherDashboard /></PrivateRoute>
        } />
        
        <Route path="/teacher/list-skill" element={
          <PrivateRoute><ListSkill /></PrivateRoute>
        } />
        
        <Route path="/teacher/my-listings" element={
          <PrivateRoute><MyListings /></PrivateRoute>
        } />

        {/* Redirect unknown to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
