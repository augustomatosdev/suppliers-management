import React from "react";
import { Link } from "react-router-dom";

const Product = ({
  state,
  handleFile,
  handleChange,
  handleSubmit,
  contract,
  closeModal,
}) => {
  const isDisabled = !state.selectedFile || state.loaded > 0;
  return (
    <form onSubmit={handleSubmit}>
      <div className={state.modal ? "modal is-active" : "modal"}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Adicionar legislação</p>
            <button
              onClick={closeModal}
              className="delete"
              aria-label="close"
            ></button>
          </header>
          <section className="modal-card-body">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Nº/Ref</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      required
                      className="input"
                      type="text"
                      placeholder="Número ou referência da legislação"
                      name="reference"
                      value={state.reference}
                      onChange={handleChange}
                    />
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
              <div className="field-label is-normal">
                <label className="label">Data</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      required
                      name="name"
                      className="input"
                      type="date"
                      name="date"
                      value={state.date}
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
            <button disabled={isDisabled} className="button is-warning">
              Adicionar
            </button>
            {state.loaded === 0 && (
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
export default Product;
