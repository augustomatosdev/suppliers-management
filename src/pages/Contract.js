import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "../redux/store";
import {
  getContract,
  getContractBills,
  deleteContract,
} from "../redux/actions/contractsActions";
import { withFirebase } from "../components/Firebase";
import { Link } from "react-router-dom";
import ContractModal from "../components/modals/Contract";
import Loading from "../components/Loading";
import { LOADING_DATA } from "../redux/types";

const Contract = (props) => {
  const contract = useSelector((state) => state.data.contract);
  const contractId = props.match.params.contractId;
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
    store.dispatch(getContract(props.firebase, contractId, props.history));
    store.dispatch(getContractBills(props.firebase, contractId, props.history));
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
              contractId,
              link: downloadURL,
            };
            return props.firebase.db.collection("bills").add(newBill);
          })
          .then((doc) => {
            return props.firebase.db.doc(`/contracts/${contractId}`).update({
              toPay: Number(contract.toPay) - Number(state.price),
              paid: Number(contract.paid) + Number(state.price),
            });
          })
          .then(() => {
            alert(`Factura #${state.description} adicionado com sucesso!`);
            closeModal();
            store.dispatch(
              getContract(props.firebase, contractId, props.history)
            );
            store.dispatch(
              getContractBills(props.firebase, contractId, props.history)
            );
          });
      }
    );
  };

  return (
    <div>
      <ContractModal
        handleChange={handleChange}
        handleFile={handleFile}
        state={state}
        contract={contract}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
      />
      {userPermission === 1 && (
        <div className="level">
          <div className="level-left"></div>
          <div className="level-right">
            <div className="level-item">
              <Link
                to={`/contracts/edit/${contractId}`}
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
                    deleteContract(props.firebase, contractId, props.history)
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
              {contract.objective}
            </h1>
            <p className="is-size-5">
              <strong>Número/Ref.: </strong>
              {contract.reference}
            </p>
            <p className="is-size-5">
              <strong>Data de realização: </strong>
              {contract.date}
            </p>
            <p className="is-size-5">
              <strong>Observações: </strong>
              {contract.obs}
            </p>
            <p className="is-size-5">
              <strong>Valor do contrato: </strong>
              {contract.price && `Akz: ${contract.price},00`}
            </p>
            <p className="is-size-5">
              <strong>Valor pago: </strong>
              {`Akz: ${contract.paid},00`}
            </p>
            <p className="is-size-5">
              <strong>Valor por pagar: </strong>
              {`Akz: ${contract.toPay},00`}
            </p>
            <p className="is-size-5">
              <strong>Estado: </strong>
              {contract.status === "active" ? "Activo" : "Terminado"}
            </p>
            <br />
            <div className="is-grouped">
              <a
                href={contract.link}
                target="_blank"
                className="button is-link"
              >
                Baixar cópia
              </a>
              &nbsp; &nbsp;
              <Link
                to={`/suppliers/${contract.supplier}`}
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

export default withFirebase(Contract);
