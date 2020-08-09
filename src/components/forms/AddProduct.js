import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AddProduct = ({ state, handleChange, handleSubmit }) => {
  const isDisabled = state.type === "" || state.name === "";
  const isLoading = useSelector((state) => state.UI.loading);
  return (
    <form onSubmit={handleSubmit}>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Nome</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                name="name"
                className="input"
                type="text"
                placeholder="Nome do produto ou serviço"
                value={state.name}
                onChange={handleChange}
              />
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
                <select onChange={handleChange} value={state.type} name="type">
                  <option value="">Seleccione</option>
                  <option value="Product">Produto</option>
                  <option value="Service">Serviço</option>
                </select>
              </div>
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
                disabled={isDisabled}
                className={
                  isLoading ? "button is-link is-loading" : "button is-link"
                }
              >
                Cadastrar
              </button>
            </div>
            <div className="control">
              <Link to="/products" className="button is-danger">
                Cancelar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default AddProduct;
