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
import Router from "next/router";

const FormPerfil = ({
  usu,
  traduPerfil,
  contrasenaRef,
  cambiarContrasena,
  errores,
}) => {
  return (
    <Card className="h-full w-full p-4 ">
      <CardBody className="rounded-none">
        <Typography variant="h2">
          <u>Usuario</u>: {usu.usuario}
        </Typography>

        {usu.estado === true ? (
          <Alert
            className="mt-5 mb-5"
            color="green"
            icon={<InformationCircleIcon strokeWidth={2} className="h-6 w-6" />}
          >
            Usuario Activo
          </Alert>
        ) : usu.estado === false ? (
          <Alert
            className="mt-5 mb-5"
            color="red"
            icon={<InformationCircleIcon strokeWidth={2} className="h-6 w-6" />}
          >
            Usuario Inactivo
          </Alert>
        ) : null}

        <div className="p-4 border-2 rounded-lg mt-6">
          <Typography variant="h5" color="blue-gray" className="mb-6">
            <u>Datos de Usuario</u>
          </Typography>

          <div className="grid md:grid-cols-4 md:gap-6 mt-6">
            <div className="relative w-full mb-6 group">
              <Input
                size="md"
                label="Apellido"
                type="text"
                defaultValue={usu.apellido}
              />
            </div>
            <div className="relative w-full mb-6 group">
              <Input
                size="md"
                label="Nombre"
                type="text"
                defaultValue={usu.nombre}
              />
            </div>
            <div className="relative w-full mb-6 group">
              <Input
                size="md"
                label="Usuario"
                type="text"
                defaultValue={usu.usuario}
              />
            </div>
            <div className="relative w-full mb-6 group">
              <Input
                size="md"
                label="Fecha de Alta"
                type="text"
                defaultValue={moment(usu.createdAt).format("DD/MM/YYYY")}
              />
            </div>
          </div>
        </div>

        <hr className="border-2 mt-5 mb-5" />

        <div className="p-4 border-2 rounded-lg mt-6">
          <Typography variant="h5" color="blue-gray" className="mb-6">
            <u>Cambiar Contraseña</u>
          </Typography>

          <div className="grid md:grid-cols-4 md:gap-6 mt-6">
            <div className="relative w-full mb-6 group">
              <Input
                size="md"
                label="Contraseña"
                type="password"
                inputRef={contrasenaRef}
              />
            </div>
            <div className="relative w-full mb-6 group">
              <Button onClick={cambiarContrasena}>Cambiar </Button>
            </div>
            <div className="relative w-full mb-6 group">
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
            </div>
          </div>
        </div>

        <hr className="border-2 mt-5 mb-5" />

        <div className="p-4 border-2 rounded-lg mt-6">
          <Typography variant="h5" color="blue-gray" className="mb-6">
            <u>Permisos</u>
          </Typography>

          <div className="grid md:grid-cols-4 md:gap-6 mt-6">
            <div className="relative w-full mb-6 group">
              <Alert
                className="mt-5 mb-5"
                color="blue"
                icon={
                  <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
                }
              >
                <strong>
                  <u>Perfil</u>
                </strong>
                : {traduPerfil(usu.perfil)}
              </Alert>
            </div>
            <div className="relative w-full mb-6 group">
              <Alert
                className="mt-5 mb-5"
                color="blue"
                icon={
                  <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
                }
              >
                <strong>
                  <u>Sucursal</u>
                </strong>
                : {usu.sucursal}
              </Alert>
            </div>
            <div className="relative w-full mb-6 group">
              <Alert
                className="mt-5 mb-5"
                color="blue"
                icon={
                  <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
                }
              >
                <strong>
                  <u>Puesto W</u>
                </strong>
                : {usu.puestow}
              </Alert>
            </div>
            <div className="relative w-full mb-6 group">
              <Alert
                className="mt-5 mb-5"
                color="blue"
                icon={
                  <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
                }
              >
                <strong>
                  <u>Puesto M</u>
                </strong>
                : {usu.puestom}
              </Alert>
            </div>

            <div className="relative w-full mb-6 group">
              <Alert
                className="mt-5 mb-5"
                color="blue"
                icon={
                  <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
                }
              >
                <strong>
                  <u>Codigo</u>
                </strong>
                : {usu.codigo}
              </Alert>
            </div>
            <div className="relative w-full mb-6 group">
              <Alert
                className="mt-5 mb-5"
                color="blue"
                icon={
                  <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
                }
              >
                <strong>
                  <u>Sist. Medico</u>
                </strong>
                : {usu.medicos === 1 ? <>Si</> : <>No</>}
              </Alert>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default FormPerfil;
