import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from "./Pages/SignIn";
import CreateAccount from './Pages/CreateAccount';
import OtpVerification from './Pages/OtpVerification';
import CreatePin from './Pages/CreatePin';
import ResetPassword from './Pages/ResetPassword';
import CheckYourMail from './Pages/CheckYourMail';
import CreateNewPassword from './Pages/CreateNewPassword';
import DashBoard from './Pages/DashBoard';
import Layout from './Components/Layout';
import DashboardLayout from './Components/DashboardLayout'; // Import your DashboardLayout
import AffiliateRegistration from './Components/AffilateUser/AffiliateRegistration';
import Referrals from './Pages/Referals';
import ProfilePage from './Pages/ProfilePage';

function App() {
  return (
    
      <Routes>
        {/* Public routes without Layout */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/otp" element={<OtpVerification />} />
        <Route path='/create-pin' element={<CreatePin />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path='/check-mail' element={<CheckYourMail />} />
        <Route path='/change-password' element={<CreateNewPassword />} />
        <Route path='/affilator-create-account' element={<AffiliateRegistration />} />
        
        {/* Protected routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path='/refearals' element={<Referrals />}  />
          <Route path='/profile' element={<ProfilePage />} />
         
        </Route>
      </Routes>
  
  );
}

export default App;