import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "../redux/store";
import {
  getProcedureDocuments,
  getProcedure,
} from "../redux/actions/procedureActions";
import { withFirebase } from "../components/Firebase";
import { Link } from "react-router-dom";
import ProcedureModal from "../components/modals/Procedure";

const Procedure = (props) => {
  const procedure = useSelector((state) => state.data.procedure);
  const documents = useSelector((state) => state.data.documents);
  const procedureId = props.match.params.procedureId;
  const [state, setState] = useState({
    description: "",
    date: "",
    selectedFile: null,
    loaded: 0,
    modal: false,
  });
  useEffect(() => {
    store.dispatch(getProcedure(props.firebase, procedureId, props.history));
    store.dispatch(
      getProcedureDocuments(props.firebase, procedureId, props.history)
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
              procedureId,
              link: downloadURL,
            };
            return props.firebase.db.collection("documents").add(newDocument);
          })
          .then((doc) => {
            alert(`Documento #${state.description} adicionado com sucesso!`);
            closeModal();
            store.dispatch(
              getProcedureDocuments(props.firebase, procedureId, props.history)
            );
          });
      }
    );
  };
  return (
    <>
      <ProcedureModal
        handleChange={handleChange}
        handleFile={handleFile}
        state={state}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
      />
      <div className="columns is-centered">
        <div className="column is-8">
          <h1 className="is-title  is-size-2 has-text-link">
            {procedure.objective}
          </h1>
          <p className="is-size-5">
            <strong>Nº/Ref: </strong>
            {procedure.reference}
          </p>
          <p className="is-size-5">
            <strong>Despacho: </strong>
            {procedure.description}
          </p>
          <p className="is-size-5">
            <strong>Data: </strong>
            {procedure.date}
          </p>
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
export default withFirebase(Procedure);
