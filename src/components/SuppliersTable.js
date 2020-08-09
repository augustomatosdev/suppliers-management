import React from "react";
import MUIDataTable from "mui-datatables";

const columns = [
  "Nome",
  "NIF",
  "Endereço",
  "Contactos",
  "Email",
  "Responsável",
  "Inicio",
  "Produto/Serviço",
];

// const data = [
//   ["Joe James", "Test Corp", "Yonkers", "NY"],
//   ["John Walsh", "Test Corp", "Hartford", "CT"],
//   ["Bob Herm", "Test Corp", "Tampa", "FL"],
//   ["James Houston", "Test Corp", "Dallas", "TX"],
// ];
const options = {
  filterType: "checkbox",
  textLabels: {
    body: {
      noMatch: "A pesquisa não encontrou fornecedores",
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

const SuppliersTable = ({ data }) => {
  const newArray = data.map((supplier) => {
    return {
      Nome: supplier.name,
      NIF: supplier.nif,
      Endereço: `${supplier.address.street}, ${supplier.address.municipalty}, ${supplier.address.province}`,
      Contactos: `${supplier.contacts.phone1}, ${supplier.contacts.phone2}`,
      Email: supplier.contacts.email,
      Responsável: supplier.manager.fullName,
      Inicio: supplier.startDate,
      // Oservações: supplier.obs,
      "Produto/Serviço": supplier.description,
      type: supplier.type,
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

export default SuppliersTable;
