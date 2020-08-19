import React from "react";

const ProductsLevel = ({ openModal, handleSearch }) => {
  return (
    <nav className="level is-mobile">
      <div className="level-left">
        <div className="level-item">
          <p className="subtitle is-5">
            <button
              onClick={openModal}
              type="submit"
              className="button is-small is-warning"
            >
              <span className="icon is-small">
                <i className="fas fa-plus"></i>
              </span>
              <span>Novo</span>
            </button>
          </p>
        </div>
      </div>

      <div className="level-right">
        <div className="field has-addons">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Procurar legislação"
              onChange={handleSearch}
            />
          </div>
          <div className="control">
            <a className="button is-warning">Procurar</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ProductsLevel;
