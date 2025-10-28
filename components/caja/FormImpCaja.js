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
import ListadoMovimientos from "./ListadoMovimientos";
import ModalMovimientos from "./ModalMovimientos";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const FormImpCaja = ({ ingresos, egresos, totales, fecha, cajaRef }) => {
  return (
    <Card className="h-full w-full p-4 mt-5 border-2 ">
      <CardBody className="rounded-none">
        <div ref={(el) => (cajaRef = el)}>
          <Typography className="mb-5" variant="h3">
            San Miguel - Visualizacion Caja:{" "}
            {moment(fecha).format("DD/MM/YYYY")}
          </Typography>

          <div className="flex flex-wrap -mx-3 mb-6 border-2 rounded-xl p-4">
            <div className=" w-full md:w-1/2 px-3 mt-6  md:mb-0">
              <div className="flex flex-wrap -mx-3 mb-6 ">
                <div className=" w-full md:w-1/2 px-3 mt-6  md:mb-0">
                  <Typography variant="h6" className=" ml-5">
                    Ingresos
                  </Typography>
                </div>

                <div className=" w-full md:w-full px-3 mt-6  md:mb-0">
                  <ListadoMovimientos
                    listado={ingresos}
                    movim={"I"}
                    imp={true}
                  />
                </div>

                <div className=" w-full md:w-full px-3 mt-6  md:mb-0">
                  <Alert
                    className="mb-5"
                    color="green"
                    icon={
                      <InformationCircleIcon
                        strokeWidth={2}
                        className="h-6 w-6"
                      />
                    }
                  >
                    <u>Total Ingresos</u>: ${totales("I", ingresos)}
                  </Alert>
                </div>
              </div>
            </div>

            <div className=" w-full md:w-1/2 px-3 mt-6  md:mb-0">
              <div className="flex flex-wrap -mx-3 mb-6 ">
                <div className=" w-full md:w-1/2 px-3 mt-6  md:mb-0">
                  <Typography variant="h6" className=" ml-5">
                    Egresos
                  </Typography>
                </div>

                <div className=" w-full md:w-full px-3 mt-6  md:mb-0">
                  <ListadoMovimientos
                    listado={egresos}
                    movim={"E"}
                    imp={true}
                  />
                </div>
                <div className=" w-full md:w-full px-3 mt-6  md:mb-0">
                  <Alert
                    className="mb-5"
                    color="red"
                    icon={
                      <InformationCircleIcon
                        strokeWidth={2}
                        className="h-6 w-6"
                      />
                    }
                  >
                    <u> Total Egresos</u>: ${totales("E", egresos)}
                  </Alert>
                </div>
              </div>
            </div>

            <div className=" w-full md:w-full px-3 mt-6  md:mb-0">
              <Alert
                className="mb-5"
                color="blue"
                icon={
                  <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
                }
              >
                <u>Valores a Depositar </u>: ${totales("D", ingresos, egresos)}
              </Alert>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <ReactToPrint
            trigger={() => <Button>Imprimir</Button>}
            content={() => cajaRef}
          />

          <Link href={"/"}>
            <Button className="ml-1" color="red">
              Cerrar
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default FormImpCaja;
