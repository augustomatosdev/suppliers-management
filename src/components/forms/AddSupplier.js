import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AddSupplier = ({
  handleContacts,
  handleManager,
  state,
  handleSubmit,
  handleChange,
  handleAddress,
}) => {
  const loading = useSelector((state) => state.UI.loading);
  let error = useSelector((state) => state.UI.errors);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Nome</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input
                  className={error.supplier ? "input is-danger" : "input"}
                  type="text"
                  placeholder="Nome da empresa ou fornecedor"
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                  required
                />
              </div>
              {error.supplier && (
                <p className="help is-danger">{error.supplier}</p>
              )}
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">NIF</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Numero de identificacao fiscal da empresa"
                  name="nif"
                  value={state.nif}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Endereço</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input
                  // value={state.address.municipalty}
                  name="street"
                  onChange={handleAddress}
                  className="input"
                  type="text"
                  placeholder="Bairro"
                  required
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  name="municipalty"
                  onChange={handleAddress}
                  className="input"
                  type="text"
                  placeholder="Cidade"
                  required
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  name="province"
                  onChange={handleAddress}
                  className="input"
                  type="text"
                  placeholder="Provincia"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Contactos</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input
                  name="phone1"
                  onChange={handleContacts}
                  className="input"
                  type="text"
                  placeholder="Telefone 1"
                  required
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  name="phone2"
                  onChange={handleContacts}
                  className="input"
                  type="text"
                  placeholder="Telefone 2"
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  name="email"
                  onChange={handleContacts}
                  className="input"
                  type="text"
                  placeholder="Email"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Responsável</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input
                  name="fullName"
                  onChange={handleManager}
                  className="input"
                  type="text"
                  placeholder="Nome completo"
                  required
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  name="phone"
                  onChange={handleManager}
                  className="input"
                  type="text"
                  placeholder="Telefone"
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  name="idCard"
                  onChange={handleManager}
                  className="input"
                  type="text"
                  placeholder="Bilhete de identidade"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Inicio</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input
                  name="startDate"
                  value={state.startDate}
                  onChange={handleChange}
                  className="input"
                  type="date"
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
                  <select
                    onChange={handleChange}
                    value={state.type}
                    name="type"
                  >
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
          <div className="field-label is-normal">
            <label className="label">Descrição</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <textarea
                  name="description"
                  value={state.description}
                  onChange={handleChange}
                  className="textarea"
                  placeholder="Descrição do produto ou serviço"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        {/* 
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
                  placeholder="Observações sobre o fornecedor"
                ></textarea>
              </div>
            </div>
          </div>
        </div> */}

        <div className="field is-horizontal">
          <div className="field-label">
            {/* <!-- Left empty for spacing --> */}
          </div>
          <div className="field-body">
            <div className="field is-grouped">
              <div className="control">
                <button
                  className={
                    loading
                      ? "button is-warning is-loading"
                      : "button is-warning "
                  }
                >
                  Cadastrar
                </button>
              </div>
              <Link to="/suppliers" className="button is-danger">
                Cancelar
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddSupplier;
