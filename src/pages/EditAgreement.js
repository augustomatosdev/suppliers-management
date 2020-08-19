import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { withFirebase } from "../components/Firebase";
import AddAgreement from "../components/forms/AddAgreement";
import { getAllSuppliers } from "../redux/actions/dataActions";
import {
  getAllAgreements,
  getAgreement,
  updateAgreement,
} from "../redux/actions/agreementsActions";
import { LOADING_DATA } from "../redux/types";
import UpdateAgreement from "../components/forms/UpdateAgreement";

const EditAgreement = (props) => {
  const suppliers = useSelector((state) => state.data.suppliers);
  const agreement = useSelector((state) => state.data.agreement);
  const agreementId = props.match.params.agreementId;
  const [state, setState] = useState({});
  useEffect(() => {
    if (suppliers.length === 0) {
      store.dispatch(getAllSuppliers());
    }
    store.dispatch(getAgreement(props.firebase, agreementId, props.history));
    setState(agreement);
  }, []);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    setState({
      ...state,
      selectedFile: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    store.dispatch(
      updateAgreement(props.firebase, agreementId, props.history, state)
    );
  };

  return (
    <div className="columns is-centered">
      <div className="column is-6">
        <h1 className="title has-text-centered">Editar Contrato</h1>
        <UpdateAgreement
          state={state}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          suppliers={suppliers}
          agreementId={agreementId}
        />
      </div>
    </div>
  );
};

export default withFirebase(EditAgreement);
