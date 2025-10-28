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

const FormEditarTitular = ({
  ficha,
  grupos,
  zonas,
  sucursales,
  procutores,
  localidades,
  obraSoc,
  planes,
  cuotaRef,
  apellidoRef,
  nombreRef,
  dniRef,
  fechaNacRef,
  altaRef,
  vigenciaRef,
  domiRef,
  nDomiRef,
  barrioRef,
  domiCobRef,
  domiLabRef,
  mailRef,
  telefonoRef,
  movilRef,
  handleChange,
  errores,
  alertas,
  checkEdad,
  checkvigencia,
  vigencia,
  sexo,
  editSocio,
}) => {
  const [render, setRender] = useState(true);

  return (
    <Card className="h-full w-full p-4 ">
      <CardBody className="rounded-none">
        <Typography variant="h2">Edicion de Datos - Titular</Typography>

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

        <form id="frmEdit">
          <div className="w-full  p-4 border-2 rounded-xl mt-5">
            <Typography variant="h5">Datos del Titular</Typography>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mt-6 mb-6 md:mb-0">
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
              <div className="w-full md:w-1/2 px-3 mt-6 mb-6 md:mb-0">
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
              <div className="w-full md:w-1/4 px-3 mt-6 mb-6 md:mb-0">
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
              <div className="w-full md:w-1/4 px-3 mt-6 mb-6 md:mb-0">
                <Select
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editSocio();
                      setRender(!render);
                    }
                  }}
                  key={render ? "first-render" : "second-render"}
                  className=" text-sm rounded-xl"
                  placeholder={`Sexo: ${ficha.SEXO}`}
                  options={sexo.map((i) => ({
                    label: `${i.DESCRIP}`,
                    value: i.CODIGO,
                  }))}
                  onChange={(value) => {
                    handleChange("sexo", value.value);
                  }}
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mt-6 mb-6 md:mb-0">
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editSocio();
                    }
                  }}
                  size="md"
                  label={`Fec. Nac.: ${moment(ficha.NACIMIENTO).format(
                    "DD/MM/YYYY"
                  )}`}
                  type="date"
                  inputRef={fechaNacRef}
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mt-6 mb-6 md:mb-0">
                <Select
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editSocio();
                      setRender(!render);
                    }
                  }}
                  key={render ? "first-render" : "second-render"}
                  className=" text-sm rounded-xl"
                  placeholder={`Ob. Social: ${ficha.OBRA_SOC}`}
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
                  label={`Telefono: ${ficha.TELEFONO}`}
                  type="text"
                  inputRef={telefonoRef}
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
                  label={`Celular: ${ficha.MOVIL}`}
                  type="text"
                  inputRef={movilRef}
                />
              </div>

              <hr className="border-1 mt-5 mb-5 w-full md:w-full px-3  md:mb-0" />

              <div className="w-full md:w-2/3 px-3 mt-6 mb-6 md:mb-0">
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editSocio();
                    }
                  }}
                  size="md"
                  label={`Domicilio: ${ficha.CALLE}`}
                  type="text"
                  inputRef={domiRef}
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mt-6 mb-6 md:mb-0">
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editSocio();
                    }
                  }}
                  size="md"
                  label={`N°: ${ficha.NRO_CALLE}`}
                  type="number"
                  inputRef={nDomiRef}
                />
              </div>
              <div className="w-full md:w-2/5 pl-3 mt-6 mb-6 md:mb-0">
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editSocio();
                    }
                  }}
                  size="md"
                  label={`Barrio: ${ficha.BARRIO}`}
                  type="text"
                  inputRef={barrioRef}
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
                  placeholder={`Localidad: ${ficha.LOCALIDAD}`}
                  options={localidades.map((i) => ({
                    label: `${i.DESCRIP}`,
                    value: i.DESCRIP,
                  }))}
                  onChange={(value) => {
                    handleChange("localidad", value.value);
                  }}
                />
              </div>

              <div className="w-full md:w-1/2 px-3 mt-6 mb-6 md:mb-0">
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editSocio();
                    }
                  }}
                  size="md"
                  label={`Dom. Cobranza: ${ficha.DOMI_COBR}`}
                  type="text"
                  inputRef={domiCobRef}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mt-6 mb-6 md:mb-0">
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editSocio();
                    }
                  }}
                  size="md"
                  label={`Dom. Laboral: ${ficha.DOM_LAB}`}
                  type="text"
                  inputRef={domiLabRef}
                />
              </div>

              <div className="w-full md:w-1/2 px-3 mt-6 mb-6 md:mb-0">
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editSocio();
                    }
                  }}
                  size="md"
                  label={`Mail: ${ficha.MAIL}`}
                  type="text"
                  inputRef={mailRef}
                />
              </div>
            </div>
          </div>

          <hr className="border-2 mt-5 mb-5" />

          <div className="w-full  p-4 border-2 rounded-xl mt-5">
            <Typography variant="h5">Datos de la Ficha</Typography>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                <Input
                  size="md"
                  label="N° Ficha"
                  type="number"
                  value={ficha.CONTRATO}
                  readOnly
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
                  placeholder={`Grupo: ${ficha.GRUPO}`}
                  options={grupos.map((i) => ({
                    label: `${i.CODIGO} - ${i.DESCRIP}`,
                    value: i.CODIGO,
                  }))}
                  onChange={(value) => {
                    handleChange("grupo", value.value);
                  }}
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
                  placeholder={`Zona: ${ficha.ZONA}`}
                  options={zonas.map((i) => ({
                    label: `${i.CODIGO} - ${i.DESCRIP}`,
                    value: i.CODIGO,
                  }))}
                  onChange={(value) => {
                    handleChange("zona", value.value);
                  }}
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
                  placeholder={`Sucursal: ${ficha.SUCURSAL}`}
                  options={sucursales.map((i) => ({
                    label: `${i.sucursal}`,
                    value: i.codigo,
                  }))}
                  onChange={(value) => {
                    handleChange("sucursal", value.value);
                  }}
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
                  placeholder={`Plan: ${ficha.PLAN}`}
                  options={planes.map((i) => ({
                    label: `${i.PLAN}- ${i.DESCRIP}`,
                    value: `${i.PLAN}- ${i.DESCRIP}`,
                  }))}
                  onChange={(value) => {
                    handleChange("plan", value.value);
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
                  defaultValue={vigencia}
                  inputRef={vigenciaRef}
                />
              </div>
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

          <div className="flex justify-end mt-6">
            <Link href={"/"}>
              <Button className="ml-1" color="red">
                Cerrar
              </Button>
            </Link>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default FormEditarTitular;
