import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [auth, setAuth] = useState(false);
  const [isTokenValidated, setIsTokenValidated] = useState(false);

  useEffect(() => {
    // send jwt to API to see if it's valid
    let token = localStorage.getItem("access-token");
    let email = localStorage.getItem("email");
    if (token && email) {
      fetch("https://dashboard-hrm-system-backend.vercel.app/auth/verify", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          console.log(json);

          if (json.body.decoded.email === email) {
            setAuth(true);
          }
        })
        .catch((err) => {
          setAuth(false);
          console.log(err);
          localStorage.removeItem("access-token");
          localStorage.removeItem("id");
          localStorage.removeItem("email");
        })
        .then(() => setIsTokenValidated(true));
    } else {
      setIsTokenValidated(true); // in case there is no token
    }
  }, []);

  if (!isTokenValidated) return <p>loading</p>;
  console.log(auth);

  return auth ? (
    <Outlet />
  ) : (
    <Navigate exact to={`${process.env.PUBLIC_URL}/login`} />
  );
};

export default PrivateRoute;
