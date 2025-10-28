import React, { useState } from "react";
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
  ButtonGroup,
} from "@material-tailwind/react";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";
import Link from "next/link";
import Select from "react-select";

const FormEditarAdherente = ({
  handleChange,
  obraSoc,
  procutores,
  apellidoRef,
  nombreRef,
  fechaNacRef,
  dniRef,
  altaRef,
  vigenciaRef,
  errores,
  checkvigencia,
  vigencia,
  alertas,
  sexo,
  ficha,
  editSocio,
}) => {
  const [render, setRender] = useState(true);

  return (
    <Card className="h-full w-full p-4 ">
      <CardBody className="rounded-none">
        <Typography variant="h2">Edicion de Datos - Adherente</Typography>

        <div className=" w-full md:w-full px-3 mt-6  md:mb-0">
          <Alert
            className="mb-5"
            color="blue"
            icon={<InformationCircleIcon strokeWidth={2} className="h-6 w-6" />}
          >
            PARA EDITAR LA INFORMACION DEL SOCIO DEBES HACER CLICK EN EL CAMPO A
            EDITAR, TIPEAR O SELECCIONAR EL NUEVO DATO Y PRESIONAR LA TECLA
            "ENTER" O "INTRO" PARA REGISTRAR EL NUEVO DATO.
          </Alert>
        </div>

        <Alert
          className="mt-5 mb-5 text-white"
          color="blue"
          icon={<InformationCircleIcon strokeWidth={2} className="h-6 w-6" />}
        >
          El plan seleccionado por el titular, es el mismo para todo el grupo
          familiar.
        </Alert>

        <form id="frmEdit">
          <div className="w-full  p-4 border-2 rounded-xl mt-5">
            <Typography variant="h5">Datos del Adherente</Typography>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editSocio();
                    }
                  }}
                  size="md"
                  label={`Apellido: ${ficha.APELLIDOS}`}
                  type="text"
                  inputRef={apellidoRef}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editSocio();
                    }
                  }}
                  size="md"
                  label={`Nombre: ${ficha.NOMBRES}`}
                  type="text"
                  inputRef={nombreRef}
                />
              </div>

              <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editSocio();
                    }
                  }}
                  size="md"
                  label={`DNI: ${ficha.NRO_DOC}`}
                  type="number"
                  inputRef={dniRef}
                />
              </div>

              <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                <Select
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editSocio();
                      setRender(!render);
                    }
                  }}
                  key={render ? "first-render" : "second-render"}
                  className=" text-sm rounded-xl"
                  placeholder={`Seco: ${ficha.SEXO}`}
                  options={sexo.map((i) => ({
                    label: `${i.DESCRIP}`,
                    value: i.CODIGO,
                  }))}
                  onChange={(value) => {
                    handleChange("sexo", value.value);
                  }}
                />
              </div>

              <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editSocio();
                    }
                  }}
                  size="md"
                  label={`Fec. Nacimiento: ${moment(ficha.NACIMIENTO).format(
                    "DD/MM/YYYY"
                  )}`}
                  type="date"
                  inputRef={fechaNacRef}
                />
              </div>

              <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                <Select
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editSocio();
                      setRender(!render);
                    }
                  }}
                  key={render ? "first-render" : "second-render"}
                  className=" text-sm rounded-xl"
                  placeholder={`Obra Social: ${ficha.OBRA_SOC}`}
                  options={obraSoc.map((i) => ({
                    label: `${i.CODIGO} - ${i.DESCRIP}`,
                    value: i.CODIGO,
                  }))}
                  onChange={(value) => {
                    handleChange("obra social", value.value);
                  }}
                />
              </div>

              <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editSocio();
                    }
                  }}
                  size="md"
                  label={`Alta: ${moment(ficha.ALTA).format("DD/MM/YYYY")}`}
                  type="date"
                  inputRef={altaRef}
                  onBlur={checkvigencia}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editSocio();
                    }
                  }}
                  size="md"
                  label={`Vigencia: ${moment(ficha.VIGENCIA).format(
                    "DD/MM/YYYY"
                  )}`}
                  type="date"
                  inputRef={vigenciaRef}
                  defaultValue={vigencia}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                <Select
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editSocio();
                      setRender(!render);
                    }
                  }}
                  key={render ? "first-render" : "second-render"}
                  className=" text-sm rounded-xl"
                  placeholder={`Productor: ${ficha.PRODUCTOR}`}
                  options={procutores.map((i) => ({
                    label: `${i.CODIGO} - ${i.DESCRIP}`,
                    value: i.CODIGO,
                  }))}
                  onChange={(value) => {
                    handleChange("productor", value.value);
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

            {alertas ? (
              <Alert
                className="mt-5 mb-5"
                color="blue"
                icon={
                  <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
                }
              >
                {alertas}
              </Alert>
            ) : null}

            <div className="flex justify-end mt-8">
              <Link href={"/"}>
                <Button className="ml-1" color="red">
                  Cerrar
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default FormEditarAdherente;
