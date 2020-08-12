import React from "react";
import { Link } from "react-router-dom";

const AddContract = ({ suppliers }) => {
  return (
    <form>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Numero/Ref.</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                name="name"
                className="input"
                type="text"
                placeholder="Numero ou referencia do contrato"
                // value={state.name}
                // onChange={handleChange}
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
                <select name="suplier">
                  <option value="">Seleccione</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
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
                  class="input"
                  type="number"
                  placeholder="Valor do contrato"
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
                name="name"
                className="input"
                type="date"
                // placeholder="Nome do produto ou serviço"
                // value={state.name}
                // onChange={handleChange}
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
                <select name="status">
                  <option value="">Seleccione</option>
                  <option value="">Activo</option>
                  <option value="">Terminado</option>
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
                name="purpose"
                //   value={state.obs}
                //   onChange={handleChange}
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
                name="purpose"
                //   value={state.obs}
                //   onChange={handleChange}
                className="textarea"
                placeholder="Objecto do contrato"
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
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Cadastrar</button>
            </div>
            <Link to="/suppliers" className="button is-danger">
              Cancelar
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddContract;
