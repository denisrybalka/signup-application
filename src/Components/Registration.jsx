import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Registration = () => {
  const history = useHistory();
  const [data, setData] = useState({
    fullname: "",
    username: "",
    password: "",
    email: "",
  });

  const [error, setError] = useState({ message: "" });

  const handleInputChange = (e) => {
    setData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const registered = {
      fullName: data.fullname,
      username: data.username,
      email: data.email,
      password: data.password,
    };

    await axios
      .post("http://localhost:4000/register", registered)
      .then(() => history.push("/login"))
      .catch(e => setError({ message: "Something went wrong!" }));
  };

  return (
    <div className="container">
      <form className="card" onSubmit={handleFormSubmit}>
        <h3 className="text-center">Register</h3>
        <p className="text-center" style={{ color: "#dc3545" }}>{error.message ? `${error.message}` : null}</p>
        <input
          name="fullname"
          placeholder="Full Name"
          onChange={handleInputChange}
          value={data.fullname}
          minLength={3}
          required
        />
        <input
          name="username"
          placeholder="Username"
          onChange={handleInputChange}
          value={data.username}
          minLength={3}
          required
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          value={data.email}
          minLength={3}
          required
        />
        <input
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
          value={data.password}
          minLength={3}
          required
        />
        <button className="btn btn-success" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Registration;
