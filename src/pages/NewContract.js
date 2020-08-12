import React, { useEffect } from "react";
// import AddProduct from "../components/forms/AddProduct";
import { useSelector } from "react-redux";
import store from "../redux/store";
// import { postProduct_Service } from "../redux/actions/dataActions";
import { withFirebase } from "../components/Firebase";
import AddContract from "../components/forms/AddContract";
import { getAllSuppliers } from "../redux/actions/dataActions";

const NewContract = (props) => {
  const suppliers = useSelector((state) => state.data.suppliers);
  console.log(suppliers);
  useEffect(() => {
    if (suppliers.length === 0) {
      store.dispatch(getAllSuppliers());
    }
  }, []);
  //   const products = useSelector((state) => state.data.products);
  //   const [state, setState] = useState({
  //     type: "",
  //     name: "",
  //   });

  //   const handleChange = (e) => {
  //     setState({ ...state, [e.target.name]: e.target.value });
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     store.dispatch(postProduct_Service(props.firebase, state));
  //     setState({ type: "", name: "" });
  //   };

  return (
    <div className="columns is-centered">
      <div className="column is-6">
        <h1 className="title has-text-centered">Cadastrar Contrato</h1>
        <AddContract suppliers={suppliers} />
        {/* <AddProduct
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          state={state}
        /> */}
      </div>
    </div>
  );
};

export default withFirebase(NewContract);
