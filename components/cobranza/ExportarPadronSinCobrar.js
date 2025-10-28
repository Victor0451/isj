import React from "react";
import { downloadExcel } from "react-export-table-to-excel";
import { Button } from "@material-tailwind/react";
import moment from "moment";

export default function ExportarPadronSinCobrar({ listado, cuota }) {
  let header = [];
  let body = [];
  let name = "";

  name = `Padron Sin Cobrar Cuota: ${cuota} - ${moment().format(
    "DD-MM-YYYY"
  )} .xls`;

  header = [
    "Contrato",
    "Socio",
    "Alta",
    "Plan",
    "Grupo",
    "Zona",
    "Cuota",
    "Deuda",
  ];

  listado.forEach((i) => {
    body.push({
      CONTRATO: i.CONTRATO,
      SOCIO: i.SOCIO,
      ALTA: i.ALTA,
      PLAN: i.PLAN,
      GRUPO: i.GRUPO,
      ZONA: i.ZONA,
      CUOTA: i.CUOTA,
      DEUDA: parseInt(i.DEUDA) + 1,
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
      Exporta excel
    </Button>
  );
}
