import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Alert,
  Button,
  Select,
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
import ListadoAdherentesPrint from "./ListadoAdherentesPrint";
import ListadoPagosPrint from "./ListadoPagosPrint";
import Router from "next/router";
import ReactToPrint from "react-to-print";

const FormPrintsSocio = ({
  dniRef,
  contratoRef,
  traerSocio,
  tarerSocioContrato,
  errores,
  alertas,
  show,
  ficha,
  adhs,
  grupo,
  allPagos,
  fichaRef,
  pagosRef,
}) => {
  return (
    <Card className="h-full w-full p-4 ">
      <CardBody className="rounded-none">
        <Typography variant="h2">Prints de Ficha y Pagos</Typography>

        {show === false ? (
          <>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative w-full mb-6 group">
                <div className="p-4 border-2 rounded-lg mt-6 ">
                  <Typography variant="h5" color="blue-gray" className="mb-6">
                    Ingrese el N° de Socio.
                  </Typography>

                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative w-full mb-6 group">
                      <Input
                        size="md"
                        label="N° Socio"
                        type="number"
                        inputRef={contratoRef}
                      />
                    </div>
                    <div className="relative w-full mb-6 group">
                      <Button onClick={tarerSocioContrato}>Buscar</Button>
                    </div>
                  </div>

                  {errores ? (
                    <Alert
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

                  {alertas ? (
                    <Alert
                      color="blue"
                      icon={
                        <InformationCircleIcon
                          strokeWidth={2}
                          className="h-6 w-6"
                        />
                      }
                    >
                      {alertas}
                    </Alert>
                  ) : null}
                </div>
              </div>
              <div className="relative w-full mb-6 group">
                <div className="p-4 border-2 rounded-lg mt-6 ">
                  <Typography variant="h5" color="blue-gray" className="mb-6">
                    Ingrese el DNI del Titular.
                  </Typography>

                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative w-full mb-6 group">
                      <Input
                        size="md"
                        label="DNI"
                        type="number"
                        inputRef={dniRef}
                      />
                    </div>
                    <div className="relative w-full mb-6 group">
                      <Button onClick={traerSocio}>Buscar</Button>
                    </div>
                  </div>

                  {errores ? (
                    <Alert
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

                  {alertas ? (
                    <Alert
                      color="blue"
                      icon={
                        <InformationCircleIcon
                          strokeWidth={2}
                          className="h-6 w-6"
                        />
                      }
                    >
                      {alertas}
                    </Alert>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="relative w-full mb-6 group mt-10">
              <Alert
                color="blue"
                icon={
                  <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
                }
              >
                Puedes consultar el legajo virtual de todos los socios, tanto de
                Werchow como de Mutual
              </Alert>
            </div>
          </>
        ) : show === true ? (
          <>
            <div className="flex justify-end mt-6">
              <ReactToPrint
                trigger={() => <Button>Imprimir Ficha</Button>}
                content={() => fichaRef}
              />

              <ReactToPrint
                trigger={() => <Button className="ml-1">Imprimir Pagos</Button>}
                content={() => pagosRef}
              />

              <Button
                className="ml-1"
                color="red"
                onClick={() => {
                  Router.reload();
                }}
              >
                Cerrar
              </Button>
            </div>

            <div className="p-4" ref={(el) => (fichaRef = el)}>
              <div className="p-4 border-2 rounded-lg mt-6">
                {(ficha && ficha.GRUPO === 666) ||
                (ficha && ficha.GRUPO === 1001) ||
                (ficha && ficha.GRUPO === 1005) ||
                (ficha && ficha.GRUPO === 1006) ||
                (ficha && ficha.GRUPO === 3444) ||
                (ficha && ficha.GRUPO === 3666) ||
                (ficha && ficha.GRUPO === 3777) ||
                (ficha && ficha.GRUPO === 3888) ||
                (ficha && ficha.GRUPO === 3999) ||
                (ficha && ficha.GRUPO === 4004) ||
                (ficha && ficha.GRUPO === 7777) ||
                (ficha && ficha.GRUPO === 8500) ? (
                  <Alert
                    color="red"
                    icon={
                      <InformationCircleIcon
                        strokeWidth={2}
                        className="h-6 w-6"
                      />
                    }
                    className="mt-5 mb-5"
                  >
                    <strong>
                      Ficha en estado moroso. Verifique su situacion
                    </strong>
                  </Alert>
                ) : null}
                <div>
                  <div className="grid md:grid-cols-2 md:gap-6 mt-6">
                    <div className="relative w-full mb-6 group">
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-6"
                      >
                        <u>Informacion del Socio</u>
                      </Typography>
                    </div>
                    <div className="relative w-full mb-6 group flex justify-end">
                      <img
                        className="h-full w-full rounded-sm werchowlogo"
                        src="/img/logo.png"
                        alt="nature image"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 md:gap-6 mt-10">
                    <div className="relative w-full mb-6 group">
                      <Input
                        variant="standard"
                        size="md"
                        label="N° Socio"
                        type="text"
                        defaultValue={ficha.CONTRATO}
                        readOnly
                      />
                    </div>

                    <div className="relative w-full mb-6 group">
                      <Input
                        variant="standard"
                        size="md"
                        label="Medio Pago"
                        type="text"
                        defaultValue={grupo}
                        readOnly
                      />
                    </div>

                    <div className="relative w-full mb-6 group">
                      <Input
                        variant="standard"
                        size="md"
                        label="DNI"
                        type="text"
                        defaultValue={ficha.NRO_DOC}
                        readOnly
                      />
                    </div>
                    <div className="relative w-full mb-6 group">
                      <Input
                        variant="standard"
                        size="md"
                        label="Fecha Nacimiento"
                        type="text"
                        defaultValue={moment(ficha.NACIMIENTO).format(
                          "DD/MM/YYYY"
                        )}
                        readOnly
                      />
                    </div>

                    <div className="relative w-full mb-6 group">
                      <Input
                        variant="standard"
                        size="md"
                        label="Plan"
                        type="text"
                        defaultValue={`${ficha.PLAN}${ficha.SUB_PLAN}`}
                        readOnly
                      />
                    </div>
                    <div className="relative w-full mb-6 group">
                      <Input
                        variant="standard"
                        size="md"
                        label="Obra Social"
                        type="text"
                        defaultValue={ficha.OBRA_SOC}
                        readOnly
                      />
                    </div>
                    <div className="relative w-full mb-6 group">
                      <Input
                        variant="standard"
                        size="md"
                        label="Fecha Alta"
                        type="text"
                        defaultValue={moment(ficha.ALTA).format("DD/MM/YYYY")}
                        readOnly
                      />
                    </div>
                    <div className="relative w-full mb-6 group">
                      <Input
                        variant="standard"
                        size="md"
                        label="Fecha Vigencia"
                        type="text"
                        defaultValue={moment(ficha.VIGENCIA).format(
                          "DD/MM/YYYY"
                        )}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr className="mt-5 mb-5 border-2" />

              <div className="p-4 border-2 rounded-lg mt-6">
                {adhs.length === 0 ? (
                  <Alert
                    icon={
                      <InformationCircleIcon
                        strokeWidth={2}
                        className="h-6 w-6"
                      />
                    }
                  >
                    Este socio no posee adherentes registrados.
                  </Alert>
                ) : (
                  <>
                    <Typography variant="h5" color="blue-gray" className="mb-6">
                      <u> Adherentes</u>
                    </Typography>

                    <ListadoAdherentesPrint listado={adhs} />
                  </>
                )}
              </div>
            </div>

            <hr className="mt-5 mb-5 border-2" />

            <div className="p-4" ref={(el) => (pagosRef = el)}>
              {allPagos.length === 0 ? (
                <Alert
                  icon={
                    <InformationCircleIcon
                      strokeWidth={2}
                      className="h-6 w-6"
                    />
                  }
                >
                  Este socio no posee pagos registrados.
                </Alert>
              ) : (
                <div className="p-4 border-2 rounded-lg mt-6">
                  <div className="grid md:grid-cols-2 md:gap-6 mt-6">
                    <div className="relative w-full mb-6 group">
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-6"
                      >
                        <u>Historial de pagos</u>: {ficha.CONTRATO} -{" "}
                        {ficha.APELLIDOS}, {ficha.NOMBRES}
                      </Typography>
                    </div>
                    <div className="relative w-full mb-6 group flex justify-end">
                      <img
                        className="h-full w-full rounded-sm werchowlogo"
                        src="/img/logo.png"
                        alt="nature image"
                      />
                    </div>
                  </div>

                  <ListadoPagosPrint listado={allPagos} />
                </div>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <ReactToPrint
                trigger={() => <Button>Imprimir Ficha</Button>}
                content={() => fichaRef}
              />

              <ReactToPrint
                trigger={() => <Button className="ml-1">Imprimir Pagos</Button>}
                content={() => pagosRef}
              />

              <Button
                className="ml-1"
                color="red"
                onClick={() => {
                  Router.reload();
                }}
              >
                Cerrar
              </Button>
            </div>
          </>
        ) : null}
      </CardBody>
    </Card>
  );
};

export default FormPrintsSocio;
