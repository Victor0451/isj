import React, { useMemo } from "react";
import FilterComponent from "../Layouts/FilterComponent";
import DataTable from "react-data-table-component";
import moment from "moment";

const ListadoCuentas = ({ listado }) => {
  let columns = [
    {
      name: "#",
      button: true,
      width: "80px",
      cell: (row, index) => <>{index + 1}</>,
    },
    {
      name: "Socio",
      selector: (row) => `${row.contrato}`,
      sortable: true,
      width: "100px",
    },
    {
      name: "Cuenta",
      selector: (row) => `${row.cuenta}`,
      sortable: true,
      width: "300px",
    },
    {
      name: "Observacion",
      selector: (row) => `${row.observacion}`,
      sortable: true,
      width: "500px",
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
    <div>
      <DataTable
        columns={columns}
        data={filteredItems}
        defaultSortField="name"
        striped
        pagination
        subHeader
        subHeaderComponent={subHeaderComponent}
      />
    </div>
  );
};

export default ListadoCuentas;
