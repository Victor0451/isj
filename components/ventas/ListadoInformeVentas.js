import React, { useMemo } from "react";
import FilterComponent from "../Layouts/FilterComponent";
import DataTable from "react-data-table-component";
import moment from "moment";
const ListadoInformeVentas = ({ listado }) => {
  let columns = [
    {
      name: "#",
      button: true,
      grow: 0.1,
      cell: (row, index) => <>{index + 1}</>,
    },
    {
      name: "Contrato",
      selector: (row) => `${row.CONTRATO}`,
      sortable: true,
      grow: 0.1,
    },
    {
      name: "Socio",
      selector: (row) => `${row.SOCIO}`,
      sortable: true,
      grow: 0.3,
    },
    {
      name: "Alta",
      selector: (row) => `${moment(row.ALTA).format("DD/MM/YYYY")}`,
      sortable: true,
      grow: 0.1,
    },
    {
      name: "Cod. Prod",
      selector: (row) => `${row.PRODUCTOR}`,
      sortable: true,
      grow: 0.1,
    },
    {
      name: "Nombre",
      selector: (row) => `${row.DESCRIP}`,
      sortable: true,
      grow: 0.3,
    },
    {
      name: "Cuota",
      selector: (row) => `${row.IMPORTE}`,
      sortable: true,
      grow: 0.1,
    },
    {
      name: "¿Pago?",
      selector: (row) => `${row.PAGO}`,
      sortable: true,
      grow: 0.1,
    },
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const filteredItems = listado.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <>
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
      </>
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
      columns={columns}
      data={filteredItems}
      defaultSortField="name"
      striped
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
      title={`Total de Ventas ${listado.length}`}
    />
  );
};

export default ListadoInformeVentas;
