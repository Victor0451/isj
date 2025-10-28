import React from "react";
import { downloadExcel } from "react-export-table-to-excel";
import { Button } from "@material-tailwind/react";
import moment from "moment";

export default function ExportarPadron({ listado }) {
  let header = [];
  let body = [];
  let name = "";

  name = `Historial de Movimientos del Sistema ${moment().format(
    "DD-MM-YYYY"
  )}.xls`;

  header = ["Fecha", "Operador", "Movimiento"];

  listado.forEach((i) => {
    body.push({
      fecha: moment(i.fecha).format("DD/MM/YYYY HH:mm"),
      operador: i.operador,
      moviemiento: i.accion,
    });
  });

  const descargarExcel = () => {
    downloadExcel({
      fileName: name,
      sheet: "Reporte",
      tablePayload: {
        header,
        // accept two different data structures
        body: body,
      },
    });
  };

  return (
    <Button
      color="green"
      onClick={() => {
        descargarExcel();
      }}
    >
      Export excel
    </Button>
  );
}
