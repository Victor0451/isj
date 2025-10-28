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
import { IconSolid } from "../../libs/funciones";
import Select from "react-select";
import { meses, anos } from "../../array/array";
import TablaEfectividad from "./TablaEfectividad";
import ReactToPrint from "react-to-print";
import Opciones from "./Opciones";
import ModalPadronSinPagar from "./ModalPadronSinPagar";

const FormEfectividad = ({
  handleChange,
  errores,
  porcent,
  totales,
  buscarEfect,
  cOf,
  noData,
  efecRef,
  mesSel,
  anoSel,
  generarPadronSinPago,
  sinPago,
  cuota,
}) => {
  return (
    <Card className="h-full w-full p-4 mt-5 border-2 ">
      <CardBody className="rounded-none">
        <Typography variant="h2">
          Mutual I.S.J. - Efectividad de Cobranza
        </Typography>

        <Alert className="mt-5 mb-5" color="blue" icon={<IconSolid />}>
          Tabla resumen de la cobranza mensual para evaluar la efectividad.
        </Alert>

        <div className="p-4 border-2 rounded-lg mt-6 ">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/4 px-3 mt-6 mb-6 md:mb-0">
              <Select
                className=" text-sm rounded-xl"
                placeholder="Mes"
                options={meses.map((i) => ({
                  label: i.label,
                  value: i.value,
                }))}
                onChange={(value) => {
                  handleChange("mes", value.value);
                }}
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mt-6 mb-6 md:mb-0">
              <Select
                className=" text-sm rounded-xl"
                placeholder="Año"
                options={anos.map((i) => ({
                  label: i.label,
                  value: i.value,
                }))}
                onChange={(value) => {
                  handleChange("ano", value.value);
                }}
              />
            </div>

            <div className="w-full md:w-1/6 px-3 mt-6 mb-6 md:mb-0">
              <Button onClick={buscarEfect}>Buscar</Button>
            </div>

            {noData === 2 ? (
              <>
                <div className="w-full md:w-1/6 px-3 mt-6 mb-6 md:mb-0">
                  <ModalPadronSinPagar
                    generarPadronSinPago={generarPadronSinPago}
                    listado={sinPago}
                    cuota={cuota}
                  />
                </div>

                <div className="w-full md:w-1/6 px-3 mt-6 mb-6 md:mb-0">
                  <ReactToPrint
                    trigger={() => <Button color="green">Imprimir</Button>}
                    content={() => efecRef}
                  />
                </div>
              </>
            ) : null}

            {errores ? (
              <Alert color="red" icon={<IconSolid />} className="mt-5 mb-5">
                {errores}
              </Alert>
            ) : null}
          </div>
        </div>

        {noData === 2 ? (
          <>
            <hr className="border-2 mt-5 mb-5" />

            <div ref={(el) => (efecRef = el)}>
              <div className="border-2 rounded-xl p-4">
                <Typography variant="h4" className="mb-4">
                  Efectividad De Cobranza Mutual I.S.J. - {mesSel}/{anoSel}
                </Typography>

                <TablaEfectividad
                  cOf={cOf}
                  totales={totales}
                  porcent={porcent}
                />

                <Typography variant="small" className="mt-5 flex justify-end">
                  Fecha de emisión del informe: {moment().format("DD/MM/YYYY")}
                </Typography>
              </div>
            </div>
          </>
        ) : noData === 1 ? (
          <Alert color="orange" icon={<IconSolid />} className="mt-5 mb-5">
            No hay datos registrados para el periodo seleccionado
          </Alert>
        ) : null}
      </CardBody>
    </Card>
  );
};

export default FormEfectividad;
