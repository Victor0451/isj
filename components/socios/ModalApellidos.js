import React, { Fragment, useState, useMemo } from "react";
import FilterComponent from "../Layouts/FilterComponent";
import DataTable from "react-data-table-component";
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
import {
  InformationCircleIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";

export default function ModalApellidos({
  nombreBoton,
  listado,
  fn,
  tarerSocioContrato,
  tarerSocioContratoMutual,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  let columns = [
    {
      name: "#",
      button: true,
      grow: 0.1,
      cell: (row, index) => <>{index + 1}</>,
    },
    {
      name: "Ficha",
      selector: (row) => `${row.CONTRATO}`,
      sortable: true,
      grow: 0.1,
    },
    {
      name: "Grupo",
      selector: (row) => `${row.GRUPO}`,
      sortable: true,
      grow: 0.1,
    },
    {
      name: "Titular",
      selector: (row) => `${row.APELLIDOS}, ${row.NOMBRES}`,
      sortable: true,
      grow: 0.4,
    },

    {
      name: "DNI",
      selector: (row) => `${row.NRO_DOC}`,
      sortable: true,
      grow: 0.1,
    },

    {
      name: "Fecha Alta",
      selector: (row) => `${moment(row.ALTA).format("DD/MM/YYYY")}`,
      sortable: true,
      grow: 0.2,
    },

    {
      name: "Acciones",
      button: true,
      grow: 0.1,
      cell: (row, index) => (
        <>
          <ArrowLeftCircleIcon
            color="green"
            className="butlist mt-px h-6 w-6 "
            onClick={() => tarerSocioContrato(row.CONTRATO)}
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
    <Fragment>
      <Button
        color="#0288d1"
        size="sm"
        onClick={() => {
          handleOpen(), fn();
        }}
      >
        {nombreBoton}
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
        <DialogHeader>Listado de Socios</DialogHeader>
        <DialogBody divider={true} className="h-[45vw] overflow-scroll">
          <div className="w-full  p-4 border-2 rounded-xl mt-5">
            <Typography variant="h5">
              Listado de Titulares - {nombreBoton}
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

          <Alert
            className="mt-5 mb-5 text-white"
            color="blue"
            icon={<InformationCircleIcon strokeWidth={2} className="h-6 w-6" />}
          >
            En el listado generado solamente figuran las fichas que estan
            activas (al dia o morosas). Las fichas que estan dadas de baja, no
            figuraran.
          </Alert>
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
