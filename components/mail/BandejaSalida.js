import React, { useMemo } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "../Layouts/FilterComponent";
import {
  CheckCircleIcon,
  XCircleIcon,
  PrinterIcon,
  FolderIcon,
  ArrowUpCircleIcon,
  EyeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  Typography,
  Alert,
  Button,
  Select,
  Option,
  Input,
  Drawer,
  IconButton,
} from "@material-tailwind/react";

import { Spinner } from "@material-tailwind/react";
import moment from "moment";
import Link from "next/link";
import ModalLeerMsj from "./ModalLeerMsj";
const BandejaSalida = ({ listado, usu, noData, traerArchivos, archivos }) => {
  const columns = [
    {
      name: "Envia",
      selector: (row) => `${row.envia}`,
      sortable: true,
      grow: 0.1,
    },

    {
      name: "Asunto",
      selector: (row) => `${row.asunto}`,
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) => `${moment(row.fecha).format("DD/MM/YYYY HH:mm")}`,
      sortable: true,
      grow: 0.2,
    },

    {
      name: "Acciones",
      button: true,
      grow: 0.1,
      cell: (row, index) => (
        <div className="grid md:grid-cols-4 md:gap-6">
          {usu.perfil === 1 || usu.perfil === 3 ? (
            <>
              {row.ptm_estado === "PENDIENTE" ? (
                <>
                  <CheckCircleIcon
                    color="green"
                    className="butlist mt-px h-6 w-6 "
                    onClick={() => estadoPrest("A", row.ptm_id)}
                  />

                  <XCircleIcon
                    color="red"
                    className="butlist mt-px h-6 w-6 "
                    onClick={() => estadoPrest("R", row.ptm_id)}
                  />
                </>
              ) : null}
            </>
          ) : null}

          <ModalLeerMsj
            row={row}
            archivos={archivos}
            traerArchivos={traerArchivos}
          />
        </div>
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
      {noData === true ? (
        <Alert
          icon={<InformationCircleIcon strokeWidth={2} className="h-6 w-6" />}
        >
          No hay mensajes.
        </Alert>
      ) : (
        <>
          {listado.length === 0 ? (
            <div className="flex justify-center mt-5 mb-5 gap-8">
              <Spinner className="h-12 w-12" />
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={filteredItems}
              defaultSortField="name"
              striped
              pagination
              subHeader
              subHeaderComponent={subHeaderComponent}
            />
          )}
        </>
      )}
    </div>
  );
};

export default BandejaSalida;
