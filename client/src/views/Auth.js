/** @format */

import LoginForm from "../components/auth/LoginForm";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  let body;

  if (authLoading)
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  else if (isAuthenticated) return <Redirect to="/" />;
  else body = <>{authRoute === "login" && <LoginForm />}</>;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootswatch@4.6.0/dist/minty/bootstrap.min.css"
        integrity="sha256-Fhkkoc5EF4ZmicPhSUkkS+tsuBpRE+Z/26qIgGSSIxQ="
        crossorigin="anonymous"
      />
      <div className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1>Online logbook.v1</h1>
            <h4></h4>
            {body}
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
