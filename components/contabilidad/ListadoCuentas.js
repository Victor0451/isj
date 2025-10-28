import React, { useMemo } from "react";
import FilterComponent from "../Layouts/FilterComponent";
import DataTable from "react-data-table-component";
import moment from "moment";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Alert,
  Button,
  Option,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";

const ListadoCuentas = ({ listado, elimCuenta }) => {
  let columns = [
    {
      name: "#",
      button: true,
      grow: 0.1,
      cell: (row, index) => <>{index + 1}</>,
    },
    {
      name: "Nro Cuenta",
      selector: (row) => `${row.CUEN}`,
      sortable: true,
      grow: 0.2,
    },
    {
      name: "Descripcion",
      selector: (row) => `${row.DESC}`,
      sortable: true,
      grow: 0.5,
    },
    {
      name: "Movimiento",
      selector: (row) => `${row.MOVIM}`,
      sortable: true,
      grow: 0.1,
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
            onClick={() => elimCuenta(row.id)}
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
        title="Listado de Cuentas"
      />
    </div>
  );
};

export default ListadoCuentas;
