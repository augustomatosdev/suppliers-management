import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Financial = ({
  state,
  handleFile,
  handleChange,
  handleSubmit,
  contract,
  closeModal,
}) => {
  const isDisabled = !state.selectedFile || state.loaded > 0;
  const loading = useSelector((state) => state.data.loading);
  return (
    <form onSubmit={handleSubmit}>
      <div className={state.modal ? "modal is-active" : "modal"}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Adicionar documento</p>
            <button
              onClick={closeModal}
              className="delete"
              aria-label="close"
            ></button>
          </header>
          <section className="modal-card-body">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Exercicio</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      required
                      className="input"
                      type="text"
                      placeholder="Escreva o ano"
                      maxLength="4"
                      name="year"
                      value={state.year}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Mês</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <div className="select">
                      <select
                        name="month"
                        value={state.month}
                        onChange={handleChange}
                      >
                        <option value="">Seleccione</option>
                        <option value="january">Janeiro</option>
                        <option value="february">Fevereiro</option>
                        <option value="march">Março</option>
                        <option value="april">Abril</option>
                        <option value="may">Maio</option>
                        <option value="june">Junho</option>
                        <option value="july">Julho</option>
                        <option value="august">Agosto</option>
                        <option value="september">Setembro</option>
                        <option value="october">Outubro</option>
                        <option value="november">Novembro</option>
                        <option value="december">Dezembro</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Descrição</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      required
                      className="input"
                      type="text"
                      placeholder="Descrição sobre a factura"
                      name="description"
                      value={state.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label">
                {/* <!-- Left empty for spacing --> */}
              </div>
              <div className="field-body">
                <div className="file has-name">
                  <label className="file-label">
                    <input
                      onChange={handleFile}
                      className="file-input"
                      type="file"
                      name="file"
                      accept="application/pdf"
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">Carregar ficheiro…</span>
                    </span>
                    <span className="file-name">
                      {state.selectedFile && state.selectedFile.name}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {state.loaded > 0 && (
              <progress
                className="progress is-primary"
                value={state.loaded}
                max="100"
              >
                {state.loaded}%
              </progress>
            )}
          </section>
          <footer className="modal-card-foot">
            <button
              disabled={isDisabled}
              className={
                loading ? "button is-warning is-loading" : "button is-warning"
              }
            >
              Adicionar
            </button>
            {!loading && (
              <button
                onClick={closeModal}
                type="button"
                className="button is-danger"
              >
                Cancelar
              </button>
            )}
          </footer>
        </div>
      </div>
    </form>
  );
};
export default Financial;
