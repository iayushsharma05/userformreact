import { NavLink } from "react-router-dom";
import '../src/assets/index.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(
                "/user/logout",
                {},
                { withCredentials: true }
            );
            toast.success("Logout Success !");
            setTimeout(() => {
                navigate("/logoutmessage");
            }, 1000);
        } catch (error) {
            toast.danger("Logout Failed !");
          console.log(error);
        }

    };


    const toggleTheme = () => {
        document.body.classList.toggle("dark");

        // optional: save preference
        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark") ? "dark" : "light")
    };



    return (
        <nav className="navbar justify-content-between sticky-top">
            <a className="navbar-brand ">Project</a>
            <NavLink className="btn btnnav" to="/searchuser" disabled={location.pathname === "/searchuser"} >Show Users</NavLink>
            <NavLink className="btn btnnav" to="/adduser" disabled={location.pathname === "/adduser"}>Add User</NavLink>
            <NavLink className="btn btnnav" to="/login" disabled={location.pathname === "/login"} >Login</NavLink>
            <NavLink className="btn btnnav" to="/" disabled={location.pathname === "/"}>Sign Up</NavLink>
            <NavLink className="btn btnnav btntheme" onClick={handleLogout} >Logout </NavLink>
            <NavLink className="btntheme" onClick={toggleTheme} >☀️|🌙</NavLink>
            <ToastContainer position="top-center"/>

        </nav>
        
    );
};
export default Navbar;