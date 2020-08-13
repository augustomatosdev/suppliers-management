import React from "react";
import MUIDataTable from "mui-datatables";

const columns = [
  { name: "Nº/Ref." },
  {
    name: "Empresa",
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return <a href={value.link}>{value.supplier}</a>;
      },
    },
  },
  { name: "Objecto" },
  { name: "Valor" },
  { name: "Data" },
  { name: "Estado" },
  {
    name: "Link",
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <a target="_blank" href={value}>
            {"Baixar"}
          </a>
        );
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
  console.log(data);
  const newArray = data.map((contract) => {
    return {
      "Nº/Ref.": contract.reference,
      Data: contract.date,
      Empresa: { supplier: contract.supplierName, link: contract.supplier },
      Link: contract.link,
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
