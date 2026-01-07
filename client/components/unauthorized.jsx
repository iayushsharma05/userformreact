import { Link } from "react-router-dom";
import Navbar from "./Navbar";


const Unauthorized = () => {
  return (
    <>
      <h1 className="text-center">Oops ! Error !</h1>
    <Navbar/>
    <div className="d-flex justify-content-center align-items-center ">
      <div className="text-center">
        <h1 className="text-danger">401</h1>
        <h3>You are not logged in</h3>
        <p>Please login to continue</p>

        <Link to="/login" className="btn btn-primary">
          Go back to Login
        </Link>
      </div>
    </div>
  </>
  );
};

export default Unauthorized;
