import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "../redux/store";
import {
  getAgreement,
  getAgreementBills,
  deleteAgreement,
} from "../redux/actions/agreementsActions";
import { withFirebase } from "../components/Firebase";
import { Link } from "react-router-dom";
import AgreementModal from "../components/modals/Agreement";
import Loading from "../components/Loading";
import { LOADING_DATA } from "../redux/types";

const Agreement = (props) => {
  const agreement = useSelector((state) => state.data.agreement);
  const agreementId = props.match.params.agreementId;
  const bills = useSelector((state) => state.data.bills);
  const loading = useSelector((state) => state.UI.loading);
  const userPermission = useSelector(
    (state) => state.user.credentials.permission
  );
  const [state, setState] = useState({
    description: "",
    price: "",
    date: "",
    link: null,
    selectedFile: null,
    loaded: 0,
    modal: false,
  });
  useEffect(() => {
    store.dispatch(getAgreement(props.firebase, agreementId, props.history));
    store.dispatch(
      getAgreementBills(props.firebase, agreementId, props.history)
    );
  }, []);

  const openModal = () => {
    setState({ ...state, modal: true });
  };
  const closeModal = () => {
    setState({
      description: "",
      price: "",
      date: "",
      link: null,
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
      .ref(`/bills/${imageFileName}`)
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
            const newBill = {
              description: state.description,
              price: state.price,
              date: state.date,
              agreementId,
              link: downloadURL,
            };
            return props.firebase.db.collection("bills").add(newBill);
          })
          .then((doc) => {
            return props.firebase.db.doc(`/agreements/${agreementId}`).update({
              toPay: Number(agreement.toPay) - Number(state.price),
              paid: Number(agreement.paid) + Number(state.price),
            });
          })
          .then(() => {
            alert(`Factura #${state.description} adicionado com sucesso!`);
            closeModal();
            store.dispatch(
              getAgreement(props.firebase, agreementId, props.history)
            );
            store.dispatch(
              getAgreementBills(props.firebase, agreementId, props.history)
            );
          });
      }
    );
  };

  return (
    <div>
      <AgreementModal
        handleChange={handleChange}
        handleFile={handleFile}
        state={state}
        agreement={agreement}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
      />
      {userPermission === 1 && (
        <div className="level">
          <div className="level-left"></div>
          <div className="level-right">
            <div className="level-item">
              <Link
                to={`/agreements/edit/${agreementId}`}
                style={{ cursor: "pointer" }}
                className="icon is-small has-text-warning"
              >
                <i className="fas fa-lg fa-edit"></i>
              </Link>
            </div>
            <div className="level-item"></div>
            <div className="level-item">
              <span
                style={{ cursor: "pointer" }}
                className="icon is-small has-text-danger"
                onClick={() => {
                  store.dispatch(
                    deleteAgreement(props.firebase, agreementId, props.history)
                  );
                }}
              >
                <i className="fas fa-lg fa-trash"></i>
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="columns is-centered">
        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loading />
          </div>
        ) : (
          <div className="column is-8">
            <h1 className="is-title  is-size-3 has-text-link">
              {agreement.objective}
            </h1>
            <p className="is-size-5">
              <strong>Número/Ref.: </strong>
              {agreement.reference}
            </p>
            <p className="is-size-5">
              <strong>Data de realização: </strong>
              {agreement.date}
            </p>
            <p className="is-size-5">
              <strong>Observações: </strong>
              {agreement.obs}
            </p>
            <p className="is-size-5">
              <strong>Valor do contrato: </strong>
              {agreement.price && `Akz: ${agreement.price},00`}
            </p>
            <p className="is-size-5">
              <strong>Valor pago: </strong>
              {`Akz: ${agreement.paid},00`}
            </p>
            <p className="is-size-5">
              <strong>Valor por pagar: </strong>
              {`Akz: ${agreement.toPay},00`}
            </p>
            <p className="is-size-5">
              <strong>Estado: </strong>
              {agreement.status === "active" ? "Activo" : "Terminado"}
            </p>
            <br />
            <div className="is-grouped">
              <a
                href={agreement.link}
                target="_blank"
                className="button is-link"
              >
                Baixar cópia
              </a>
              &nbsp; &nbsp;
              <Link
                to={`/suppliers/${agreement.supplier}`}
                className="button is-success"
              >
                Ver empresa
              </Link>
            </div>
            <br />
            <br />
            <article className="message">
              <div className="message-header">
                <p>Pagamentos </p>
                <button onClick={openModal} className="button is-small">
                  <span className="icon is-small">
                    <i className="fas fa-plus"></i>
                  </span>
                  <span>Adicionar</span>
                </button>
              </div>
              <div className="message-body">
                {bills.length > 0 ? (
                  bills.map((bill) => (
                    <div key={bill.billId} className="level">
                      <a
                        href={bill.link}
                        target="_blank"
                        className="has-text-link"
                      >
                        <span className="icon is-small">
                          <i className="fas fa-2x fa-file-alt"></i>
                        </span>
                      </a>
                      <p>{`${bill.description}`}</p>
                      <p>{bill.date} </p>
                    </div>
                  ))
                ) : (
                  <p className="has-text-danger">
                    Não existem pagamentos registados para este contrato!
                  </p>
                )}
              </div>
            </article>
          </div>
        )}
      </div>
    </div>
  );
};

export default withFirebase(Agreement);
