import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth";
import { getAllCategories, getProduct, updateProduct } from "./helper/AdminAPI";
import { Error, Success, FormInputDiv } from "../Commons";
import { useHistory } from "react-router";

const UpdateProduct = ({ match }) => {
  const history = useHistory();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    image: "",
  });
  const { name, description, price, category, quantity, image } = values;

  const [status, setStatus] = useState({
    error: false,
    loading: false,
    success: false,
  });
  const { error, loading, success } = status;

  const [formData, setFormData] = useState(new FormData());
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();
  const prodID = match.params.prodID;

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        if (data.error) setStatus({ ...status, error: data.error.trim() });
        else setCategories(data);
      })
      .then(
        getProduct(prodID).then((data) => {
          if (data.error) setStatus({ ...status, error: data.error.trim() });
          else {
            setValues({
              ...values,
              name: data.name,
              description: data.description,
              price: data.price,
              category: data.category._id,
              quantity: data.quantity,
            });
            formData.set("name", data.name);
            formData.set("description", data.description);
            formData.set("price", data.price);
            formData.set("category", data.category._id);
            formData.set("quantity", data.quantity);
          }
        })
      );
  }, []);

  useEffect(() => {
    if (loading)
      updateProduct(user._id, prodID, token, formData).then((data) => {
        if (data.error)
          setStatus({ ...status, error: data.error.trim(), loading: false });
        else {
          setStatus({ error: false, loading: false, success: true });
          setTimeout(() => history.push("/admin/products"), 1200);
        }
      });
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

  const updateProductForm = () => (
    <form>
      <FormInputDiv
        id="name"
        val={name}
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
          value={category}
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
      <button type="submit" onClick={onSubmit} className="btn btn-outline-info">
        Update Product
      </button>
    </form>
  );

  return (
    <Base className="container">
      <div className="row py-4 bg-dark rounded">
        <div className="col-md-8 offset-md-2">
          {updateProductForm()}
          <div className="mt-5 mx-2">
            <Success success={success} text={"Product updated"} />
            <Error error={error} />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
