import React, { useState } from "react";
import AddProduct from "../components/forms/AddProduct";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { postProduct_Service } from "../redux/actions/dataActions";
import { withFirebase } from "../components/Firebase";

const NewProduct = (props) => {
  const products = useSelector((state) => state.data.products);
  const [state, setState] = useState({
    type: "",
    name: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    store.dispatch(postProduct_Service(props.firebase, state));
    setState({ type: "", name: "" });
  };

  console.log(products);
  return (
    <div className="columns is-centered">
      <div className="column is-6">
        <h1 className="title has-text-centered">Cadastrar Produto/Serviço</h1>
        <AddProduct
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          state={state}
        />
      </div>
    </div>
  );
};

export default withFirebase(NewProduct);
