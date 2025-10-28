import React, { Fragment, useState, useMemo } from "react";
import FilterComponent from "../Layouts/FilterComponent";
import DataTable from "react-data-table-component";
import moment from "moment";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Alert,
  Input,
  Textarea,
} from "@material-tailwind/react";
import ExportarPadronSinCobrar from "./ExportarPadronSinCobrar";

export default function ModalPadronSinPagar({
  generarPadronSinPago,
  listado,
  cuota,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  console.log(listado);

  let columns = [
    {
      name: "#",
      button: true,
      width: "35px",
      cell: (row, index) => <>{index + 1}</>,
    },

    {
      name: "Contrato",
      selector: (row) => `${row.CONTRATO}`,
      sortable: true,
      width: "100px",
    },
    {
      name: "Socio",
      selector: (row) => `${row.SOCIO}`,
      sortable: true,
      width: "300px",
    },

    {
      name: "Alta",
      selector: (row) => `${row.ALTA}`,
      sortable: true,
      width: "120px",
    },

    {
      name: "Plan",
      selector: (row) => `${row.PLAN}`,
      sortable: true,
      width: "200px",
    },

    {
      name: "Grupo",
      selector: (row) => `${row.GRUPO}`,
      sortable: true,
      width: "100px",
    },

    {
      name: "Zona",
      selector: (row) => `${row.ZONA}`,
      sortable: true,
      width: "80px",
    },

    {
      name: "Cuota",
      selector: (row) => `${row.CUOTA}`,
      sortable: true,
      width: "100px",
    },
    {
      name: "Deuda",
      selector: (row) => `${parseInt(row.DEUDA) + 1}`,
      sortable: true,
      width: "100px",
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
        className="ml-10"
        size="sm"
        onClick={() => {
          handleOpen();
          generarPadronSinPago();
        }}
      >
        Padron Sin Cobrar
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
        <DialogHeader>Padron Sin Cobrar</DialogHeader>

        <DialogBody divider={true} className="h-[35vw] overflow-scroll">
          <div className="border-2 rounded-xl p-4">
            <div className="flex justify-end mb-3">
              <ExportarPadronSinCobrar listado={listado} cuota={cuota} />
            </div>

            <DataTable
              columns={columns}
              data={filteredItems}
              defaultSortField="name"
              striped
              pagination
              subHeader
              subHeaderComponent={subHeaderComponent}
              title={`Total: ${listado.length}`}
              paginationPerPage={15} // Valor inicial
              paginationRowsPerPageOptions={[15, 20, 25, 30, 50, 100, 150]} // Opciones para el usuario
            />

            <div className="flex justify-end mt-6">
              <ExportarPadronSinCobrar listado={listado} cuota={cuota} />
            </div>
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
