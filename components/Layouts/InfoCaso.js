import React from "react";
import { Alert, Typography } from "@material-tailwind/react";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";

const InfoCaso = ({ caso, gestion }) => {
  console.log(gestion);
  return (
    <Alert variant="gradient" color="green" icon={<InformationCircleIcon />}>
      <Typography className="font-medium  uppercase">
        La ficha {caso[0].contrato} - {caso[0].apellido}, {caso[0].nombre}.
        Pertenece a la campaña {caso[0].descripcion} del operador/a{" "}
        {caso[0].operador}
      </Typography>

      <hr className=" mt-5 mb-5" />

      {gestion.length > 0 ? (
        <div className=" border rounded-xl  bg-white mt-5 p-2">
          <Typography className="font-medium text-black uppercase">
            <u>Gestiones Registradas</u>
          </Typography>
          <table className="mt-5 w-full min-w-max table-auto text-left ">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Accion
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Fecha Accion
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Nueva Accion
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Fecha Nueva Accion
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Operador
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {gestion.map((g, index) => (
                <tr key={index} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {g.accion < 7
                        ? "LLAMADA NO RESPONDIA"
                        : g.accion === 7
                        ? "COMPROMISO DE PAGO"
                        : g.accion === 8
                        ? "NO PAGA"
                        : g.accion === 9
                        ? "CUOTA AL DIA"
                        : g.accion === 10
                        ? "NOTIFICAR (ALEJANDRA)"
                        : g.accion === 11
                        ? "SE ENVIA COBRADOR"
                        : g.accion === 12
                        ? "PASA POR OFICINA"
                        : g.accion === 13
                        ? "CARTERA ROJA"
                        : g.accion === 14
                        ? "SOCIO FALLECIDO"
                        : g.accion === 14
                        ? "RECORDATORIO DE PAGO"
                        : g.accion === 15
                        ? "COMP. PAGO EFECTIVO"
                        : g.accion === 16
                        ? "DEBITO"
                        : g.accion === 17
                        ? "CREDITO"
                        : g.accion === 18
                        ? "COMP. PAGO NO EFECTIVO"
                        : g.accion === 19
                        ? "SOCIO FALLECIDO"
                        : null}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {moment(g.fechaaccion).format("DD/MM/YYYY")}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {g.nuevaaccion}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {moment(g.fechanuevaaccion).format("DD/MM/YYYY")}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {g.operador}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Typography className="font-medium  uppercase">
          La ficha no posee gestiones registradas
        </Typography>
      )}
    </Alert>
  );
};

export default InfoCaso;
