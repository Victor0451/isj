import React from "react";
import { downloadExcel } from "react-export-table-to-excel";
import { Button } from "@material-tailwind/react";
import moment from "moment";

export default function ExportarInformeVentas({
  listado,
  desde,
  hasta,
  cuota,
}) {
  let header = [];
  let body = [];
  let name = "";

  name = `Informe de Ventas Periodo ${moment(desde).format(
    "DD-MM-YYYY"
  )} al ${moment(hasta).format("DD-MM-YYYY")}. Cuota ${cuota}.xls`;

  header = [
    "Contrato",
    "Socio",
    "Alta",
    "Cod. Productor",
    "Nombre",
    "Cuota",
    "¿Pago?",
  ];

  listado.forEach((i) => {
    body.push({
      CONTRATO: i.CONTRATO,
      SOCIO: i.SOCIO,
      ALTA: moment(i.ALTA).format("DD/MM/YYYY"),
      PRODUCTOR: i.PRODUCTOR,
      DESCRIP: i.DESCRIP,
      IMPORTE: i.IMPORTE,
      PAGO: i.PAGO,
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
    <Button color="green" onClick={descargarExcel}>
      Exportar excel
    </Button>
  );
}
