import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { withFirebase } from "../components/Firebase";
import AddContract from "../components/forms/AddContract";
import { getAllSuppliers } from "../redux/actions/dataActions";
import { getAllContracts } from "../redux/actions/contractsActions";
import { LOADING_DATA, SET_ERRORS, STOP_LOADING_DATA } from "../redux/types";

const NewContract = (props) => {
  const suppliers = useSelector((state) => state.data.suppliers);
  const [state, setState] = useState({
    reference: "",
    supplier: "",
    price: "",
    date: "",
    status: "",
    objective: "",
    obs: "",
    link: null,
    selectedFile: null,
    loaded: 0,
  });
  useEffect(() => {
    if (suppliers.length === 0) {
      store.dispatch(getAllSuppliers(props.firebase));
    }
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
    store.dispatch({ type: LOADING_DATA });

    props.firebase.db
      .collection("contracts")
      .where("reference", "==", state.reference)
      .limit(1)
      .get()
      .then((data) => {
        if (data.empty) {
          const file = state.selectedFile;

          const imageExtension = file.name.split(".")[
            file.name.split(".").length - 1
          ];
          const imageFileName = `${Math.round(
            Math.random() * 1000000000000
          ).toString()}.${imageExtension}`;

          var metadata = {
            contentType: "application/pdf",
          };
          const uploadTask = props.firebase.storage
            .ref(`/documents/${imageFileName}`)
            .put(file, metadata);
          uploadTask.on(
            props.firebase.storageBase.TaskEvent.STATE_CHANGED,
            (snapshot) => {
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setState({ ...state, loaded: progress });
            },
            (err) => {
              console.log(err);
            },
            () => {
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then((downloadURL) => {
                  const newContract = {
                    reference: state.reference,
                    supplier: state.supplier,
                    price: state.price,
                    date: state.date,
                    status: state.status,
                    objective: state.objective,
                    paid: 0,
                    toPay: state.price,
                    obs: state.obs,
                    link: downloadURL,
                  };
                  return props.firebase.db
                    .collection("contracts")
                    .add(newContract);
                })
                .then((doc) => {
                  store.dispatch(getAllContracts(props.firebase));
                  alert(`Contrato #${state.reference} adicionado com sucesso!`);
                  props.history.push("/contracts");
                });
            }
          );
        } else {
          store.dispatch({
            type: SET_ERRORS,
            payload: {
              contract:
                "Este contrato ja foi cadastrado! Verifique e tente novamente.",
            },
          });
          return store.dispatch({ type: STOP_LOADING_DATA });
        }
      });
  };

  return (
    <div className="columns is-centered">
      <div className="column is-6">
        <h1 className="title has-text-centered">Cadastrar Contrato</h1>
        <AddContract
          state={state}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          suppliers={suppliers}
          handleFile={handleFile}
        />
      </div>
    </div>
  );
};

export default withFirebase(NewContract);
