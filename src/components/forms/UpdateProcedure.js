import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdateProcedure = ({ state, handleChange, handleSubmit }) => {
  const loading = useSelector((state) => state.data.loading);

  return (
    <form onSubmit={handleSubmit}>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Nº/Ref.</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Número ou referência do procedimento"
                name="reference"
                value={state.reference || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Despacho</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Despacho do procedimento"
                name="description"
                value={state.description || ""}
                onChange={handleChange}
                required
              />
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
                className="textarea"
                placeholder="Objecto do procedimento"
                name="objective"
                value={state.objective || ""}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Tipo</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <div className="select">
                <select
                  onChange={handleChange}
                  value={state.type || ""}
                  name="type"
                >
                  <option value="">Seleccione</option>
                  <option value="Concurso Público">Concurso Público</option>
                  <option value="Concurso Limitado Por Prévia Qualificação">
                    Concurso Limitado Por Prévia Qualificação
                  </option>
                  <option value="Concurso Limitado Por Convite">
                    Concurso Limitado Por Convite
                  </option>
                  <option value="Contratação simplificada">
                    Contratação simplificada
                  </option>
                </select>
              </div>
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
                className="input"
                type="date"
                name="date"
                value={state.date || ""}
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
          <div className="field is-grouped">
            <div className="control">
              <button
                className={
                  loading ? "button is-warning is-loading" : "button is-warning"
                }
              >
                Actualizar
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

export default UpdateProcedure;
