import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth";
import { getCategory, updateCategory } from "./helper/AdminAPI";
import { Error, FormInputDiv, Success } from "../Commons";
import { useHistory } from "react-router";

const UpdateCategory = ({ match }) => {
  const history = useHistory();
  const [status, setStatus] = useState({
    error: false,
    loading: false,
    success: false,
  });
  const [name, setName] = useState("");

  const { error, loading, success } = status;
  const { user, token } = isAuthenticated();
  const catID = match.params.catID;

  useEffect(() => {
    getCategory(catID).then((data) => {
      if (data.error) setStatus({ ...status, error: data.error.trim() });
      else setName(data.name);
    });
  }, []);

  useEffect(() => {
    if (loading)
      updateCategory(user._id, catID, token, { name }).then((data) => {
        if (data.error)
          setStatus({ ...status, error: data.error.trim(), loading: false });
        else {
          setStatus({ ...status, loading: false, success: true });
          setTimeout(() => history.push("/admin/categories"), 1200);
        }
      });
  }, [loading]);

  const onSubmit = (event) => {
    event.preventDefault();
    setStatus({ ...status, error: false, loading: true });
  };

  return (
    <Base className="container py-4">
      <div className="row bg-dark rounded">
        <div className="col-md-8 offset-md-2 py-4">
          <form>
            <FormInputDiv
              id="name"
              val={name}
              focus={true}
              onChange={(event) => setName(event.target.value)}
              text="Collection Name"
            />
            <button
              type="submit"
              onClick={onSubmit}
              className="btn btn-outline-info">
              Update
            </button>
          </form>
          <div className="mx-2">
            <Success
              success={success}
              text="Collection updated"
              extraText="Redirecting back to manage collections page..."
            />
            <Error error={error} />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
