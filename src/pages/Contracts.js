import React, { useEffect } from "react";
import ContractsTable from "../components/ContractsTable";
import ContractsLevel from "../components/ContractsLevel";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { getAllContracts } from "../redux/actions/contractsActions";
import { getAllSuppliers } from "../redux/actions/dataActions";
import { withFirebase } from "../components/Firebase";

const Contracts = (props) => {
  const contracts = useSelector((state) => state.data.contracts);
  const suppliers = useSelector((state) => state.data.suppliers);
  const userPermission = useSelector(
    (state) => state.user.credentials.permission
  );

  useEffect(() => {
    if (contracts.length === 0) {
      store.dispatch(getAllContracts(props.firebase));
    }
    if (suppliers.length === 0) {
      store.dispatch(getAllSuppliers(props.firebase));
    }
  }, []);

  const data = contracts.map((contract) => {
    const supplierName = suppliers.filter(
      (supplier) => supplier.supplierId === contract.supplier
    );
    return { ...contract, supplierName: supplierName[0].name };
  });
  return (
    <div>
      {userPermission === 1 || (userPermission === 2 && <ContractsLevel />)}

      <div className="columns is-centered">
        <div className="column">
          <h1 className="title has-text-centered">LISTA DE CONTRATOS</h1>
          <ContractsTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default withFirebase(Contracts);
