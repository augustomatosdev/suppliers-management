import React from "react";
import MUIDataTable from "mui-datatables";

const columns = [
  { name: "Nº" },
  {
    name: "Empresa",
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return <a href={value}>{value}</a>;
      },
    },
  },
  { name: "Objecto" },
  { name: "Valor" },
  { name: "Data" },
  { name: "Estado" },
  {
    name: "Anexos",
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return <a href={value}>{"Baixar"}</a>;
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
  //   const newArray = data.map((supplier) => {
  //     return {
  //       Nome: supplier.name,
  //       NIF: supplier.nif,
  //       Endereço: `${supplier.address.street}, ${supplier.address.municipalty}, ${supplier.address.province}`,
  //       Contactos: `${supplier.contacts.phone1}, ${supplier.contacts.phone2}`,
  //       Email: supplier.contacts.email,
  //       Responsável: supplier.manager.fullName,
  //       Inicio: supplier.startDate,
  //       // Oservações: supplier.obs,
  //       "Produto/Serviço": supplier.description,
  //       type: supplier.type,
  //     };
  //   });

  return (
    <MUIDataTable
      title={"Lista de contratos"}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default ContractsTable;
