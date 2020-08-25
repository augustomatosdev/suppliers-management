import React, { useState, useEffect } from "react";
import ProductsLevel from "../components/ProductsLevel";
import ProductModal from "../components/modals/Product";
import { useSelector } from "react-redux";
import { withFirebase } from "../components/Firebase";
import {
  getLegislations,
  deleteLegislation,
} from "../redux/actions/dataActions";
import store from "../redux/store";
import Loading from "../components/Loading";

const Products = (props) => {
  const [state, setState] = useState({
    reference: "",
    description: "",
    date: "",
    search: null,
    selectedFile: null,
    loaded: 0,
    modal: false,
  });

  const loading = useSelector((state) => state.data.loading);

  const legislations = useSelector((state) => state.data.legislations).filter(
    (data) => {
      if (!state.search) return data;
      else if (
        data.reference.toLowerCase().includes(state.search.toLowerCase()) ||
        data.description.toLowerCase().includes(state.search.toLowerCase())
      ) {
        return data;
      }
    }
  );

  useEffect(() => {
    if (legislations.length === 0) {
      store.dispatch(getLegislations(props.firebase));
    }
  }, []);

  const openModal = () => {
    setState({ ...state, modal: true });
  };
  const closeModal = () => {
    setState({
      reference: "",
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

  const handleSearch = (e) => {
    setState({ ...state, search: e.target.value });
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
            const newLegislation = {
              reference: state.reference,
              description: state.description,
              date: state.date,

              link: downloadURL,
            };
            return props.firebase.db
              .collection("legislations")
              .add(newLegislation);
          })
          .then((doc) => {
            alert(`Legislação #${state.reference} adicionada com sucesso!`);
            closeModal();
            store.dispatch(getLegislations(props.firebase));
          });
      }
    );
  };

  return (
    <>
      <ProductsLevel openModal={openModal} handleSearch={handleSearch} />
      <ProductModal
        handleChange={handleChange}
        handleFile={handleFile}
        state={state}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
      />
      <div className="columns is-centered">
        <div className="column is-6">
          <h1 className="title has-text-centered">LEGISLAÇÃO</h1>
          {loading && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Loading />
            </div>
          )}

          {legislations.length > 0
            ? legislations.map((legis) => {
                return (
                  <div key={legis.legislationId}>
                    <div className="card">
                      <div className="card-content">
                        <div className="level is-mobile">
                          <div className="level-left">
                            <div>
                              <a
                                href={legis.link}
                                target="_blank"
                                className="subtitle has-text-danger has-text-weight-bold"
                              >
                                {legis.reference}
                              </a>
                            </div>
                          </div>
                          <div className="level-right">
                            <div className="level-item">
                              <span
                                style={{ cursor: "pointer" }}
                                className="icon is-small has-text-danger"
                                onClick={() =>
                                  store.dispatch(
                                    deleteLegislation(
                                      props.firebase,
                                      legis.legislationId
                                    )
                                  )
                                }
                              >
                                <i className="fas fa-trash"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                        <p>{legis.description}</p>
                        <p>
                          <strong>Data:</strong> {legis.date}
                        </p>
                      </div>
                    </div>
                    <br />
                  </div>
                );
              })
            : !loading && (
                <h1 className="has-text-danger">
                  A pesquisa nao encontrou resultados
                </h1>
              )}
        </div>
      </div>
    </>
  );
};

export default withFirebase(Products);
