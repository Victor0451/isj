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

const FormNuevoSocio = ({
  nFicha,
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
  regSocio,
  errores,
  alertas,
  checkEdad,
  checkvigencia,
  vigencia,
  sexo,
  chkDNI,
  checkExistenciaDni,
  infoDNI,
}) => {
  return (
    <Card className="h-full w-full p-4 ">
      <CardBody className="rounded-none">
        <Typography variant="h2">Registro de Socios</Typography>

        <div className="w-full  p-4 border-2 rounded-xl mt-5">
          <Typography variant="h5">Comprobar Existenxia de DNI</Typography>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/4 px-3 mt-6 mb-6 md:mb-0">
              <Input
                size="md"
                label="DNI"
                type="number"
                inputRef={dniRef}
                minLength="7"
                maxLength="8"
              />
            </div>

            <div className="w-full md:w-1/5 px-3 mt-6 mb-6 md:mb-0">
              <Button onClick={checkExistenciaDni}>Comprobar DNI</Button>
            </div>
            <div className="w-full md:w-1/2 px-3 mt-6 mb-6 md:mb-0">
              {infoDNI ? (
                <Alert
                  className=""
                  color="blue"
                  icon={
                    <InformationCircleIcon
                      strokeWidth={2}
                      className="h-6 w-6"
                    />
                  }
                >
                  {infoDNI}
                </Alert>
              ) : null}
            </div>
          </div>
        </div>

        {chkDNI === false ? null : chkDNI === true ? (
          <>
            <div className="w-full  p-4 border-2 rounded-xl mt-5">
              <Typography variant="h5">Datos del Titular</Typography>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mt-6 mb-6 md:mb-0">
                  <Input
                    size="md"
                    label="Apellido"
                    type="text"
                    inputRef={apellidoRef}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mt-6 mb-6 md:mb-0">
                  <Input
                    size="md"
                    label="Nombre"
                    type="text"
                    inputRef={nombreRef}
                  />
                </div>

                <div className="w-full md:w-1/4 px-3 mt-6 mb-6 md:mb-0">
                  <Select
                    className=" text-sm rounded-xl"
                    placeholder="Sexo"
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
                    size="md"
                    label="Fecha de Nacimiento"
                    type="date"
                    inputRef={fechaNacRef}
                    onBlur={checkEdad}
                  />
                </div>
                <div className="w-full md:w-1/4 px-3 mt-6 mb-6 md:mb-0">
                  <Select
                    className=" text-sm rounded-xl"
                    placeholder="Obra Social"
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
                    size="md"
                    label="Telefono"
                    type="text"
                    inputRef={telefonoRef}
                  />
                </div>

                <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                  <Input
                    size="md"
                    label="Celular"
                    type="text"
                    inputRef={movilRef}
                  />
                </div>

                <hr className="border-1 mt-5 mb-5 w-full md:w-full px-3  md:mb-0" />

                <div className="w-full md:w-2/3 px-3 mt-6 mb-6 md:mb-0">
                  <Input
                    size="md"
                    label="Domicilio"
                    type="text"
                    inputRef={domiRef}
                  />
                </div>
                <div className="w-full md:w-1/4 px-3 mt-6 mb-6 md:mb-0">
                  <Input
                    size="md"
                    label="N°"
                    type="number"
                    inputRef={nDomiRef}
                  />
                </div>
                <div className="w-full md:w-2/5 pl-3 mt-6 mb-6 md:mb-0">
                  <Input
                    size="md"
                    label="Barrio"
                    type="text"
                    inputRef={barrioRef}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                  <Select
                    className=" text-sm rounded-xl"
                    placeholder="Localidad"
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
                    size="md"
                    label="Domicilio Cobranza"
                    type="text"
                    inputRef={domiCobRef}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mt-6 mb-6 md:mb-0">
                  <Input
                    size="md"
                    label="Domicilio Laboral"
                    type="text"
                    inputRef={domiLabRef}
                  />
                </div>

                <div className="w-full md:w-1/2 px-3 mt-6 mb-6 md:mb-0">
                  <Input
                    size="md"
                    label="E-mail"
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
                    value={nFicha}
                    readOnly
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                  <Select
                    className=" text-sm rounded-xl"
                    placeholder="Grupo"
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
                    className=" text-sm rounded-xl"
                    placeholder="Zonas"
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
                    className=" text-sm rounded-xl"
                    placeholder="Sucursal"
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
                    className=" text-sm rounded-xl"
                    placeholder="Productor"
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
                    className=" text-sm rounded-xl"
                    placeholder="Plan"
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
                    size="md"
                    label="Alta"
                    type="date"
                    inputRef={altaRef}
                    onBlur={checkvigencia}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                  <Input
                    size="md"
                    label="Vigencia"
                    type="date"
                    defaultValue={vigencia}
                    inputRef={vigenciaRef}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                  <Input
                    size="md"
                    label="Cuota"
                    type="number"
                    inputRef={cuotaRef}
                  />
                </div>
              </div>
            </div>
          </>
        ) : null}

        {errores ? (
          <Alert
            className="mt-5 mb-5"
            color="red"
            icon={<InformationCircleIcon strokeWidth={2} className="h-6 w-6" />}
          >
            {errores}
          </Alert>
        ) : null}

        {alertas ? (
          <Alert
            className="mt-5 mb-5"
            color="blue"
            icon={<InformationCircleIcon strokeWidth={2} className="h-6 w-6" />}
          >
            {alertas}
          </Alert>
        ) : null}

        <div className="flex justify-end mt-6">
          {chkDNI === true ? (
            <Button className="" color="blue" onClick={regSocio}>
              Registrar
            </Button>
          ) : chkDNI === false ? null : null}

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

export default FormNuevoSocio;
