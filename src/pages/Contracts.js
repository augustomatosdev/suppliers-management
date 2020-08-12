import React from "react";
import ContractsTable from "../components/ContractsTable";
import ContractsLevel from "../components/ContractsLevel";

const Contracts = () => {
  return (
    <div>
      <ContractsLevel />
      <ContractsTable />
    </div>
  );
};

export default Contracts;
