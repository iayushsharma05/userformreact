import { Link } from "react-router-dom";
import Navbar from "./Navbar";


const LogoutMessage = () => {
  return (
    <>
      <h1 className="text-center text-success">Logout Success !</h1>
    <Navbar/>
    <div className="d-flex justify-content-center align-items-center ">
      <div className="text-center">
        <h1 className="text-danger">You Are Loged Off 🙄 !</h1>
        <h4>please login to continue</h4>

        <Link to="/login" className="btn btn-primary">
          Go back to Login
        </Link>
      </div>
    </div>
  </>
  );
};
export default LogoutMessage;
