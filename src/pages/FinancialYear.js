import React from "react";
import { NavLink } from "react-router-dom";

const FinancialYear = () => {
  return (
    <div className="columns is-centered">
      <div className="column is-8">
        <nav class="panel">
          <p class="panel-heading">Execução Financeira </p>
          <div class="control has-icons-left">
            <div class="select is-small">
              <select>
                <option selected>Exercício</option>
                <option>2020</option>
              </select>
            </div>
            <span class="icon is-small is-left">
              <i class="fas fa-globe"></i>
            </span>
          </div>
          <div class="panel-block">
            <p class="control has-icons-left">
              <input class="input" type="text" placeholder="Search" />
              <span class="icon is-left">
                <i class="fas fa-search" aria-hidden="true"></i>
              </span>
            </p>
          </div>
          <p class="panel-tabs">
            <NavLink activeClassName="is-active" to="/financial/january">
              Janeiro
            </NavLink>
            <NavLink activeClassName="is-active" to="/financial/february">
              Fevereiro
            </NavLink>
            <NavLink activeClassName="is-active" to="/financial/march">
              Março
            </NavLink>
            <NavLink activeClassName="is-active" to="/financial/april">
              Abril
            </NavLink>
            <NavLink activeClassName="is-active" to="/financial/may">
              Maio
            </NavLink>
            <NavLink activeClassName="is-active" to="/financial/june">
              Junho
            </NavLink>
            <NavLink activeClassName="is-active" to="/financial/july">
              Julho
            </NavLink>
            <NavLink activeClassName="is-active" to="/financial/august">
              Agosto
            </NavLink>
            <NavLink activeClassName="is-active" to="/financial/september">
              Setembro
            </NavLink>
            <NavLink activeClassName="is-active" to="/financial/october">
              Outubro
            </NavLink>
            <NavLink activeClassName="is-active" to="/financial/november">
              Novembro
            </NavLink>
            <NavLink activeClassName="is-active" to="/financial/december">
              Dezembro
            </NavLink>
          </p>
          <a class="panel-block is-active">
            <span class="panel-icon">
              <i class="fas fa-book" aria-hidden="true"></i>
            </span>
            Documento 1
          </a>
          <a class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-book" aria-hidden="true"></i>
            </span>
            Documento 2
          </a>

          <div class="panel-block">
            <button class="button is-link is-outlined is-fullwidth">
              Adicionar documento
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default FinancialYear;
