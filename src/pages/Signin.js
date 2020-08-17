import React, { useState } from "react";
import SigninForm from "../components/SigninForm";
import store from "../redux/store";
import { loginUser } from "../redux/actions/userActions";
import { withFirebase } from "../components/Firebase";
import { useSelector } from "react-redux";

const Signin = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    errors: {},
  });
  const loading = useSelector((state) => state.UI.loading);

  // if (loading)
  //   return (
  //     <div
  //       style={{
  //         minHeight: "100vh",
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     >

  //     </div>
  //   );

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: state.email,
      password: state.password,
    };
    store.dispatch(loginUser(user, props.history, props.firebase));
  };

  return (
    <div>
      <SigninForm
        state={state}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default withFirebase(Signin);
