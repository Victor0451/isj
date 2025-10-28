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

export default function ListadoHistorial({
  listado,
  traerHistorial,
  contrato,
}) {
  let componentRef = React.createRef();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  let columns = [
    {
      name: "Fecha",
      selector: (row) => `${row.FECHA}`,
      sortable: true,
      width: "200px",
    },

    {
      name: "Accion",
      selector: (row) => `${row.ACCION}`,
      sortable: true,
      width: "800px",
    },

    {
      name: "Operador",
      selector: (row) => `${row.OPERADOR}`,
      sortable: true,
      width: "150px",
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
      <Button
        className=" bg-gray-900"
        size="sm"
        onClick={() => {
          handleOpen();
          traerHistorial(contrato);
        }}
      >
        Historial del Socio
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
        <DialogHeader>Historial del Socio</DialogHeader>

        <DialogBody divider={true} className="h-[45vw] overflow-scroll">
          <div className="border p-4 rounded-xl">
            <Typography variant="h5" color="blue-gray">
              Movimientos registrados
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
