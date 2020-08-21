import React, { useEffect } from "react";
import Level from "../components/Level";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { withFirebase } from "../components/Firebase";
import ProceduresTable from "../components/ProceduresTable";
import ProceduresLevel from "../components/ProceduresLevel";
import { getAllProcedures } from "../redux/actions/procedureActions";
// import { getAllSuppliers } from "../redux/actions/dataActions";

const Procedures = (props) => {
  const procedures = useSelector((state) => state.data.procedures);
  const userPermission = useSelector(
    (state) => state.user.credentials.permission
  );

  useEffect(() => {
    if (procedures.length === 0) {
      store.dispatch(getAllProcedures(props.firebase));
    }
  }, []);

  return (
    <div>
      {userPermission === 1 || userPermission === 2 ? (
        <ProceduresLevel />
      ) : (
        <></>
      )}

      <div className="columns is-centered">
        <div className="column">
          <h1 className="title has-text-centered">LISTA DE PROCEDIMENTOS</h1>
          <ProceduresTable data={procedures} />
        </div>
      </div>
    </div>
  );
};

export default withFirebase(Procedures);
