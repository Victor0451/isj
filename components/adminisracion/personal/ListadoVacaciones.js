import React, { useMemo } from "react";
import FilterComponent from "../../Layouts/FilterComponent";
import DataTable from "react-data-table-component";
import moment from "moment";
import { TrashIcon } from "@heroicons/react/24/solid";

const ListadoVacaciones = ({ listado, eliminarVacaciones }) => {
  let hoy = moment();

  let columns = [
    {
      name: "#",
      button: true,
      grow: 0.1,
      cell: (row, index) => <>{index + 1}</>,
    },
    {
      name: "Empleado",
      selector: (row) => `${row.empleado}`,
      sortable: true,
      grow: 0.2,
    },
    {
      name: "Observacion",
      selector: (row) => `${row.observacion}`,
      sortable: true,
      grow: 0.5,
    },
    {
      name: "Inicio",
      selector: (row) =>
        `${moment(row.inicio).utcOffset("+0300").format("DD/MM/YYYY")}`,
      sortable: true,
      grow: 0.2,
    },
    {
      name: "Fin",
      selector: (row) =>
        `${moment(row.fin).utcOffset("+0300").format("DD/MM/YYYY")}`,
      sortable: true,
      grow: 0.2,
    },
    {
      name: "Dias de vacaciones",
      selector: (row) => `${row.dias} Dias`,
      sortable: true,
      grow: 0.2,
    },
    {
      name: "Se reintegra en",
      button: true,
      grow: 0.1,
      cell: (row, index) => (
        <>
          {hoy.isBefore(moment(row.inicio)) === true ? (
            <div>Pendiente</div>
          ) : hoy.isAfter(moment(row.fin)) === true ||
            hoy.isSame(moment(row.fin) === true) ? (
            <div>Reintegrado</div>
          ) : (
            <div>{moment(row.fin).diff(moment(), "days")} Dias</div>
          )}
        </>
      ),
    },
    {
      name: "Acciones",
      button: true,
      grow: 0.1,
      cell: (row, index) => (
        <>
          <TrashIcon
            color="red"
            className="butlist mt-px h-6 w-6"
            onClick={() => eliminarVacaciones(row.idvacaciones)}
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

export default ListadoVacaciones;
