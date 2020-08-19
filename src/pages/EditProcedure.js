import React, { useState, useEffect } from "react";
import AddProcedure from "../components/forms/AddProcedure";
import { withFirebase } from "../components/Firebase";
import store from "../redux/store";
import {
  postProcedure,
  getProcedure,
  updateProcedure,
} from "../redux/actions/procedureActions";
import UpdateProcedure from "../components/forms/UpdateProcedure";
import { useSelector } from "react-redux";

const EditProcedure = (props) => {
  const procedure = useSelector((state) => state.data.procedure);
  const procedureId = props.match.params.procedureId;
  const [state, setState] = useState({});

  useEffect(() => {
    getProcedure(props.firebase, procedureId, props.history);
    setState(procedure);
  }, []);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    store.dispatch(
      updateProcedure(props.firebase, procedureId, props.history, state)
    );
  };

  return (
    <div>
      <div className="columns is-centered">
        <div className="column is-8">
          <h1 className="title has-text-centered">Actualizar Procedimento</h1>
          <UpdateProcedure
            state={state}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default withFirebase(EditProcedure);
