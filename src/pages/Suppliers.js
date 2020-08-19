import React, { useEffect } from "react";
import Level from "../components/Level";
import SuppliersTable from "../components/SuppliersTable";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { getAllSuppliers } from "../redux/actions/dataActions";
import { withFirebase } from "../components/Firebase";

const Suppliers = (props) => {
  const suppliers = useSelector((state) => state.data.suppliers);
  const userPermission = useSelector(
    (state) => state.user.credentials.permission
  );

  useEffect(() => {
    if (suppliers.length === 0) {
      store.dispatch(getAllSuppliers(props.firebase));
    }
  }, []);

  return (
    <div>
      {userPermission === 1 || (userPermission === 2 && <Level />)}

      <div className="columns is-centered">
        <div className="column">
          <h1 className="title has-text-centered">
            LISTA DE FORNECEDORES CADASTRADOS
          </h1>
          <SuppliersTable data={suppliers} />
        </div>
      </div>
    </div>
  );
};

export default withFirebase(Suppliers);
