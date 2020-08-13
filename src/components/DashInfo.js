import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { withFirebase } from "./Firebase";
import { getAllSuppliers } from "../redux/actions/dataActions";
import { getAllContracts } from "../redux/actions/contractsActions";
import store from "../redux/store";
import { Link } from "react-router-dom";

const DashInfo = (props) => {
  const suppliers = useSelector((state) => state.data.suppliers);
  const contracts = useSelector((state) => state.data.contracts);
  useEffect(() => {
    if (suppliers.length === 0) {
      store.dispatch(getAllSuppliers(props.firebase));
    }
    if (contracts.length === 0) {
      store.dispatch(getAllContracts(props.firebase));
    }
  }, []);
  return (
    <>
      <div className="columns is-multiline">
        <div className="column">
          <div className="box notification is-link">
            <div className="heading">Fornecedores</div>
            <div className="title">{suppliers.length}</div>
            <div className="level">
              <div className="level-item">
                <div>
                  <Link
                    to="/suppliers"
                    className="heading has-text-weight-bold"
                  >
                    Ver todos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="box notification is-warning">
            <div className="heading">Contratos</div>
            <div className="title">{contracts.length}</div>
            <div className="level">
              <div className="level-item">
                <div>
                  <Link
                    to="/contracts"
                    className="heading has-text-weight-bold"
                  >
                    Ver todos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withFirebase(DashInfo);
