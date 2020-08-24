import React, { useState, useEffect } from "react";
import AddProcedure from "../components/forms/AddProcedure";
import { withFirebase } from "../components/Firebase";
import store from "../redux/store";
import { postProcedure } from "../redux/actions/procedureActions";
import { useSelector } from "react-redux";

const NewProcedure = (props) => {
  const error = useSelector((state) => state.UI.errors);
  const [state, setState] = useState({
    reference: "",
    description: "",
    objective: "",
    type: "",
    date: "",
    error: {},
  });
  useEffect(() => {
    setState({
      ...state,
      error: error,
    });
  }, [error]);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    store.dispatch(postProcedure(props.firebase, state, props.history));
  };

  return (
    <div>
      <div className="columns is-centered">
        <div className="column is-8">
          <h1 className="title has-text-centered">Cadastrar Procedimento</h1>
          <AddProcedure
            state={state}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default withFirebase(NewProcedure);
