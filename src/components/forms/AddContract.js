import React from "react";
import { Link } from "react-router-dom";

const AddContract = ({
  state,
  handleChange,
  handleSubmit,
  suppliers,
  handleFile,
}) => {
  const isDisabled =
    !state.supplier || !state.status || !state.selectedFile || state.loaded > 0;
  return (
    <form onSubmit={handleSubmit}>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Numero/Ref.</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                required
                className="input"
                type="text"
                placeholder="Numero ou referencia do contrato"
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
          <label className="label">Empresa</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <div className="select">
                <select name="supplier" onChange={handleChange}>
                  <option value="">Seleccione</option>
                  {suppliers.map((supplier) => (
                    <option
                      key={supplier.supplierId}
                      value={supplier.supplierId}
                    >
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Valor</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div class="field has-addons">
              <p class="control">
                <a class="button is-static">Akz</a>
              </p>
              <p class="control is-expanded">
                <input
                  required
                  class="input"
                  type="number"
                  placeholder="Valor do contrato"
                  name="price"
                  value={state.price}
                  onChange={handleChange}
                />
              </p>
            </div>
            <p class="help">Escreva o valor sem virgulas, nem pontos.</p>
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
        <div className="field-label is-normal">
          <label className="label">Estado</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <div className="select">
                <select name="status" onChange={handleChange}>
                  <option value="">Seleccione</option>
                  <option value="active">Activo</option>
                  <option value="terminated">Terminado</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Objecto</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <textarea
                required
                name="objective"
                value={state.objective}
                onChange={handleChange}
                className="textarea"
                placeholder="Objecto do contrato"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Observações</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <textarea
                name="obs"
                value={state.obs}
                onChange={handleChange}
                className="textarea"
                placeholder="Observações sobre o contrato"
              ></textarea>
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
      <div className="field is-horizontal">
        <div className="field-label">
          {/* <!-- Left empty for spacing --> */}
        </div>
        <div className="field-body">
          <div className="field is-grouped">
            <div className="control">
              <button disabled={isDisabled} className="button is-warning">
                Cadastrar
              </button>
            </div>
            <Link to="/procedures" className="button is-danger">
              Cancelar
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddContract;
