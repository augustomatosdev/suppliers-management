import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { getContract } from "../redux/actions/contractsActions";
import { withFirebase } from "../components/Firebase";
import { Link } from "react-router-dom";
import ContractModal from "../components/modals/Contract";

const Contract = (props) => {
  const contract = useSelector((state) => state.data.contract);
  const contractId = props.match.params.contractId;
  console.log(contract);

  useEffect(() => {
    store.dispatch(getContract(props.firebase, contractId, props.history));
  }, []);
  return (
    <div>
      <ContractModal />
      <div className="columns is-centered">
        <div className="column is-8">
          <h1 className="is-title  is-size-2 has-text-link">
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
            <strong>Estado: </strong>
            {contract.status === "active" ? "Activo" : "Terminado"}
          </p>
          <br />
          <div className="is-grouped">
            <a href={contract.link} target="_blank" className="button is-link">
              Baixar
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
          <article class="message">
            <div class="message-header">
              <p>Pagamentos </p>
              <button class="button is-small">
                <span class="icon is-small">
                  <i class="fas fa-plus"></i>
                </span>
                <span>Adicionar</span>
              </button>
            </div>
            <div class="message-body">
              <div className="level">
                <a className="has-text-link">
                  <span class="icon is-small">
                    <i class="fas fa-2x fa-file-alt"></i>
                  </span>
                </a>
                <p>Factura nº 001 referente a Lorem ipsun dolores loren</p>
                <p>12/08/2020</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default withFirebase(Contract);
