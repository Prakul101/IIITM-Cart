import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login, auth, isAuthenticated } from "../auth";
import { Loading, Error, FormInputDiv } from "../Commons";
import Base from "../core/Base";

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const { email, password } = values;

  const [status, setStatus] = useState({
    error: "",
    loading: false,
    success: false,
  });
  const { error, loading, success } = status;
  const { user } = isAuthenticated();

  const handleChange = (field) => (event) =>
    setValues({ ...values, [field]: event.target.value });

  const onSubmit = (event) => {
    event.preventDefault();
    setStatus({ ...status, error: false, loading: true });

    login({ email, password })
      .then((data) => {
        if (data.error)
          setStatus({ ...status, error: data.error.trim(), loading: false });
        else {
          auth(data, () =>
            setStatus({ ...status, success: true, error: false })
          );
        }
      })
      .catch(() => console.log("Log-in Error"));
  };

  const redirect = () => {
    if (success) {
      const url = user.role === 0 ? "/user/dashboard" : "/admin/dashboard";
      return <Redirect to={url} />;
    }
  };

  return (
    <Base title="Login" className="py-4">
      <div className="row">
        <div className="col-md-6 offset-sm-3">
          <form>
            <FormInputDiv
              id="email"
              val={email}
              type="email"
              focus={true}
              onChange={handleChange("email")}
              text="E-Mail ID"
            />

            <FormInputDiv
              id="pass"
              val={password}
              type="password"
              onChange={handleChange("password")}
              text="Password"
            />

            <button className="btn btn-success btn-block" onClick={onSubmit}>
              Submit
            </button>
          </form>
          <div className="mx-2 mt-5">
            <Loading loading={loading} />
            <Error error={error} />
          </div>
        </div>
      </div>
      {redirect()}
    </Base>
  );
};

export default Login;
