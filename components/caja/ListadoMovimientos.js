import React, { useMemo } from "react";
import FilterComponent from "../Layouts/FilterComponent";
import DataTable from "react-data-table-component";
import moment from "moment";
import { TrashIcon } from "@heroicons/react/24/solid";

const ListadoMovimientos = ({
  listado,
  eliminarImpuPrecargado,
  movim,
  imp,
}) => {
  let columns = [
    {
      name: "#",
      button: true,
      width: "35px",
      cell: (row, index) => <>{index + 1}</>,
    },

    {
      name: "Detalle",
      button: true,
      width: "200px",
      cell: (row, index) => <>{row.DETALLE}</>,
    },

    {
      name: "Serie",
      selector: (row) => `${row.SERIE}`,
      sortable: true,
      width: "80px",
    },

    {
      name: "Factura",
      selector: (row) => `${row.NUMERO}`,
      sortable: true,
      width: "80px",
    },

    {
      name: "Importe",
      selector: (row) => `$${row.IMPORTE}`,
      sortable: true,
      width: "100px",
    },

    {
      name: "Fecha",
      button: true,
      grow: 0.1,
      cell: (row, index) => <>{moment(row.FECHA).format("DD/MM/YYYY")}</>,
    },

    {
      name: "X",
      button: true,
      width: "35px",
      omit: imp,
      cell: (row, index) => (
        <>
          <TrashIcon
            className="butlist mt-px h-4 w-4"
            color="red"
            onClick={() => {
              eliminarImpuPrecargado(index, movim);
            }}
          />
        </>
      ),
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
    <div className="border-2 rounded-lg p-2">
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

export default ListadoMovimientos;
