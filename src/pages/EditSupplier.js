import React, { useState, useEffect } from "react";
import AddSupplier from "../components/forms/AddSupplier";
import { useSelector } from "react-redux";
import store from "../redux/store";
import {
  postSupplier,
  getSupplier,
  updateSupplier,
} from "../redux/actions/dataActions";
import { withFirebase } from "../components/Firebase";
import UpdateSupplier from "../components/forms/UpdateSupplier";

const EditSupplier = (props) => {
  const supplier = useSelector((state) => state.data.supplier);
  const supplierId = props.match.params.supplierId;
  const [state, setState] = useState({});
  useEffect(() => {
    store.dispatch(getSupplier(props.firebase, supplierId, props.history));
    setState(supplier);
  }, []);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleAddress = (e) => {
    setState({
      ...state,
      address: { ...state.address, [e.target.name]: e.target.value },
    });
  };
  const handleContacts = (e) => {
    setState({
      ...state,
      contacts: { ...state.contacts, [e.target.name]: e.target.value },
    });
  };
  const handleManager = (e) => {
    setState({
      ...state,
      manager: { ...state.manager, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    store.dispatch(
      updateSupplier(props.firebase, supplierId, props.history, state)
    );
  };

  return (
    <div>
      <div className="columns is-centered">
        <div className="column is-8">
          <h1 className="title has-text-centered">Editar Fornecedor</h1>
          <UpdateSupplier
            state={state}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleAddress={handleAddress}
            handleContacts={handleContacts}
            handleManager={handleManager}
          />
        </div>
      </div>
    </div>
  );
};

export default withFirebase(EditSupplier);
