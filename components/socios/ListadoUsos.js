import React, { Fragment, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "../Layouts/FilterComponent";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Alert,
  Input,
} from "@material-tailwind/react";
import { DocumentIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import ReactToPrint from "react-to-print";

export default function ListadoUsos({ listado }) {
  let componentRef = React.createRef();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  let columns = [
    {
      name: "Ficha",
      selector: (row) => `${row.CONTRATO}`,
      sortable: true,
      width: "80px",
    },
    {
      name: "Fecha",
      selector: (row) =>
        `${moment(row.FECHA).utcOffset("+0300").format("DD/MM/YYYY")}`,
      sortable: true,
      width: "130px",
    },

    {
      name: "Hora",
      selector: (row) => `${row.HORA}`,
      sortable: true,
      width: "80px",
    },
    {
      name: "DNI Benef.",
      selector: (row) => `${row.NRO_DOC}`,
      sortable: true,
      width: "100px",
    },
    {
      name: "N° Orden",
      selector: (row) => `${row.ORDEN}`,
      sortable: true,
      width: "150px",
    },
    {
      name: "Prestador",
      selector: (row) => `${row.NOMBRE}`,
      sortable: true,
      width: "300px",
    },
    {
      name: "Servicio",
      selector: (row) => `${row.SERVICIO}`,
      sortable: true,
      width: "80px",
    },
    {
      name: "Importe",
      selector: (row) => `${row.IMPORTE}`,
      sortable: true,
      width: "80px",
    },

    {
      name: "Estado",
      button: true,
      width: "80px",
      cell: (row, index) => (
        <>
          {row.ANULADO === 0 ||
          row.ANULADO === "" ||
          row.ANULADO === "FALSO" ? (
            <div>ACTIVA</div>
          ) : row.ANULADO === 1 || row.ANULADO === "VERDADERO" ? (
            <div>ANULADA</div>
          ) : null}
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
    <Fragment>
      <Button className=" bg-gray-900" size="sm" onClick={handleOpen}>
        Historial de Usos
      </Button>

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="xl"
      >
        <DialogHeader>Historial de Usos</DialogHeader>

        <DialogBody divider={true} className="h-[45vw] overflow-scroll">
          <div className="border p-4 rounded-xl">
            <Typography variant="h5" color="blue-gray">
              Usos registrados
            </Typography>
            <Typography color="gray" className="mt-4 mb-4 font-normal">
              <u>Total</u>: {listado.length}
            </Typography>
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
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="red"
            onClick={handleOpen}
            className="ml-1"
          >
            <span>Cerrar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
