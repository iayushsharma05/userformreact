import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Adduser from '../components/adduser';
import Search from '../components/search';
import Index from '../components/index';
import Login from '../components/login';
import UserProfile from '../components/UserProfile';
import NoInternetToast from '../components/NoConnection';
import Unauthorized from '../components/unauthorized';
import LogoutMessage from '../components/logoutmessage';

const App = () => {
  return (

    <BrowserRouter>
    <NoInternetToast/>
      <Routes>
        <Route path="/searchuser" element={<Search />} />
        <Route path="/" element={<Index />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/adduser" element={<Adduser />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/logoutmessage" element={<LogoutMessage />} />

        
      </Routes>
    </BrowserRouter>
  )
}
export default App; 