import React, { useState } from "react";
import SigninForm from "../components/SigninForm";

const Signin = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    errors: {},
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };

  console.log(state);

  return (
    <div>
      <SigninForm
        state={state}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Signin;
