import React, { useMemo } from "react";
import FilterComponent from "../Layouts/FilterComponent";
import DataTable from "react-data-table-component";
import moment from "moment";
import { TrashIcon } from "@heroicons/react/24/solid";

const ListadoCuotas = ({ listado, eliminarPagoPrecargado, f }) => {
  let columns = [
    {
      name: "X",
      button: true,
      width: "35px",
      omit: f,
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
    {
      name: "Observacion",
      button: true,
      width: "60px",
      cell: (row, index) => <>{!row.COD_SUC ? <>CUOTA</> : <>DEBITO</>}</>,
    },
    {
      name: "Mes",
      selector: (row) => `${row.MES}`,
      sortable: true,
      width: "65px",
    },
    {
      name: "Año",
      selector: (row) => `${row.ANO}`,
      sortable: true,
      width: "75px",
    },
    {
      name: "Serie",
      button: true,
      width: "65px",
      cell: (row, index) => (
        <>{!row.COD_SUC ? <>{row.SERIE}</> : <>{row.COD_SUC}</>}</>
      ),
    },
    {
      name: "N. Factura",
      button: true,
      width: "60px",
      cell: (row, index) => (
        <>{!row.NRO_CTA ? <>{row.NRO_RECIBO}</> : <>{row.NRO_CTA}</>}</>
      ),
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
      cell: (row, index) => (
        <>
          {!row.DIA_PAGO ? (
            <>{moment(row.DIA_PAG).format("DD/MM/YYYY")}</>
          ) : (
            <>{moment(row.DIA_PAGO).format("DD/MM/YYYY")}</>
          )}
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

export default ListadoCuotas;
