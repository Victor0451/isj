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
  Switch,
  Select,
} from "@material-tailwind/react";
import moment from "moment";
import RSelect from "react-select";
import { IconSolid } from "../../libs/funciones";
import { meses3, anos } from "../../array/array";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import ListadoCargaRecibos from "./ListadoCargaRecibos";

const FormCargaRecibo = ({
  nupagos,
  preCargaRec,
  nRecRef,
  importeRef,
  contratoRef,
  diaPagRef,
  handleChange,
  checkRec,
  show,
  eliminarPagoPrecargado,
  registrarPagos,
  errores,
}) => {
  return (
    <Card className="h-full w-full p-4 mt-5 border-2 ">
      <CardBody className="rounded-none">
        <Typography variant="h2">Mutual I.S.J. - Carga de Recibos</Typography>

        <Alert className="mt-5 mb-5" color="blue" icon={<IconSolid />}>
          Modulo para la carga de recibos manuales o de AFIP.{" "}
        </Alert>
        <div className="w-full  p-4 border-2 rounded-xl mt-5">
          <Typography variant="h5">Chequear Existencia</Typography>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/5 px-3 mt-6 mb-6 md:mb-0">
              <Select
                label="Tipo Recibo"
                onChange={(value) => {
                  handleChange("serie", value);
                }}
              >
                <Option value={1}>AFIP - ARCA</Option>
              </Select>
            </div>

            <div className="w-full md:w-1/5 px-3 mt-6 mb-6 md:mb-0">
              <Input
                size="md"
                label="N° Recibo"
                type="text"
                inputRef={nRecRef}
              />
            </div>

            <div className="w-full md:w-1/5 px-3 mt-6 mb-6 md:mb-0">
              <Button onClick={checkRec}>Chequear</Button>
            </div>

            <div className="w-full md:w-full px-3 md:mb-0">
              <Alert
                className="mt-5 mb-5"
                color="blue"
                icon={
                  <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
                }
              >
                PARA REALIZAR LA CARGA PRIMERO SELECCIONA EL TIPO DE RECIBO
                PARA QUE EL SISTEMA DETERMINE LA SERIE Y LUEGO INGRESA EL NUMERO
                DE RECIBO PARA VERIFICAR SI NO FUE PREVIAMENTE CARGARDO.
              </Alert>
            </div>
          </div>
        </div>

        {show === true ? (
          <>
            <hr className="border-2 mt-5 mb-5" />

            <div className="w-full  p-4 border-2 rounded-xl mt-5">
              <Typography variant="h5">Cargar Recibo</Typography>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/5 px-3 mt-6 mb-6 md:mb-0">
                  <Input
                    size="md"
                    label="Fecha de Pago"
                    type="date"
                    inputRef={diaPagRef}
                  />
                </div>

                <div className="w-full md:w-1/5 px-3 mt-6 mb-6 md:mb-0">
                  <Input
                    size="md"
                    label="N° Ficha"
                    type="number"
                    inputRef={contratoRef}
                  />
                </div>

                <div className="w-full md:w-1/5 px-3 mt-6 mb-6 md:mb-0">
                  <RSelect
                    className=" text-sm rounded-xl"
                    placeholder="Mes"
                    options={meses3.map((i) => ({
                      label: i.label,
                      value: i.value,
                    }))}
                    onChange={(value) => {
                      handleChange("mes", value.value);
                    }}
                  />
                </div>
                <div className="w-full md:w-1/5 px-3 mt-6 mb-6 md:mb-0">
                  <RSelect
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
                <div className="w-full md:w-1/5 px-3 mt-6 mb-6 md:mb-0">
                  <Input
                    size="md"
                    label="Importe"
                    type="number"
                    inputRef={importeRef}
                  />
                </div>
              </div>

              {errores ? (
                <Alert
                  className="mt-5 mb-5"
                  color="red"
                  icon={
                    <InformationCircleIcon
                      strokeWidth={2}
                      className="h-6 w-6"
                    />
                  }
                >
                  {errores}
                </Alert>
              ) : null}

              <div className="flex justify-end mt-6">
                <div className="">
                  <Button onClick={preCargaRec}>Pre carga</Button>
                </div>
                {nupagos.length > 0 ? (
                  <div className="ml-1">
                    <Button
                      color="green"
                      onClick={() => registrarPagos(nupagos)}
                    >
                      Registar Recibo
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
            <ListadoCargaRecibos
              listado={nupagos}
              eliminarPagoPrecargado={eliminarPagoPrecargado}
            />
          </>
        ) : show === false ? null : null}
      </CardBody>
    </Card>
  );
};

export default FormCargaRecibo;
