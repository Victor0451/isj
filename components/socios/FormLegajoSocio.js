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
  ButtonGroup,
} from "@material-tailwind/react";

import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";
import ListadoAdherentes from "./ListadoAdherentes";
import { FormSubirArchivos } from "../archivos/FormSubirArchivos";
import { Archivo } from "../archivos/Archivo";
import GastoLuto from "../Layouts/GastoLuto";
import ListadoPagos from "./ListadoPagos";
import Router from "next/router";
import ModalAfiliacion from "./ModalAfiliacion";
import ListadoUsos from "./ListadoUsos";
import ListadoHistorial from "./ListadoHistorial";
import Link from "next/link";
import ModalActualizarCuota from "./ModalActualizarCuota";
import ModalApellidos from "./ModalApellidos";
import ModalCtaTjt from "./ModalCtaTjt";
import ModalPagoCero from "./ModalPagoCero";

const FormLegajoSocio = ({
  dniRef,
  contratoRef,
  errores,
  alertas,
  traerSocio,
  tarerSocioContrato,
  traerApellido,
  show,
  ficha,
  archivos,
  eliminarArchivos,
  file,
  handleSoli,
  handleCondi,
  handleRehab,
  handleNoti,
  handleRecD,
  handleRecF,
  adhs,
  grupo,
  allPagos,
  usos,
  historial,
  histCuotas,
  cuotaMensual,
  baja,
  apellidoRef,
  listApe,
  gl,
  cuentaRef,
  observacionRef,
  regDebCred,
  fclose,
  cuenta,
  traerHistorial,
  nuCuotaRef,
  actCuota,
  mes0Ref,
  ano0Ref,
  regPag0,
  fbaj,
  activarModoBaja,
  bajaFicha,
  handleChange,
  bajaAdh,
  reafiliarFicha,
  reafilAdh,
  alerCuo,
  confirmacion,
  handleVigencia,
  handleBlur,
  cuotasRef,
  vigencia,
  cuotas,
  showAfi,
  regAfi
}) => {
  return (
    <Card className="h-full w-full p-4 ">
      <CardBody className="rounded-none">
        {ficha ? (
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-10/12  px-3 mt-6 mb-6 md:mb-0">
              <Typography variant="h2">
                <u>Legajo Virtual</u>: {ficha.CONTRATO} - {ficha.APELLIDOS},{" "}
                {ficha.NOMBRES}
              </Typography>
            </div>
            <div className="w-full md:w-2/12 px-3  mb-6 md:mb-0">
              <img className="werchowlogo" src="/img/logo.png" />
            </div>
          </div>
        ) : (
          <Typography variant="h2">
            <u>Legajo Virtual</u>
          </Typography>
        )}

        {show === false ? (
          <>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative w-full mb-6 group">
                <div className="p-4 border-2 rounded-lg mt-6 ">
                  <Typography variant="h5" color="blue-gray" className="mb-6">
                    Ingrese el N° de Socio.
                  </Typography>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2  px-3 mt-6 mb-6 md:mb-0">
                      <Input
                        size="md"
                        label="N° Socio"
                        type="number"
                        inputRef={contratoRef}
                      />
                    </div>
                    <div className="w-full md:w-1/2  px-3 mt-6 mb-6 md:mb-0">
                      <ButtonGroup>
                        <Button onClick={tarerSocioContrato}>Buscar</Button>
                      </ButtonGroup>
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

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2  px-3 mt-6 mb-6 md:mb-0">
                      <Input
                        size="md"
                        label="DNI"
                        type="number"
                        inputRef={dniRef}
                      />
                    </div>
                    <div className="w-full md:w-1/2  px-3 mt-6 mb-6 md:mb-0">
                      <ButtonGroup>
                        <Button onClick={traerSocio}>Buscar</Button>
                      </ButtonGroup>
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
            <hr className="border-2  mb-5" />
            <div className="p-4 border-2 rounded-lg mt-6 ">
              <Typography variant="h5" color="blue-gray" className="mb-6">
                Buscar por Apellido del Titular.
              </Typography>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2  px-3 mt-6 mb-6 md:mb-0">
                  <Input
                    size="md"
                    label="Ingrese el apellido"
                    type="text"
                    inputRef={apellidoRef}
                  />
                </div>
                <div className="w-full md:w-1/2  px-3 mt-6 mb-6 md:mb-0">
                  <ButtonGroup>
                    <ModalApellidos
                      nombreBoton={"Buscar"}
                      listado={listApe}
                      fn={traerApellido}
                      tarerSocioContrato={tarerSocioContrato}
                    />
                  </ButtonGroup>
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
            <GastoLuto
              plan={`${ficha.PLAN}${ficha.SUB_PLAN}`}
              alta={ficha.ALTA}
              cantadh={0}
              gl={gl}
            />

            <div>
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

                {baja === true ? (
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
                    <strong>¡CUIDADO!... Esta ficha esta dada de baja.</strong>
                  </Alert>
                ) : baja === false ? (
                  <Alert
                    color="green"
                    icon={
                      <InformationCircleIcon
                        strokeWidth={2}
                        className="h-6 w-6"
                      />
                    }
                    className="mt-5 mb-5"
                  >
                    <strong>Esta ficha esta activa.</strong>
                  </Alert>
                ) : null}

                <div className="mt-5 mb-5 border-2 p-4 rounded-xl">
                  <Typography variant="h5" color="blue-gray">
                    Opciones
                  </Typography>

                  <div className=" mt-4 grid gap-6 mb-6 md:grid-cols-5">
                    <div>
                      <ModalAfiliacion
                        ficha={ficha}
                        cuotasRef={cuotasRef}
                        handleVigencia={handleVigencia}
                        handleBlur={handleBlur}
                        vigencia={vigencia}
                        cuotas={cuotas}
                        errores={errores}
                        showAfi={showAfi}
                        regAfi={regAfi}
                      />
                    </div>

                    <div>
                      <ListadoUsos listado={usos} />
                    </div>

                    <Link
                      href={{
                        pathname: "/socios/adherentes",
                        query: {
                          contrato: ficha.CONTRATO,
                        },
                      }}
                      target="__blank"
                    >
                      <Button className=" bg-gray-900" size="sm">
                        Agregar Adherentes
                      </Button>
                    </Link>

                    <div>
                      <ListadoHistorial
                        listado={historial}
                        traerHistorial={traerHistorial}
                        contrato={ficha.CONTRATO}
                      />
                    </div>

                    <div>
                      <ModalActualizarCuota
                        histCuotas={histCuotas}
                        cuotaMensual={cuotaMensual}
                        nuCuotaRef={nuCuotaRef}
                        actCuota={actCuota}
                        fclose={fclose}
                        errores={errores}
                        alerCuo={alerCuo}
                        confirmacion={confirmacion}
                      />
                    </div>

                    <div>
                      <ModalPagoCero
                        mes0Ref={mes0Ref}
                        ano0Ref={ano0Ref}
                        fclose={fclose}
                        errores={errores}
                        regPag0={regPag0}
                      />
                    </div>

                    {ficha && ficha.GRUPO > 3000 ? (
                      <div>
                        <ModalCtaTjt
                          ficha={ficha}
                          cuentaRef={cuentaRef}
                          observacionRef={observacionRef}
                          regDebCred={regDebCred}
                          errores={errores}
                          fclose={fclose}
                          cuenta={cuenta}
                        />
                      </div>
                    ) : null}

                    <Link
                      href={{
                        pathname: "/socios/editartitular",
                        query: {
                          contrato: ficha.CONTRATO,
                        },
                      }}
                      target="__blank"
                    >
                      <Button className=" bg-orange-900" size="sm">
                        Editar Datos
                      </Button>
                    </Link>

                    {baja === true ? (
                      <div>
                        <Button
                          className="bg-green-900 "
                          size="sm"
                          onClick={reafiliarFicha}
                        >
                          Reafiliar ficha
                        </Button>
                      </div>
                    ) : baja === false ? (
                      <div>
                        <Button
                          className=" bg-red-900"
                          size="sm"
                          onClick={() => activarModoBaja("si")}
                        >
                          Baja ficha
                        </Button>
                      </div>
                    ) : null}
                  </div>
                </div>

                {fbaj === true ? (
                  <div className="border-2 p-4 rounded-xl">
                    <Typography variant="h4" color="blue-gray" className="mb-6">
                      <u> Justificacion de baja</u>
                    </Typography>

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
                      Estas por dar de baja a esta ficha, para ello debes
                      justificar la causa de la baja.
                    </Alert>

                    <Textarea
                      rows={5}
                      size="md"
                      label="Justicia el motivo de la baja"
                      onChange={(value) => handleChange("justificacion", value)}
                    />

                    <div className="flex justify-end mt-6">
                      <Button
                        className="ml-1"
                        onClick={() => {
                          bajaFicha();
                        }}
                      >
                        Reg. Baja
                      </Button>
                      <Button
                        className="ml-1"
                        color="red"
                        onClick={() => {
                          activarModoBaja("no");
                        }}
                      >
                        cancelar
                      </Button>
                    </div>
                  </div>
                ) : fbaj === false ? (
                  <>
                    <div className="border-2 p-4 rounded-xl">
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-6"
                      >
                        Informacion del Socio
                      </Typography>

                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                          <Input
                            size="md"
                            label="Medio Pago"
                            type="text"
                            defaultValue={grupo}
                            readOnly
                          />
                        </div>

                        <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                          <Input
                            size="md"
                            label="DNI"
                            type="text"
                            defaultValue={ficha.NRO_DOC}
                            readOnly
                          />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                          <Input
                            size="md"
                            label="Fecha Nacimiento"
                            type="text"
                            defaultValue={moment(ficha.NACIMIENTO)
                              .utcOffset("+0300")
                              .format("DD/MM/YYYY")}
                            readOnly
                          />
                        </div>

                        <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                          <Input
                            size="md"
                            label="Plan"
                            type="text"
                            defaultValue={`${ficha.PLAN}`}
                            readOnly
                          />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                          <Input
                            size="md"
                            label="Obra Social"
                            type="text"
                            defaultValue={ficha.OBRA_SOC}
                            readOnly
                          />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                          <Input
                            size="md"
                            label="Fecha Alta"
                            type="text"
                            defaultValue={moment(ficha.ALTA)
                              .utcOffset("+0300")
                              .format("DD/MM/YYYY")}
                            readOnly
                          />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                          <Input
                            size="md"
                            label="Fecha Vigencia"
                            type="text"
                            defaultValue={moment(ficha.VIGENCIA)
                              .utcOffset("+0300")
                              .format("DD/MM/YYYY")}
                            readOnly
                          />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                          <Input
                            size="md"
                            label="Telefono"
                            type="text"
                            value={ficha.TELEFONO}
                            readOnly
                          />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                          <Input
                            size="md"
                            label="Movil"
                            type="text"
                            value={ficha.MOVIL}
                            readOnly
                          />
                        </div>

                        <div className="w-full md:w-1/4 px-3 mt-6 mb-6 md:mb-0">
                          <Input
                            size="md"
                            label="Cuota Mensual"
                            type="text"
                            value={`$${cuotaMensual}`}
                            readOnly
                          />
                        </div>
                        <div className="w-full md:w-3/4 px-3 mt-6 mb-6 md:mb-0">
                          {alerCuo ? (
                            <Alert
                              color="orange"
                              icon={
                                <InformationCircleIcon
                                  strokeWidth={2}
                                  className="h-6 w-6"
                                />
                              }
                            >
                              {alerCuo}
                            </Alert>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <hr className="mt-5 mb-5 border-2" />

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
                      <div className="p-4 border-2 rounded-lg mt-6">
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mb-6"
                        >
                          Adherentes
                        </Typography>

                        <ListadoAdherentes
                          listado={adhs}
                          bajaAdh={bajaAdh}
                          reafilAdh={reafilAdh}
                        />
                      </div>
                    )}

                    <hr className="mt-5 mb-5 border-2" />

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
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mb-6"
                        >
                          Pagos
                        </Typography>

                        <ListadoPagos listado={allPagos} />
                      </div>
                    )}

                    <hr className="mt-5 mb-5 border-2" />

                    <div className="p-4 border-2 rounded-lg mt-6">
                      <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="mb-6"
                          >
                            Subir Solicitud
                          </Typography>

                          <FormSubirArchivos
                            file={file}
                            handleUpload={handleSoli}
                          />
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="mb-6"
                          >
                            Subir Condiciones
                          </Typography>

                          <FormSubirArchivos
                            file={file}
                            handleUpload={handleCondi}
                          />
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="mb-6"
                          >
                            Subir Rehabilitacion
                          </Typography>

                          <FormSubirArchivos
                            file={file}
                            handleUpload={handleRehab}
                          />
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="mb-6"
                          >
                            Subir Notificacion
                          </Typography>

                          <FormSubirArchivos
                            file={file}
                            handleUpload={handleNoti}
                          />
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="mb-6"
                          >
                            Subir Recibo (FRENTE)
                          </Typography>

                          <FormSubirArchivos
                            file={file}
                            handleUpload={handleRecF}
                          />
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="mb-6"
                          >
                            Subir Recibo (DORSO)
                          </Typography>

                          <FormSubirArchivos
                            file={file}
                            handleUpload={handleRecD}
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="mt-5 mb-5 border-2" />

                    <div className="p-4 border-2 rounded-lg mt-6">
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-6"
                      >
                        Archivos
                      </Typography>

                      <div className="grid md:grid-cols-3 md:gap-6">
                        {archivos.length > 0 ? (
                          <>
                            {archivos.map((a, index) => (
                              <div
                                key={index}
                                className="relative z-0 w-full mb-6 group"
                              >
                                <Archivo
                                  url={"api/archivos/legajovirtualsm/archivo/"}
                                  urlDesc={
                                    "api/archivos/legajovirtualsm/descargararchivo/"
                                  }
                                  archivo={a.archivo}
                                  eliminarArchivos={eliminarArchivos}
                                />
                              </div>
                            ))}
                          </>
                        ) : (
                          <Alert
                            icon={
                              <InformationCircleIcon
                                strokeWidth={2}
                                className="h-6 w-6"
                              />
                            }
                          >
                            El legajo no contiene archivos.
                          </Alert>
                        )}
                      </div>
                    </div>
                  </>
                ) : null}

                <div className="flex justify-end mt-6">
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
              </div>
            </div>
          </>
        ) : null}
      </CardBody>
    </Card>
  );
};

export default FormLegajoSocio;
