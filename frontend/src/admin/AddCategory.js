import React, { useState } from "react";
import { isAuthenticated } from "../auth";
import Base from "../core/Base";
import { Error, Success, FormInputDiv } from "../Commons";
import { createCategory } from "./helper/AdminAPI";

const AddCategory = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
  });
  const { name, error, success } = values;
  const { user, token } = isAuthenticated();

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, success: false });

    createCategory(user._id, token, { name }).then((data) => {
      if (data.error)
        setValues({ ...values, success: false, error: data.error.trim() });
      else setValues({ name: "", error: false, success: true });
    });
  };

  return (
    <Base className="container py-4">
      <div className="row bg-dark rounded">
        <div className="col-md-8 offset-md-2 py-4">
          <form>
            <FormInputDiv
              id="catName"
              val={name}
              focus={true}
              onChange={(event) =>
                setValues({ ...values, error: false, name: event.target.value })
              }
              text="Collection Name"
            />
            <button
              className="btn btn-outline-info"
              onClick={onSubmit}
              type="submit">
              Create
            </button>
          </form>
          <div className="mx-2">
            <Error error={error} />
            <Success success={success} text={"Collection created"} />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
