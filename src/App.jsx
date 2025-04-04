import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import SignIn from "./Pages/SignIn";
import CreateAccount from './Pages/CreateAccount';
import OtpVerification from './Pages/OtpVerification';
import CreatePin from './Pages/CreatePin';
import ResetPassword from './Pages/ResetPassword';
import CheckYourMail from './Pages/CheckYourMail';
import CreateNewPassword from './Pages/CreateNewPassword';
import DashBoard from './Pages/DashBoard';
import Layout from './Components/Layout';
import DashboardLayout from './Components/DashboardLayout';
import AffiliateRegistration from './Components/AffilateUser/AffiliateRegistration';
import Referrals from './Pages/Referals';
import ProfilePage from './Pages/ProfilePage';
import GroupCreationFlow from './Pages/GroupCreationFlow';
import GroupListPage from './Pages/GroupListPage';
import ChatPage from './Components/ChatPage';
import NotificationPage from './Pages/NotificationPage';
import useAuthStore from './Store/Auth';
import GroupListTable from './Pages/GroupListPage';
import HomePage from './Pages/HomePage';

// Auth Protected Route Component
const ProtectedRoute = () => {
  const { user } = useAuthStore();
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

// Auth Public Route Component (for logged out users)
const PublicRoute = () => {
  const { user } = useAuthStore();
  return !user ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

function App() {
  return (

    <Routes>
      {/* Public routes (only accessible when logged out) */}
      <Route element={<PublicRoute />}>
      <Route path='/' element={<HomePage />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/otp" element={<OtpVerification />} />
        <Route path="/create-pin" element={<CreatePin />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/check-mail" element={<CheckYourMail />} />
        <Route path="/change-password" element={<CreateNewPassword />} />
        <Route path="/affilator-create-account" element={<AffiliateRegistration />} />
      </Route>

      {/* Protected routes (only accessible when logged in) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/refearals" element={<Referrals />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/group" element={<GroupListTable />} />
          <Route path="/groupList" element={<GroupListPage />} />
          <Route path="/groupCreation" element={<GroupCreationFlow />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/notification" element={<NotificationPage />} />
        </Route>
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

  );
}

export default App;