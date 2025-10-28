import React, { useMemo } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "../../Layouts/FilterComponent";
import { Typography } from "@material-tailwind/react";
import moment from "moment";
import ExportarPadron from "./ExportarPadron";

const ListadoHistorial = ({ listado }) => {
  let columns = [
    {
      name: "Fecha",
      selector: (row) => `${row.FECHA}`,
      sortable: true,
      width: "150px",
    },

    {
      name: "Operador",
      selector: (row) => `${row.OPERADOR}`,
      sortable: true,
      width: "100px",
    },

    {
      name: "Movimiento",
      selector: (row) => `${row.ACCION}`,
      sortable: true,
      width: "1200px",
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
      <div className="">
        <div className="">
          <Typography variant="h6" color="blue-gray">
            <u>Historial de movimientos</u>
          </Typography>
          <Typography color="gray" className="mt-1 font-normal mb-5">
            <u>Total de registros</u>: {listado.length}
          </Typography>
        </div>
        <div className="flex justify-end">
          <ExportarPadron listado={listado} />
        </div>
      </div>

      <div className="mt-5 border-2 rounded-xl p-4">
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
    </div>
  );
};

export default ListadoHistorial;
