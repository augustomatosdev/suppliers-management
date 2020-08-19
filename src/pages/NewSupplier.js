import React, { useState } from "react";
import AddSupplier from "../components/forms/AddSupplier";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { postSupplier } from "../redux/actions/dataActions";
import { withFirebase } from "../components/Firebase";

const NewSupplier = (props) => {
  const suppliers = useSelector((state) => state.data.suppliers);
  const [state, setState] = useState({
    name: "",
    nif: "",
    address: {
      street: "",
      municipalty: "",
      province: "",
    },
    contacts: {
      phone1: "",
      phone2: "",
      email: "",
    },
    startDate: "",
    // obs: "",
    manager: {
      fullName: "",
      phone: "",
      idCard: "",
    },
    type: "",
    description: "",
  });

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
    store.dispatch(postSupplier(props.firebase, state, props.history));
  };

  return (
    <div>
      <div className="columns is-centered">
        <div className="column is-8">
          <h1 className="title has-text-centered">Cadastrar Fornecedor</h1>
          <AddSupplier
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

export default withFirebase(NewSupplier);
