import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth";
import { createProduct, getAllCategories } from "./helper/AdminAPI";
import { Error, FormInputDiv, Success } from "../Commons";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    image: "",
  });
  const { name, description, price, category, quantity, image } = values;

  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState({
    error: false,
    loading: false,
    success: false,
  });
  const { error, loading, success } = status;

  const [formData, setFormData] = useState(new FormData());
  const { user, token } = isAuthenticated();

  useEffect(() => {
    getAllCategories().then((data) => {
      if (data.error) setStatus({ ...status, error: data.error.trim() });
      else {
        setValues({ ...values, category: data[0]._id });
        formData.set("category", data[0]._id);
        setCategories(data);
      }
    });
  }, []);

  useEffect(() => {
    if (loading) {
      createProduct(user._id, token, formData).then((data) => {
        if (data.error)
          setStatus({ ...status, error: data.error.trim(), loading: false });
        else {
          setValues({
            name: "",
            description: "",
            price: "",
            category: "",
            quantity: "",
            image: "",
          });
          setFormData(new FormData());
          setStatus({ error: false, loading: false, success: true });
        }
      });
    }
  }, [loading]);

  const handleChange = (name) => (event) => {
    const val = name === "image" ? event.target.files[0] : event.target.value;
    formData.set(name, val);
    setValues({ ...values, [name]: val });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setStatus({ error: false, loading: true, success: false });
  };

  const prodForm = () => (
    <form>
      <FormInputDiv
        id="name"
        val={name}
        focus={true}
        onChange={handleChange("name")}
        text="Name"
      />
      <FormInputDiv
        id="desc"
        val={description}
        onChange={handleChange("description")}
        text="Description"
      />
      <FormInputDiv
        id="price"
        val={price}
        type="number"
        onChange={handleChange("price")}
        text="Price"
      />
      <div className="form-floating mb-3">
        <select
          onChange={handleChange("category")}
          className="form-select"
          id="cat"
          required>
          {categories &&
            categories.map((cat, id) => (
              <option key={id} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
        <label htmlFor="cat">Collection</label>
      </div>
      <FormInputDiv
        id="quantity"
        val={quantity}
        type="number"
        onChange={handleChange("quantity")}
        text="Quantity"
      />
      <input
        onChange={handleChange("image")}
        type="file"
        accept="image/*"
        className="form-control mb-3"
        id="image"
      />
      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success">
        Create Product
      </button>
    </form>
  );

  return (
    <Base className="container">
      <div className="row py-4 bg-dark rounded">
        <div className="col-md-8 offset-md-2">
          {prodForm()}
          <div className="mt-5 mx-2">
            <Success success={success} text={"Product created"} />
            <Error error={error} />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
