import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth";
import { Error, FormInputDiv, Success } from "../Commons";
import Base from "../core/Base";
import { updateUser } from "./helper/UserAPI";

const Profile = () => {
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [status, setStatus] = useState({ error: false, success: false });
  const { firstName, lastName } = name;
  const { error, success } = status;

  const { user, token } = isAuthenticated();

  useEffect(() => {
    setName({ firstName: user.firstName, lastName: user.lastName });
  }, []);

  const handleChange = (field) => (event) =>
    setName({ ...name, [field]: event.target.value });

  const onSubmit = (event) => {
    event.preventDefault();
    setStatus({ error: false, success: false });
    updateUser(user._id, token, name).then((data) => {
      if (data.error) setStatus({ error: data.error.trim(), success: false });
      else setStatus({ error: false, success: true });
    });
  };

  return (
    <Base className="py-4 container">
      <div className="row">
        <div className="col-md-8 offset-md-2 py-4">
          <h3 className="text-white mb-5 text-center">User Dashboard Page</h3>
          <form>
            <div className="form-floating">
              <input
                id="email"
                type="email"
                className="form-control mb-3"
                value={user.email}
                readOnly
              />
              <label htmlFor="email">E-Mail ID</label>
            </div>
            <FormInputDiv
              id="firstName"
              val={firstName}
              onChange={handleChange("firstName")}
              text="First Name"
            />
            <FormInputDiv
              id="lastName"
              val={lastName}
              onChange={handleChange("lastName")}
              text="Last Name"
            />
            <button
              className="btn btn-outline-info"
              onClick={onSubmit}
              type="submit">
              Update
            </button>
          </form>
          <div className="mx-2 mt-5">
            <Error error={error} />
            <Success success={success} text={"Profile updated"} />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Profile;
