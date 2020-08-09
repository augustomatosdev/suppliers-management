import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AddProduct = ({ state, handleChange, handleSubmit }) => {
  const isDisabled = state.type === "" || state.name === "";
  const isLoading = useSelector((state) => state.UI.loading);
  return (
    <form onSubmit={handleSubmit}>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Nome</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                name="name"
                class="input"
                type="text"
                placeholder="Nome do produto ou serviço"
                value={state.name}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Tipo</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
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
      <div class="field is-horizontal">
        <div class="field-label">{/* <!-- Left empty for spacing --> */}</div>
        <div class="field-body">
          <div class="field is-grouped">
            <div class="control">
              <button
                disabled={isDisabled}
                class={
                  isLoading ? "button is-link is-loading" : "button is-link"
                }
              >
                Cadastrar
              </button>
            </div>
            <div class="control">
              <Link to="/products" class="button is-danger">
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
