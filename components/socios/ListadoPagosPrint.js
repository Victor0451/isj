import React, { useMemo } from "react";
import moment from "moment";
import { Card, Typography } from "@material-tailwind/react";

const ListadoPagos = ({ listado }) => {
  const TABLE_HEAD = [
    "Observacion",
    "Mes",
    "Año",
    "Serie",
    "N.Recibo",
    "Importe",
    "Fecha",
  ];

  return (
    <div>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listado.map((l, index) => (
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {!l.COD_SUC ? <>CUOTA</> : <>DEBITO</>}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {l.MES}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {l.ANO}
                </Typography>
              </td>

              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {!l.COD_SUC ? <>{l.SERIE}</> : <>{l.COD_SUC}</>}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {!l.NRO_CTA ? <>{l.NRO_RECIBO}</> : <>{l.NRO_CTA}</>}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {l.IMPORTE}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {!l.DIA_PAGO ? (
                    <>
                      {moment(l.DIA_PAG)
                        .utcOffset("+0300")
                        .format("DD/MM/YYYY")}
                    </>
                  ) : (
                    <>
                      {moment(l.DIA_PAGO)
                        .utcOffset("+0300")
                        .format("DD/MM/YYYY")}
                    </>
                  )}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoPagos;
