import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Alert,
  Button,
  Option,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";

import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";
import Select from "react-select";
import Link from "next/link";
import { meses, anos } from "../../array/array";
import ListadoInformeVentas from "./ListadoInformeVentas";
import ExportarInformeVentas from "./ExportarInformeVentas";

const FormInformeVentas = ({
  desdeRef,
  HastaRef,
  handleChange,
  generarInforme,
  errores,
  listado,
  desdeInf,
  hastaInf,
  cuotaInf,
}) => {
  return (
    <Card className="h-full w-full p-4 ">
      <CardBody className="rounded-none">
        <Typography variant="h2">Informe de Ventas Realizadas</Typography>

        <div className="w-full  p-4 border-2 rounded-xl mt-5">
          <Typography variant="h5">
            Buscar ventas por rango de fechas
          </Typography>

          <Alert
            className="mt-5 mb-5"
            color="blue"
            icon={<InformationCircleIcon strokeWidth={2} className="h-6 w-6" />}
          >
            Puedes averiguar dentro del rango seleccionado, si abono una cuota
            en especifo seleccionando el mes y el año de la cuota a consultar.
          </Alert>

          <div className="flex flex-wrap -mx-3 mt-6 mb-6">
            <div className="w-full md:w-1/4 px-3 mt-6 mb-6 md:mb-0">
              <Input size="md" label="Desde" type="date" inputRef={desdeRef} />
            </div>
            <div className="w-full md:w-1/4 px-3 mt-6 mb-6 md:mb-0">
              <Input size="md" label="Hasta" type="date" inputRef={HastaRef} />
            </div>
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
          </div>

          {errores ? (
            <Alert
              className="mt-5 mb-5"
              color="red"
              icon={
                <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
              }
            >
              {errores}
            </Alert>
          ) : null}

          <div className="flex justify-end mt-6">
            <Button onClick={generarInforme}>Buscar</Button>
          </div>
        </div>

        {listado.length === 0 ? null : (
          <div className="w-full  p-4 border-2 rounded-xl mt-5">
            <div className="flex justify-end mt-6">
              <ExportarInformeVentas
                listado={listado}
                desde={desdeInf}
                hasta={hastaInf}
                cuota={cuotaInf}
              />
            </div>

            <ListadoInformeVentas listado={listado} />
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default FormInformeVentas;
