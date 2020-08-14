import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "../redux/store";
import {
  getSupplierDocuments,
  getSupplier,
} from "../redux/actions/dataActions";
import { withFirebase } from "../components/Firebase";
import { Link } from "react-router-dom";
import SupplierModal from "../components/modals/Supplier";

const Supplier = (props) => {
  const supplier = useSelector((state) => state.data.supplier);
  const documents = useSelector((state) => state.data.documents);
  const supplierId = props.match.params.supplierId;
  const [state, setState] = useState({
    description: "",
    date: "",
    selectedFile: null,
    loaded: 0,
    modal: false,
  });
  useEffect(() => {
    store.dispatch(getSupplier(props.firebase, supplierId, props.history));
    store.dispatch(
      getSupplierDocuments(props.firebase, supplierId, props.history)
    );
  }, []);

  const openModal = () => {
    setState({ ...state, modal: true });
  };
  const closeModal = () => {
    setState({
      description: "",
      date: "",
      selectedFile: null,
      loaded: 0,
      modal: false,
    });
  };
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
            const newDocument = {
              description: state.description,
              date: state.date,
              supplierId,
              link: downloadURL,
            };
            return props.firebase.db.collection("documents").add(newDocument);
          })
          .then((doc) => {
            alert(`Documento #${state.description} adicionado com sucesso!`);
            closeModal();
            store.dispatch(
              getSupplierDocuments(props.firebase, supplierId, props.history)
            );
          });
      }
    );
  };
  return (
    <>
      <SupplierModal
        handleChange={handleChange}
        handleFile={handleFile}
        state={state}
        supplier={supplier}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
      />
      <div className="columns is-centered">
        <div className="column is-8">
          <h1 className="is-title  is-size-2 has-text-link">{supplier.name}</h1>
          <p className="is-size-5">
            <strong>Produto/Serviço: </strong>
            {supplier.description}
          </p>
          <p className="is-size-5">
            <strong>NIF: </strong>
            {supplier.nif}
          </p>
          <p className="is-size-5">
            <strong>Endereço: </strong>
            {supplier.address &&
              (supplier.address.street,
              supplier.address.municipalty,
              supplier.address.province)}
          </p>
          {supplier.contacts && (
            <>
              <p className="is-size-5">
                <strong>Contactos: </strong>
                {supplier.contacts.phone1}, {supplier.contacts.phone2}
              </p>
              <p className="is-size-5">
                <strong>Email: </strong>
                {supplier.contacts.email}
              </p>{" "}
            </>
          )}
          <p className="is-size-5">
            <strong>Inicio de vinculo: </strong>
            {supplier.date}
          </p>
          {supplier.manager && (
            <>
              {" "}
              <p className="is-size-5">
                <strong>Responsável: </strong>
                {supplier.manager.fullName}
              </p>
              <p className="is-size-5">
                <strong>B.I/Responsável: </strong>
                {supplier.manager.idCard}
              </p>{" "}
            </>
          )}
          <br />
          <div className="is-grouped">
            <Link
              to={`/contracts/supplier/${supplierId}`}
              className="button is-success"
            >
              Ver contratos
            </Link>
          </div>
          <br />
          <br />
          <article class="message">
            <div class="message-header">
              <p>Documentos </p>
              <button onClick={openModal} class="button is-small">
                <span class="icon is-small">
                  <i class="fas fa-plus"></i>
                </span>
                <span>Adicionar</span>
              </button>
            </div>
            <div class="message-body">
              {documents.length > 0 ? (
                documents.map((document) => (
                  <div className="level">
                    <a
                      href={document.link}
                      target="_blank"
                      className="has-text-link"
                    >
                      <span class="icon is-small">
                        <i class="fas fa-2x fa-file-alt"></i>
                      </span>
                    </a>
                    <p>{`${document.description}`}</p>
                    <p>
                      {document.date}{" "}
                      <span class="icon is-small has-text-danger">
                        <i class="fas fa-trash"></i>
                      </span>
                    </p>
                  </div>
                ))
              ) : (
                <p className="has-text-danger">
                  Não existem documentos para este fornecedor!
                </p>
              )}
            </div>
          </article>
        </div>
      </div>
    </>
  );
};
export default withFirebase(Supplier);
