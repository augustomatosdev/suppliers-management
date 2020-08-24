import React from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";

const columns = [
  { name: "Nº/Ref." },
  { name: "Empresa" },
  { name: "Objecto" },
  { name: "Valor" },
  { name: "Data" },
  { name: "Estado" },
  {
    name: "Link",
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return <Link to={`/contracts/${value}`}>{"Abrir"}</Link>;
      },
    },
  },
];

const options = {
  filterType: "checkbox",
  textLabels: {
    body: {
      noMatch: "A pesquisa não encontrou contratos",
      toolTip: "Ordenar",
      columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
    },
    pagination: {
      next: "Avançar Pag.",
      previous: "Recuar Pag.",
      rowsPerPage: "Linhas/Pag.:",
      displayRows: "/",
    },
    toolbar: {
      search: "Pesquisar",
      downloadCsv: "Baixar CSV",
      print: "Imprimir",
      viewColumns: "Ver colunas",
      filterTable: "Filtrar lista",
    },
    filter: {
      all: "Todos",
      title: "Filtros",
      reset: "Repor",
    },
    viewColumns: {
      title: "Mostrar Columnas",
      titleAria: "Mostrar/Ocultar Columnas da Lista",
    },
    selectedRows: {
      text: "Linha(s) Selececcionada(s)",
      delete: "Eliminar",
      deleteAria: "Eliminar Linhas Seleccionadas",
    },
  },
};

const ContractsTable = ({ data }) => {
  const newArray = data.map((contract) => {
    return {
      "Nº/Ref.": contract.reference,
      Data: contract.date,
      Empresa: contract.supplierName,
      Link: contract.contractId,
      Objecto: contract.objective,
      Valor: contract.price,
      Estado: contract.status,
    };
  });

  return (
    <MUIDataTable
      title={"Lista de contratos"}
      data={newArray}
      columns={columns}
      options={options}
    />
  );
};

export default ContractsTable;
