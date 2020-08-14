import React from "react";
import { Link } from "react-router-dom";

const Procedure = ({
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
      <div class={state.modal ? "modal is-active" : "modal"}>
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Adicionar documento</p>
            <button
              onClick={closeModal}
              class="delete"
              aria-label="close"
            ></button>
          </header>
          <section class="modal-card-body">
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
                <div class="file has-name">
                  <label class="file-label">
                    <input
                      onChange={handleFile}
                      class="file-input"
                      type="file"
                      name="file"
                      accept="application/pdf"
                    />
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label">Carregar ficheiro…</span>
                    </span>
                    <span class="file-name">
                      {state.selectedFile && state.selectedFile.name}
                    </span>
                  </label>
                </div>
              </div>
            </div>
            {state.loaded > 0 && (
              <progress
                class="progress is-primary"
                value={state.loaded}
                max="100"
              >
                {state.loaded}%
              </progress>
            )}
          </section>
          <footer class="modal-card-foot">
            <button disabled={isDisabled} class="button is-success">
              Adicionar
            </button>
            {state.loaded === 0 && (
              <button
                onClick={closeModal}
                type="button"
                class="button is-danger"
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
export default Procedure;
