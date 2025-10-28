import React, { useMemo } from "react";
import FilterComponent from "../Layouts/FilterComponent";
import DataTable from "react-data-table-component";
import moment from "moment";
import { TrashIcon } from "@heroicons/react/24/solid";

const ListadoCargaRecibos = ({ listado, eliminarPagoPrecargado }) => {
  let columns = [
    {
      name: "Mes",
      selector: (row) => `${row.MES}`,
      sortable: true,
      width: "150px",
    },
    {
      name: "Año",
      selector: (row) => `${row.ANO}`,
      sortable: true,
      width: "150px",
    },
    {
      name: "Serie",
      selector: (row) => `${row.SERIE}`,
      sortable: true,
      width: "150px",
    },
    {
      name: "N° Recibo",
      selector: (row) => `${row.NRO_RECIBO}`,
      sortable: true,
      width: "150px",
    },
    {
      name: "Importe",
      selector: (row) => `$${row.IMPORTE}`,
      sortable: true,
      width: "150px",
    },
    {
      name: "Fecha de Pago",
      selector: (row) => `${moment(row.DIA_PAG).format("DD/MM/YYYY")}`,
      sortable: true,

      width: "150px",
    },
    {
      name: "X",
      button: true,
      width: "100px",

      cell: (row, index) => (
        <>
          <TrashIcon
            className="butlist mt-px h-4 w-4"
            color="red"
            onClick={() => {
              eliminarPagoPrecargado(index);
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
    <div className="border-2 rounded-lg p-2 mt-5">
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

export default ListadoCargaRecibos;
