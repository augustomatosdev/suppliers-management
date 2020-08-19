import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { withFirebase } from "./Firebase";
import { getAllSuppliers, getAllUsers } from "../redux/actions/dataActions";
import { getAllProcedures } from "../redux/actions/procedureActions";
import { getAllContracts } from "../redux/actions/contractsActions";
import store from "../redux/store";
import { Link } from "react-router-dom";

const DashInfo = (props) => {
  const suppliers = useSelector((state) => state.data.suppliers);
  const contracts = useSelector((state) => state.data.contracts);
  const procedures = useSelector((state) => state.data.procedures);
  const users = useSelector((state) => state.data.users);
  const userPermission = useSelector(
    (state) => state.user.credentials.permission
  );
  useEffect(() => {
    if (suppliers.length === 0) {
      store.dispatch(getAllSuppliers(props.firebase));
    }
    if (contracts.length === 0) {
      store.dispatch(getAllContracts(props.firebase));
    }
    if (procedures.length === 0) {
      store.dispatch(getAllProcedures(props.firebase));
    }
    if (procedures.length === 0) {
      store.dispatch(getAllUsers(props.firebase));
    }
  }, []);
  return (
    <>
      <div className="columns is-multiline">
        <div className="column">
          <div
            className="box notification"
            style={{ backgroundColor: "#F48C06", color: "white" }}
          >
            <div className="heading">Fornecedores</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="title">{suppliers.length}</div>
              <div className="title">
                <span className="icon">
                  <i className="fas fa-lg fa-briefcase"></i>
                </span>
              </div>
            </div>
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
          <div className="box notification is-primary">
            <div className="heading">Contratos</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="title">{contracts.length}</div>
              <div className="title">
                <span className="icon">
                  <i className="fas fa-lg fa-file-contract"></i>
                </span>
              </div>
            </div>
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
        <div className="column">
          <div
            className="box notification is-primary"
            style={{ backgroundColor: "#9D0208", color: "white" }}
          >
            <div className="heading">Procedimentos</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="title">{procedures.length}</div>
              <div className="title">
                <span className="icon">
                  <i className="fas fa-lg fa-tasks"></i>
                </span>
              </div>
            </div>
            <div className="level">
              <div className="level-item">
                <div>
                  <Link
                    to="/procedures"
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
          <div className="box notification is-success">
            <div className="heading">Usuários</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="title">{users.length}</div>
              <div className="title">
                <span className="icon">
                  <i className="fas fa-lg fa-users"></i>
                </span>
              </div>
            </div>
            <div className="level">
              <div className="level-item">
                {userPermission === 1 ? (
                  <div>
                    <Link to="/users" className="heading has-text-weight-bold">
                      Ver todos
                    </Link>
                  </div>
                ) : (
                  <p>&nbsp;</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withFirebase(DashInfo);
