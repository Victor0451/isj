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
} from "@material-tailwind/react";
import moment from "moment";
import { IconSolid } from "../../libs/funciones";
import ListadoCuotas from "./ListadoCuotas";
import Select from "react-select";
import { meses3, anos } from "../../array/array";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

const FormCobranza = ({
  dniRef,
  contratoRef,
  errores,
  alertas,
  traerSocio,
  tarerSocioContrato,
  ficha,
  allPagos,
  grupo,
  cuotaMensual,
  handleChange,
  preCargarPago,
  totalPagosPrecargados,
  eliminarPagoPrecargado,
  nupagos,
  usu,
  puestos,
  registrarPagos,
  pagoJubilado,
  pagoTarjeta,
}) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((cur) => !cur);

  return (
    <Card className="h-full w-full p-4 mt-5 border-2 ">
      <CardBody className="rounded-none">
        <Typography variant="h2">Mutual I.S.J. - Cobranza de cuotas</Typography>

        <Alert className="mt-5 mb-5" color="blue" icon={<IconSolid />}>
          Modulo para la cobranza de cuotas mensuales y emision de recibos.{" "}
        </Alert>

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
                <Alert color="red" icon={<IconSolid />}>
                  {errores}
                </Alert>
              ) : null}

              {alertas ? (
                <Alert color="blue" icon={<IconSolid />}>
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
                <Alert color="red" icon={<IconSolid />}>
                  {errores}
                </Alert>
              ) : null}

              {alertas ? (
                <Alert color="blue" icon={<IconSolid />}>
                  {alertas}
                </Alert>
              ) : null}
            </div>
          </div>
        </div>

        {ficha ? (
          <>
            <hr className="border-2 mt-5 mb-5" />

            <div className="border-2 p-4 rounded-lg">
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

              <Typography variant="h5" color="blue-gray" className="mb-6">
                <u>Socio</u>: {ficha.APELLIDOS}, {ficha.NOMBRES}
              </Typography>

              <div className="grid md:grid-cols-4 md:gap-6 mt-6">
                <div className="relative w-full mb-6 group">
                  <Input
                    size="md"
                    label="Medio Pago"
                    type="text"
                    value={grupo}
                    readOnly
                  />
                </div>

                <div className="relative w-full mb-6 group">
                  <Input
                    size="md"
                    label="DNI"
                    type="text"
                    value={ficha.NRO_DOC}
                    readOnly
                  />
                </div>
                <div className="relative w-full mb-6 group">
                  <Input
                    size="md"
                    label="Fecha Nacimiento"
                    type="text"
                    value={moment(ficha.NACIMIENTO).format("DD/MM/YYYY")}
                    readOnly
                  />
                </div>

                <div className="relative w-full mb-6 group">
                  <Input
                    size="md"
                    label="Plan"
                    type="text"
                    value={`${ficha.PLAN}`}
                    readOnly
                  />
                </div>
                <div className="relative w-full mb-6 group">
                  <Input
                    size="md"
                    label="Obra Social"
                    type="text"
                    value={ficha.OBRA_SOC}
                    readOnly
                  />
                </div>
                <div className="relative w-full mb-6 group">
                  <Input
                    size="md"
                    label="Fecha Alta"
                    type="text"
                    value={moment(ficha.ALTA).format("DD/MM/YYYY")}
                    readOnly
                  />
                </div>
                <div className="relative w-full mb-6 group">
                  <Input
                    size="md"
                    label="Fecha Vigencia"
                    type="text"
                    value={moment(ficha.VIGENCIA).format("DD/MM/YYYY")}
                    readOnly
                  />
                </div>

                <div className="relative w-full mb-6 group">
                  <Input
                    size="md"
                    label="Cuota Mensual"
                    type="text"
                    value={`$${cuotaMensual}`}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {!puestos.puesto_sm || !puestos.serie_sm ? (
              <Alert color="orange" icon={<IconSolid />} className="mt-5 mb-5">
                TU USUARIO NO POSEE PUESTO NI SERIE CONFIGURADAS
              </Alert>
            ) : (
              <div className="p-4 border-2 rounded-lg mt-5">
                <div className="grid md:grid-cols-2 md:gap-6 mt-5">
                  <div className="relative w-full mb-6 group">
                    <Typography variant="h5" color="blue-gray" className="mb-6">
                      Pagos
                    </Typography>

                    <Alert color="blue" icon={<IconSolid />}>
                      Esta accion precargara el o los meses que el afiliado
                      desea abonar, calculando el total final. Para registrar
                      estos pagos, deberas hacer click en registrar pagos.
                    </Alert>
                  </div>
                  <div className="relative w-full  mb-6 group">
                    <Typography variant="h5" color="blue-gray" className="mb-6">
                      Generar Pagos
                    </Typography>

                    <Card className="border-2 mt-4 ">
                      <CardBody>
                        <div className="grid md:grid-cols-3 md:gap-6">
                          <div className="relative w-full mb-6 group">
                            <Select
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

                          <div className="relative w-full mb-6 group">
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
                          <div className="relative w-full mb-6 group">
                            <Button onClick={preCargarPago}>Pre cargar</Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6 mt-5">
                  <div className="relative w-full mb-6 group">
                    <ListadoCuotas listado={allPagos} f={true} />
                  </div>
                  <div className="relative w-full mb-6 group">
                    <ListadoCuotas
                      listado={nupagos}
                      eliminarPagoPrecargado={eliminarPagoPrecargado}
                      f={false}
                    />
                    <Alert color="blue" icon={<IconSolid />} className="mt-5">
                      TOTAL: ${totalPagosPrecargados(nupagos)}
                    </Alert>

                    {nupagos.length === 0 ? null : (
                      <>
                        <div className="p-2 border-2 rounded-xl mt-5 mb-2">
                          <Switch
                            onChange={(e) => pagoTarjeta(e)}
                            label={
                              <div className="p-2">
                                <Typography
                                  color="blue-gray"
                                  className="font-medium"
                                >
                                  Pago con Tarjeta
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="gray"
                                  className="font-normal"
                                >
                                  Activa el 10% en el total del monto por pago
                                  con Debito/Credito. Por defecto esta
                                  DESACTIVADO
                                </Typography>
                              </div>
                            }
                            containerProps={{
                              className: "-mt-5",
                            }}
                          />
                        </div>

                        <div className="p-2 border-2 rounded-xl mt-5 mb-2">
                          <Switch
                            onChange={(e) => pagoJubilado(e)}
                            label={
                              <div className="p-2">
                                <Typography
                                  color="blue-gray"
                                  className="font-medium"
                                >
                                  Jubilados
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="gray"
                                  className="font-normal"
                                >
                                  Quita del monto total todo aumento aplicado
                                  por vencimientos de fecha. Por defecto esta
                                  DESACTIVADO
                                </Typography>
                              </div>
                            }
                            containerProps={{
                              className: "-mt-5",
                            }}
                          />
                        </div>

                        <div className=" flex justify-end">
                          <Button
                            color="green"
                            className="mt-2"
                            onClick={() => registrarPagos(nupagos)}
                          >
                            Registrar Pagos
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : null}
      </CardBody>
    </Card>
  );
};

export default FormCobranza;
