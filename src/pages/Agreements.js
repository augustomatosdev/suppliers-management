import React, { useEffect } from "react";
import AgreementsTable from "../components/AgreementsTable";
import AgreementsLevel from "../components/AgreementsLevel";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { getAllAgreements } from "../redux/actions/agreementsActions";
import { getAllSuppliers } from "../redux/actions/dataActions";
import { withFirebase } from "../components/Firebase";

const Agreements = (props) => {
  const agreements = useSelector((state) => state.data.agreements);
  const suppliers = useSelector((state) => state.data.suppliers);
  const userPermission = useSelector(
    (state) => state.user.credentials.permission
  );

  useEffect(() => {
    if (agreements.length === 0) {
      store.dispatch(getAllAgreements(props.firebase));
    }
    if (suppliers.length === 0) {
      store.dispatch(getAllSuppliers(props.firebase));
    }
  }, []);

  const data = agreements.map((agreement) => {
    const supplierName = suppliers.filter(
      (supplier) => supplier.supplierId === agreement.supplier
    );
    return { ...agreement, supplierName: supplierName[0].name };
  });
  return (
    <div>
      {userPermission === 1 || (userPermission === 2 && <AgreementsLevel />)}
      <div className="columns is-centered">
        <div className="column">
          <h1 className="title has-text-centered">LISTA DE ACORDOS-QUADROS</h1>
          <AgreementsTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default withFirebase(Agreements);
