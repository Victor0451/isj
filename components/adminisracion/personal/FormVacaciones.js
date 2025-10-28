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
import ListadoVacaciones from "./ListadoVacaciones";

const FormVacaciones = ({
  empleados,
  handleChange,
  inicioRef,
  finRef,
  regVacaciones,
  errores,
  listVacas,
  eliminarVacaciones
}) => {
  return (
    <Card className="h-full w-full p-4 ">
      <CardBody className="rounded-none">
        <Typography variant="h2">
          Registro de Vacaciones del Personal
        </Typography>

        <div className="w-full  p-4 border-2 rounded-xl mt-5">
          <Typography variant="h5">Ingresar Periodo de Vacaciones</Typography>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/4 px-3 mt-6 mb-6 md:mb-0">
              <Select
                className=" text-sm rounded-xl"
                placeholder="Empleado"
                options={empleados.map((i) => ({
                  label: `${i.label}`,
                  value: i.value,
                }))}
                onChange={(value) => {
                  handleChange("empleado", value.value);
                }}
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mt-6 mb-6 md:mb-0">
              <Input type="date" label="Inicio" inputRef={inicioRef} />
            </div>
            <div className="w-full md:w-1/4 px-3 mt-6 mb-6 md:mb-0">
              <Input type="date" label="Fin" inputRef={finRef} />
            </div>

            <div className="w-full md:w-full px-3 mt-6 mb-6 md:mb-0">
              <Textarea
                rows={5}
                label="Observacion"
                onChange={(e) => {
                  handleChange("observacion", e.target.value);
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
            <Button className="" color="blue" onClick={regVacaciones}>
              Registrar
            </Button>

            <Link href={"/"}>
              <Button className="ml-1" color="red">
                Cerrar
              </Button>
            </Link>
          </div>
        </div>

        <hr className="mb-6 mt-6 border-2" />

        <div className="w-full  p-4 border-2 rounded-xl mt-5">
          <Typography variant="h5">
            Periodos de Vacaciones Registrados
          </Typography>

          <ListadoVacaciones listado={listVacas} eliminarVacaciones={eliminarVacaciones} />
        </div>
      </CardBody>
    </Card>
  );
};

export default FormVacaciones;
