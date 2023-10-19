import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [auth, setAuth] = useState(false);
  const [isTokenValidated, setIsTokenValidated] = useState(false);

  useEffect(() => {
    // send jwt to API to see if it's valid
    let token = localStorage.getItem("access-token");
    // let token = document.cookie
    //   ?.split(";")
    //   ?.find((cookie) => cookie?.includes("token"))
    //   ?.split("=")[1];
    let email = localStorage.getItem("email");
    const vercel = "http://localhost:5000/";
    // const vercel = "https://dashboard-hrm-system-backend.vercel.app/";
    if (token && email) {
      fetch(`${vercel}auth/verify`, {
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
          // console.log(json);

          if (json.body.decoded.email === email) {
            setAuth(true);
          }
        })
        .catch((err) => {
          setAuth(false);
          // console.log(err);
          // localStorage.removeItem("access-token");
          localStorage.removeItem("id");
          localStorage.removeItem("email");
        })
        .then(() => setIsTokenValidated(true));
    } else {
      setIsTokenValidated(true); // in case there is no token
    }
  }, []);

  if (!isTokenValidated) return <p>loading</p>;
  // console.log(auth);

  return auth ? (
    <Outlet />
  ) : (
    <Navigate exact to={`${process.env.PUBLIC_URL}/login`} />
  );
};

export default PrivateRoute;
