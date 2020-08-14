import React, { useState } from "react";
import AddProcedure from "../components/forms/AddProcedure";
import { withFirebase } from "../components/Firebase";
import store from "../redux/store";
import { postProcedure } from "../redux/actions/procedureActions";

const NewProcedure = (props) => {
  const [state, setState] = useState({
    reference: "",
    description: "",
    objective: "",
    type: "",
    date: "",
  });
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
