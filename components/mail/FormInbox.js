import React from "react";
import {
  Card,
  CardBody,
  Typography,
  Alert,
  Button,
  Select,
  Option,
  Input,
  Drawer,
  IconButton,
} from "@material-tailwind/react";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";
import BandejaEntrada from "./BandejaEntrada";
import Menu from "./Menu";
import BandejaSalida from "./BandejaSalida";
import FormRedactar from "./FormRedactar";

const FormInbox = ({
  entrada,
  salida,
  noDataI,
  noDataS,
  usu,
  bandeja,
  enviados,
  redactar,
  vistas,
  operadores,
  handleChange,
  operadoSel,
  eliminarDestino,
  eliminarTodosDestino,
  getDescrip,
  handleUpload,
  file,
  asuntoRef,
  errores,
  registrarMsg,
  archivos,
  eliminarArchivos,
  traerArchivos,
  cajasMail,
  cajasMailSel,
  eliminarLink,
  eliminarTodosLink,
}) => {
  return (
    <Card className="h-full w-full p-4 ">
      <CardBody className="rounded-none">
        <Typography variant="h2">Mail Interno</Typography>

        <div className="border-2 rounded-xl p-4 mt-5">
          <Typography variant="h5" color="blue-gray">
            Opciones
          </Typography>

          <div className=" mt-4 grid gap-6 mb-6 md:grid-cols-5">
            <Menu vistas={vistas} entrada={entrada} salida={salida} />
          </div>
        </div>
        <hr className="mt-5 mb-5 border-2" />

        {bandeja === true ? (
          <div className="border-2 rounded-xl p-4 mt-5">
            <Typography variant="h5" color="blue-gray" className="mt-5">
              <u>Bandeja de Entrada</u>
            </Typography>

            <div className="mt-10">
              <BandejaEntrada
                listado={entrada}
                usu={usu}
                noData={noDataI}
                traerArchivos={traerArchivos}
                archivos={archivos}
              />
            </div>
          </div>
        ) : enviados === true ? (
          <div className="border-2 rounded-xl p-4 mt-5">
            <Typography variant="h5" color="blue-gray" className="mt-5">
              <u>Bandeja de Salida</u>
            </Typography>

            <div className="mt-10">
              <BandejaSalida
                listado={salida}
                usu={usu}
                noData={noDataS}
                traerArchivos={traerArchivos}
                archivos={archivos}
              />
            </div>
          </div>
        ) : redactar === true ? (
          <div className="border-2 rounded-xl p-4 mt-5">
            <Typography variant="h5" color="blue-gray" className="mt-5">
              <u>Redactar Mensaje</u>
            </Typography>

            <div className="mt-10">
              <FormRedactar
                operadores={operadores}
                handleChange={handleChange}
                operadoSel={operadoSel}
                eliminarDestino={eliminarDestino}
                eliminarTodosDestino={eliminarTodosDestino}
                getDescrip={getDescrip}
                handleUpload={handleUpload}
                file={file}
                asuntoRef={asuntoRef}
                errores={errores}
                registrarMsg={registrarMsg}
                archivos={archivos}
                eliminarArchivos={eliminarArchivos}
                cajasMail={cajasMail}
                cajasMailSel={cajasMailSel}
                eliminarLink={eliminarLink}
                eliminarTodosLink={eliminarTodosLink}
              />
            </div>
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
};

export default FormInbox;
