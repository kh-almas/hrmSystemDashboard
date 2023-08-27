// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

const Login = () => {
  const [match, setMatch] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log("Error: ", errors);

  const onSubmit = (data) => {
    console.log("Value: ", data);
    console.log(data);
    axios
      .post("/auth/login", data)
      .then((res) => {
        const token = res.data.body.token;
        const id = res.data.body.id;
        const email = res.data.body.email;
        if (token && id && email) {
          localStorage.setItem("access-token", token);
          localStorage.setItem("id", id);
          localStorage.setItem("email", email);
          setMatch(true);
          navigate(`${process.env.PUBLIC_URL}/dashboard/default`);
        } else {
          setMatch(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setMatch(false);
      });
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="container-fluid p-0">
          {/* <!-- login page start--> */}
          <div className="authentication-main">
            <div className="row">
              <div className="col-md-12">
                <div className="auth-innerright">
                  <div className="authentication-box">
                    <div className="text-center">
                      {/* <img src={logo} alt="" /> */}
                    </div>
                    <div className="card mt-4">
                      <div className="card-body">
                        <div className="text-center">
                          <h4>{"LOGIN"}</h4>
                          <h6>{"Enter your Username and Password"} </h6>
                        </div>
                        <form
                          className="theme-form"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className="form-group">
                            <label className="col-form-label pt-0">
                              {"Your Email"}
                            </label>
                            <input
                              type="email"
                              placeholder="EMAIL"
                              className="form-control"
                              {...register("email", {
                                required: true,
                                pattern:
                                  /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/,
                              })}
                            />
                            {errors.email?.type === "required" && (
                              <small className="text-danger mt-1">
                                Please fill this field
                              </small>
                            )}
                            {errors.email?.type === "pattern" && (
                              <small className="text-danger mt-1">
                                Please enter a valid email
                              </small>
                            )}
                          </div>
                          <div className="form-group">
                            <label className="col-form-label">
                              {"Password"}
                            </label>
                            <input
                              type="password"
                              placeholder="PASSWORD"
                              {...register("password", {
                                required: true,
                                pattern: /^(?!(<[^>]?>)|(<script.?>)).*$/,
                              })}
                              className="form-control"
                            />
                            {errors.password?.type === "required" && (
                              <small className="text-danger mt-1">
                                Password is required
                              </small>
                            )}
                            {errors.password?.type === "pattern" && (
                              <small className="text-danger mt-1">
                                Password is not valid
                              </small>
                            )}
                            {!match && (
                              <small className="text-danger mt-1">
                                Email & Password does not match. Please try
                                again.
                              </small>
                            )}
                          </div>
                          <div className="form-group form-row mt-3 mb-0 d-grid">
                            <button className="btn btn-primary" type="submit">
                              {"Login"}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- login page end--> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
