import React, { useMemo } from "react";
import FilterComponent from "../Layouts/FilterComponent";
import DataTable from "react-data-table-component";
import moment from "moment";
import { PrinterIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import {
  Input,
  Alert,
  Typography,
  Option,
  Textarea,
  Card,
  CardBody,
  Button,
  Collapse,
} from "@material-tailwind/react";
import Link from "next/link";

const ListadoCajas = ({ listado }) => {
  let columns = [
    {
      name: "#",
      button: true,
      width: "35px",
      cell: (row, index) => <>{index + 1}</>,
    },

    {
      name: "Fecha",
      selector: (row) =>
        `${moment(row.FECHA).utcOffset("+0300").format("DD/MM/YYYY")}`,
      sortable: true,
      width: "120px",
    },

    {
      name: "Hora",
      selector: (row) => `${row.HORA}`,
      sortable: true,
      width: "120px",
    },

    {
      name: "Importe",
      selector: (row) => `$${row.IMPORTE}`,
      sortable: true,
      width: "100px",
    },

    {
      name: "Operador",
      selector: (row) => `${row.OPERADOR}`,
      sortable: true,
      width: "120px",
    },

    {
      name: "Acciones",
      button: true,
      width: "100px",
      cell: (row, index) => (
        <>
          <Link
            href={{
              pathname: "/caja/impresioncaja",
              query: { fecha: row.FECHA, usucaja: row.OPERADOR },
            }}
            target="__blank"
          >
            <PrinterIcon className="butlist mt-px h-4 w-4" color="blue" />
          </Link>
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
    <Card className="h-full w-full p-4 mt-5 border-2 ">
      <CardBody className="rounded-none">
        <Typography className="mb-5" variant="h3">
          San Miguel - Control de Cajas
        </Typography>

        <div className="flex flex-wrap -mx-3 mb-6 border-2 rounded-xl p-4">
          <div className=" w-full md:w-7/12 px-3 mt-6  md:mb-0">
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
          <div className=" w-full md:w-5/12 px-3 mt-6  md:mb-0">
            <Alert
              className="mb-5"
              color="blue"
              icon={
                <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
              }
            >
              Listado de cajas cerradas para control.
            </Alert>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ListadoCajas;
