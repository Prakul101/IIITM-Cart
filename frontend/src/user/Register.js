import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { register } from "../auth";
import { Success, Error, FormInputDiv } from "../Commons";
import Base from "../core/Base";

const Register = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { firstName, lastName, email, password } = values;

  const [status, setStatus] = useState({ error: false, success: false });
  const { error, success } = status;

  const handleChange = (field) => (event) =>
    setValues({ ...values, [field]: event.target.value });

  const onSubmit = (event) => {
    event.preventDefault();
    register({ firstName, lastName, email, password })
      .then((data) => {
        if (data.error) setStatus({ error: data.error.trim(), success: false });
        else {
          setValues({ firstName: "", lastName: "", email: "", password: "" });
          setStatus({ error: false, success: true });
          setTimeout(() => history.push("/login"), 1500);
        }
      })
      .catch(() => console.log("Error in registration"));
  };

  return (
    <Base className="py-4">
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <FormInputDiv
              id="firstName"
              val={firstName}
              focus={true}
              onChange={handleChange("firstName")}
              text="First Name"
            />
            <FormInputDiv
              id="lastName"
              val={lastName}
              onChange={handleChange("lastName")}
              text="Last Name"
            />
            <FormInputDiv
              id="email"
              val={email}
              type="email"
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
            <Success
              success={success}
              text="Registered"
              extraText="Redirecting to Login..."
            />
            <Error error={error} />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Register;
