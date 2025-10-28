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
import ReactToPrint from "react-to-print";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

const FormImpRecibo = ({ datos, socio, totalCuotas, recRef }) => {
  return (
    <Card className="h-full w-full p-4 mt-5 border-2 ">
      <CardBody className="rounded-none">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className=" w-full md:w-1/2 px-3 mt-6  md:mb-0">
            <Typography
              variant="h3"
              color="blue-gray"
              className="font-bold leading-none"
            >
              Impresion de Recibo
            </Typography>
          </div>
          <div className=" w-full md:w-1/2 px-3   md:mb-0 ">
            {datos[0].MOVIM === "A" ? (
              <Alert
                className="mt-5 mb-5"
                color="red"
                icon={
                  <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
                }
              >
                RECIBO ANULADO, SIN VALIDEZ.
              </Alert>
            ) : (
              <ReactToPrint
                trigger={() => <Button>Imprimir</Button>}
                content={() => recRef}
              />
            )}
          </div>
        </div>

        <div className="w-full  p-4 border-2 rounded-xl mt-5">
          <div
            className="flex flex-wrap -mx-3 mb-6"
            ref={(el) => (recRef = el)}
          >
            <div className="w-full md:w-1/2 px-3 mt-6  md:mb-0">
              {/* ORIGINAL */}
              <div className="border-2 p-2 rounded-xl mr-1">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="ml-5 w-full md:w-1/2 px-3 mt-6  md:mb-0">
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="font-bold leading-none"
                    >
                      Mutual I.S.J. Sepelio
                    </Typography>

                    <Typography
                      variant="small"
                      color="blue-gray"
                      className=" leading-none mt-2"
                    >
                      Telefono: (388)-4213755
                    </Typography>

                    <Typography
                      variant="small"
                      color="blue-gray"
                      className=" leading-none mt-2"
                    >
                      Condicion: IVA EXENTO
                    </Typography>
                  </div>

                  <div className="ml-12 w-full md:w-1/3 px-3 mt-6  md:mb-0 ">
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="font-bold leading-none"
                    >
                      RECIBO: X
                    </Typography>

                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold  leading-none mt-2"
                    >
                      N: {datos[0].SERIE} - {datos[0].NRO_RECIBO}
                    </Typography>

                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold  leading-none mt-2"
                    >
                      Fecha:{" "}
                      {moment(datos[0].DIA_PAG)
                        .utcOffset("+0300")
                        .format("DD/MM/YYYY")}
                    </Typography>
                  </div>
                </div>

                <hr className="mt-3 mb-3 border-1" />

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="ml-5 w-full md:w-1/2 px-3   md:mb-0">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold  leading-none mt-2"
                    >
                      DNI: {socio[0].NRO_DOC}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold  leading-none mt-2"
                    >
                      HC: {socio[0].CONTRATO}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold  leading-none mt-2"
                    >
                      NOMBRE: {socio[0].APELLIDOS}, {socio[0].NOMBRES}
                    </Typography>
                  </div>

                  <div className="ml-12 w-full md:w-1/3 px-3  md:mb-0 ">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold  leading-none mt-2"
                    >
                      TOTAL: ${totalCuotas(datos)}
                    </Typography>
                  </div>
                </div>
                <hr className="mt-3 mb-3 border-1" />

                <div className="w-full md:w-full px-3  mb-6 md:mb-0">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        <th className="border-b border-gray-300 pb-4 pt-10">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none"
                          >
                            #
                          </Typography>
                        </th>
                        <th className="border-b border-gray-300 pb-4 pt-10">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none"
                          >
                            Cuota
                          </Typography>
                        </th>
                        <th className="border-b border-gray-300 pb-4 pt-10">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none"
                          >
                            Valor
                          </Typography>
                        </th>
                        <th className="border-b border-gray-300 pb-4 pt-10">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none"
                          >
                            ORIGINAL
                          </Typography>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {datos.map(({ MES, ANO, IMPORTE }, index) => {
                        const isLast = index === datos.length - 1;
                        const classes = isLast
                          ? "py-4"
                          : "py-4 border-b border-gray-300";

                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold"
                              >
                                {index + 1}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                className="font-normal text-gray-600"
                              >
                                {MES}/{ANO}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                className="font-normal text-gray-600"
                              >
                                {IMPORTE}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                className="font-normal text-gray-600"
                              ></Typography>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="col-md-12  ">
                  <p className="text-justify" style={{ "font-size": "10px" }}>
                    <u>COVID 19 SERVICIOS FUNEBRES</u>: La prestacion de los
                    servicios de la empresa estara en relacion directa a las
                    diferentes fases sanitarias que determinen las autoridades
                    Nacionales, Provinciales y/o Municipales. El servicio de
                    cremacion y/o parcela estara sujeta a disponibilidad de la
                    empresa y a normativas Nacionales, Provinciales, Municipales
                    y/o Comerciales, que impidieren su normal prestacion. Como
                    para el caso de volver al aislamiento social y preventivo
                    (cuarentena) para la actividad fúnebre, con la prohibición
                    de actividades que signifiquen reunión de personas. Por tal
                    motivo no prodrán realizarse velaciones ni cortejos, ni
                    ninguna otra actividad que implique reunión de personas.{" "}
                    <u>SERVICIO DE SEPELIO</u>: se compromete a brindar a los
                    socios al momento de su fallecimiento el servicio de sepelio
                    que a continuacion se detalla: ataúd bóveda, placa,
                    simbolos, carroza fúnebre; un coche portacoronas; un coche
                    remis; un aviso fúnebre; trámites ante autoridades
                    correspondientes. Subsidio de $500.00. Para solicitar el
                    servicio los familiares deberán presentar el recibo de pago
                    por la cujota del mes en curso, certificado de defuncion
                    expedida por el médico y documento de identidad del extinto.{" "}
                    <u>PAGO DE LA CUOTA</u>: La cuota mensual debera abonarse
                    por mes adelantado del 1 al 15 de cada mes en las oficinas
                    administrativas de la empresa o lugar que esta designe para
                    recibir los mismos, como así tambíen por los servicios de
                    cobranza domiciliarios debidamente autorizados por esta o
                    por el sistema de debito bancario o tarjeta de credito.
                  </p>
                </div>
              </div>
            </div>

            {/* DUPLICADO */}

            <div className="w-full md:w-1/2 px-3 mt-6 mb-6 md:mb-0">
              <div className="border-2 p-2 rounded-xl mr-1">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="ml-5 w-full md:w-1/2 px-3 mt-6  md:mb-0">
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="font-bold leading-none"
                    >
                      Mutual I.S.J. Sepelio
                    </Typography>

                    <Typography
                      variant="small"
                      color="blue-gray"
                      className=" leading-none mt-2"
                    >
                      Telefono: (388)-4213755
                    </Typography>

                    <Typography
                      variant="small"
                      color="blue-gray"
                      className=" leading-none mt-2"
                    >
                      Condicion: IVA EXENTO
                    </Typography>
                  </div>

                  <div className="ml-12 w-full md:w-1/3 px-3 mt-6  md:mb-0 ">
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="font-bold leading-none"
                    >
                      RECIBO: X
                    </Typography>

                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold  leading-none mt-2"
                    >
                      N: {datos[0].SERIE} - {datos[0].NRO_RECIBO}
                    </Typography>

                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold  leading-none mt-2"
                    >
                      Fecha:{" "}
                      {moment(datos[0].DIA_PAG)
                        .utcOffset("+0300")
                        .format("DD/MM/YYYY")}
                    </Typography>
                  </div>
                </div>

                <hr className="mt-3 mb-3 border-1" />

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="ml-5 w-full md:w-1/2 px-3   md:mb-0">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold  leading-none mt-2"
                    >
                      DNI: {socio[0].NRO_DOC}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold  leading-none mt-2"
                    >
                      HC: {socio[0].CONTRATO}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold  leading-none mt-2"
                    >
                      NOMBRE: {socio[0].APELLIDOS}, {socio[0].NOMBRES}
                    </Typography>
                  </div>

                  <div className="ml-12 w-full md:w-1/3 px-3  md:mb-0 ">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold  leading-none mt-2"
                    >
                      TOTAL: ${totalCuotas(datos)}
                    </Typography>
                  </div>
                </div>
                <hr className="mt-3 mb-3 border-1" />

                <div className="w-full md:w-full px-3  mb-6 md:mb-0">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        <th className="border-b border-gray-300 pb-4 pt-10">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none"
                          >
                            #
                          </Typography>
                        </th>
                        <th className="border-b border-gray-300 pb-4 pt-10">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none"
                          >
                            Cuota
                          </Typography>
                        </th>
                        <th className="border-b border-gray-300 pb-4 pt-10">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none"
                          >
                            Valor
                          </Typography>
                        </th>
                        <th className="border-b border-gray-300 pb-4 pt-10">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none"
                          >
                            DUPLICADO
                          </Typography>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {datos.map(({ MES, ANO, IMPORTE }, index) => {
                        const isLast = index === datos.length - 1;
                        const classes = isLast
                          ? "py-4"
                          : "py-4 border-b border-gray-300";

                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold"
                              >
                                {index + 1}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                className="font-normal text-gray-600"
                              >
                                {MES}/{ANO}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                className="font-normal text-gray-600"
                              >
                                {IMPORTE}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                className="font-normal text-gray-600"
                              ></Typography>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="col-md-12  ">
                  <p className="text-justify" style={{ "font-size": "10px" }}>
                    <u>COVID 19 SERVICIOS FUNEBRES</u>: La prestacion de los
                    servicios de la empresa estara en relacion directa a las
                    diferentes fases sanitarias que determinen las autoridades
                    Nacionales, Provinciales y/o Municipales. El servicio de
                    cremacion y/o parcela estara sujeta a disponibilidad de la
                    empresa y a normativas Nacionales, Provinciales, Municipales
                    y/o Comerciales, que impidieren su normal prestacion. Como
                    para el caso de volver al aislamiento social y preventivo
                    (cuarentena) para la actividad fúnebre, con la prohibición
                    de actividades que signifiquen reunión de personas. Por tal
                    motivo no prodrán realizarse velaciones ni cortejos, ni
                    ninguna otra actividad que implique reunión de personas.{" "}
                    <u>SERVICIO DE SEPELIO</u>: se compromete a brindar a los
                    socios al momento de su fallecimiento el servicio de sepelio
                    que a continuacion se detalla: ataúd bóveda, placa,
                    simbolos, carroza fúnebre; un coche portacoronas; un coche
                    remis; un aviso fúnebre; trámites ante autoridades
                    correspondientes. Subsidio de $500.00. Para solicitar el
                    servicio los familiares deberán presentar el recibo de pago
                    por la cujota del mes en curso, certificado de defuncion
                    expedida por el médico y documento de identidad del extinto.{" "}
                    <u>PAGO DE LA CUOTA</u>: La cuota mensual debera abonarse
                    por mes adelantado del 1 al 15 de cada mes en las oficinas
                    administrativas de la empresa o lugar que esta designe para
                    recibir los mismos, como así tambíen por los servicios de
                    cobranza domiciliarios debidamente autorizados por esta o
                    por el sistema de debito bancario o tarjeta de credito.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default FormImpRecibo;
