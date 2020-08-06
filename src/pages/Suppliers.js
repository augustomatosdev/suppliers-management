import React from "react";
import Level from "../components/Level";
import SuppliersTable from "../components/SuppliersTable";

const Suppliers = () => {
  return (
    <div>
      <Level />
      <div className="columns is-centered">
        <div className="column is-8">
          <h1 className="title has-text-centered">
            LISTA DE FORNECEDORES CADASTRADOS
          </h1>
          <SuppliersTable />
        </div>
        <div className="column is-2">
          <h1 className="subtitle has-text-centered">INSTRUÇÕES</h1>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
