import React from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";

const columns = [
  { name: "Nº/Ref" },
  { name: "Tipo" },
  { name: "Objecto" },
  { name: "Despacho" },
  { name: "Data" },

  {
    name: "Link",
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return <Link to={`/procedures/${value}`}>{"Abrir"}</Link>;
      },
    },
  },
];

const options = {
  filterType: "checkbox",
  textLabels: {
    body: {
      noMatch: "A pesquisa não encontrou procedimentos",
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

const ProceduresTable = ({ data }) => {
  const newArray = data.map((procedure) => {
    return {
      "Nº/Ref": procedure.reference,
      Despacho: procedure.description,
      Data: procedure.date,
      Objecto: procedure.objective,
      Link: procedure.procedureId,
      Tipo: procedure.type,
    };
  });

  return (
    <MUIDataTable
      // title={"Employee List"}
      data={newArray}
      columns={columns}
      options={options}
    />
  );
};

export default ProceduresTable;
