import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { withFirebase } from "../components/Firebase";
import AddContract from "../components/forms/AddContract";
import { getAllSuppliers } from "../redux/actions/dataActions";
import {
  getAllContracts,
  getContract,
  updateContract,
} from "../redux/actions/contractsActions";
import { LOADING_DATA } from "../redux/types";
import UpdateContract from "../components/forms/UpdateContract";

const EditContract = (props) => {
  const suppliers = useSelector((state) => state.data.suppliers);
  const contract = useSelector((state) => state.data.contract);
  const contractId = props.match.params.contractId;
  const [state, setState] = useState({});
  useEffect(() => {
    if (suppliers.length === 0) {
      store.dispatch(getAllSuppliers());
    }
    store.dispatch(getContract(props.firebase, contractId, props.history));
    setState(contract);
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
      updateContract(props.firebase, contractId, props.history, state)
    );
  };

  return (
    <div className="columns is-centered">
      <div className="column is-6">
        <h1 className="title has-text-centered">Editar Contrato</h1>
        <UpdateContract
          state={state}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          suppliers={suppliers}
          contractId={contractId}
        />
      </div>
    </div>
  );
};

export default withFirebase(EditContract);
