import React, { useMemo } from "react";
import FilterComponent from "../Layouts/FilterComponent";
import DataTable from "react-data-table-component";
import moment from "moment";

const ListadoPagos = ({ listado }) => {
  let columns = [
    {
      name: "#",
      button: true,
      grow: 0.1,
      cell: (row, index) => <>{index + 1}</>,
    },
    {
      name: "Observacion",
      button: true,
      grow: 0.1,
      cell: (row, index) => <>{!row.COD_SUC ? <>CUOTA</> : <>DEBITO</>}</>,
    },
    {
      name: "Mes",
      selector: (row) => `${row.MES}`,
      sortable: true,
      grow: 0.2,
    },
    {
      name: "Año",
      selector: (row) => `${row.ANO}`,
      sortable: true,
      grow: 0.1,
    },
    {
      name: "Serie",
      button: true,
      grow: 0.1,
      cell: (row, index) => (
        <>{!row.COD_SUC ? <>{row.SERIE}</> : <>{row.COD_SUC}</>}</>
      ),
    },
    {
      name: "N. Factura",
      button: true,
      grow: 0.1,
      cell: (row, index) => (
        <>{!row.NRO_CTA ? <>{row.NRO_RECIBO}</> : <>{row.NRO_CTA}</>}</>
      ),
    },
    {
      name: "Importe",
      selector: (row) => `$${row.IMPORTE}`,
      sortable: true,
      grow: 0.2,
    },
    {
      name: "Fecha",
      button: true,
      grow: 0.1,
      cell: (row, index) => (
        <>
          {!row.DIA_PAGO ? (
            <>{moment(row.DIA_PAG).utcOffset("+0300").format("DD/MM/YYYY")}</>
          ) : (
            <>{moment(row.DIA_PAGO).utcOffset("+0300").format("DD/MM/YYYY")}</>
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

export default ListadoPagos;
