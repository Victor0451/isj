import React, { useState } from "react";
import {
  Input,
  Alert,
  Typography,
  Option,
  Textarea,
  Card,
  CardBody,
  Button,
  Collapse,
} from "@material-tailwind/react";
import moment from "moment";

const TablaEfectividad = ({ cOf, totales, porcent }) => {
  return (
    <>
      <div className="block w-full overflow-x-auto">
        <table className="items-center bg-transparent w-full border-collapse ">
          <thead>
            <tr>
              <th className=" bg-blueGray-50  text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Zona / Grupo
              </th>
              <th className=" bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Detalle
              </th>
              <th className=" bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Fichas
              </th>
              <th className=" bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Emitido
              </th>
              <th className=" bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Fichas Cob.
              </th>
              <th className=" bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Cobrado
              </th>
              <th className=" bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Adelantado
              </th>
              <th className=" bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Efect. %
              </th>
            </tr>
          </thead>

          <tbody>
            {/* OFICINA */}
            <th className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
              OFICINAS
            </th>
            {cOf.map((a, index) => (
              <>
                <tr key={index}>
                  <th className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {!a.zona ? <>---</> : a.zona}
                  </th>
                  <td className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                    {a.descr}
                  </td>
                  <td className="border-t-0  align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {a.fichas}
                  </td>
                  <td className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>${" "}
                    {a.total}
                  </td>
                  <td className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>{" "}
                    {a.fichascob}
                  </td>
                  <td className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>${" "}
                    {!a.cobrado ? <>0</> : a.cobrado}
                  </td>
                  <td className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>${" "}
                    {!a.adelantado ? <>0</> : a.adelantado}
                  </td>
                  <td className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>{" "}
                    {porcent(a.adelantado, a.total, a.cobrado)} %
                  </td>
                </tr>
              </>
            ))}
            <tr className="border-t-2 border-b-2 ">
              <td className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                <strong>TOTAL</strong>
              </td>
              <td className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 "></td>

              <td className="border-t-0  align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <strong> {totales(cOf, "fichas emi")}</strong>
              </td>
              <td className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>${" "}
                <strong>{totales(cOf, "emi")}</strong>
              </td>
              <td className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>{" "}
                <strong>{totales(cOf, "fichas cob")}</strong>
              </td>
              <td className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>${" "}
                <strong>{totales(cOf, "cob")}</strong>
              </td>
              <td className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>${" "}
                <strong>{totales(cOf, "adelantado")}</strong>
              </td>
              <td className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>{" "}
                <strong>
                  {porcent(
                    totales(cOf, "adelantado"),
                    totales(cOf, "emi"),
                    totales(cOf, "cob")
                  )}{" "}
                  %
                </strong>
              </td>
            </tr>
            {/* ---------------------------------------------------------------------------- */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TablaEfectividad;
