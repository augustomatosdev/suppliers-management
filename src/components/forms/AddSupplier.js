import React from "react";

const AddSupplier = ({
  handleContacts,
  handleManager,
  state,
  handleSubmit,
  handleChange,
  handleAddress,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Nome</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Nome da empresa ou fornecedor"
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">NIF</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input
                  class="input"
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
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Endereço</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input
                  // value={state.address.municipalty}
                  name="street"
                  onChange={handleAddress}
                  class="input"
                  type="text"
                  placeholder="Bairro"
                  required
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input
                  name="municipalty"
                  onChange={handleAddress}
                  class="input"
                  type="text"
                  placeholder="Cidade"
                  required
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input
                  name="province"
                  onChange={handleAddress}
                  class="input"
                  type="text"
                  placeholder="Provincia"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Contactos</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input
                  name="phone1"
                  onChange={handleContacts}
                  class="input"
                  type="text"
                  placeholder="Telefone 1"
                  required
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input
                  name="phone2"
                  onChange={handleContacts}
                  class="input"
                  type="text"
                  placeholder="Telefone 2"
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input
                  name="email"
                  onChange={handleContacts}
                  class="input"
                  type="text"
                  placeholder="Email"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Responsável</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input
                  name="fullName"
                  onChange={handleManager}
                  class="input"
                  type="text"
                  placeholder="Nome completo"
                  required
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input
                  name="phone"
                  onChange={handleManager}
                  class="input"
                  type="text"
                  placeholder="Telefone"
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input
                  name="idCard"
                  onChange={handleManager}
                  class="input"
                  type="text"
                  placeholder="Bilhete de identidade"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Inicio</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input
                  name="startDate"
                  value={state.startDate}
                  onChange={handleChange}
                  class="input"
                  type="date"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Observações</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <textarea
                  name="obs"
                  value={state.obs}
                  onChange={handleChange}
                  class="textarea"
                  placeholder="Observações sobre o fornecedor"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label">{/* <!-- Left empty for spacing --> */}</div>
          <div class="field-body">
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link">Cadastrar</button>
              </div>
              <div class="control">
                <button class="button is-danger">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddSupplier;
