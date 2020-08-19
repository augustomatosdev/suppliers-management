import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { withFirebase } from "../components/Firebase";
import AddAgreement from "../components/forms/AddAgreement";
import { getAllSuppliers } from "../redux/actions/dataActions";
import { getAllAgreements } from "../redux/actions/agreementsActions";
import { LOADING_DATA } from "../redux/types";

const NewAgreement = (props) => {
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
      store.dispatch(getAllSuppliers());
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
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setState({ ...state, loaded: progress });
      },
      (err) => {
        console.log(err);
      },
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((downloadURL) => {
            const NewAgreement = {
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
            return props.firebase.db.collection("agreements").add(NewAgreement);
          })
          .then((doc) => {
            store.dispatch(getAllAgreements(props.firebase));
            alert(`Acordo-quadro #${state.reference} adicionado com sucesso!`);
            props.history.push("/agreements");
          });
      }
    );
  };

  return (
    <div className="columns is-centered">
      <div className="column is-6">
        <h1 className="title has-text-centered">Cadastrar Acordo-Quadro</h1>
        <AddAgreement
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

export default withFirebase(NewAgreement);
