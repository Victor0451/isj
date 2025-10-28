import React, { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Alert,
  Input,
} from "@material-tailwind/react";
import { DocumentIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import Select from "react-select";

export default function ModalNuevoAdherente({
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
  regAdh,
  fclose,
  checkvigencia,
  vigencia,
  alertas,
  sexo,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <Fragment>
      <Button color="#0288d1" size="sm" onClick={handleOpen}>
        Registrar Nuevo Adherente
      </Button>

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="xl"
      >
        <DialogHeader>Registro de Adherente</DialogHeader>
        <DialogBody divider={true} className="h-[35vw] overflow-scroll">
          <div className="w-full  p-4 border-2 rounded-xl mt-5">
            <Typography variant="h5">Datos del Adherente</Typography>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                <Input
                  size="md"
                  label="Apellido"
                  type="text"
                  inputRef={apellidoRef}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                <Input
                  size="md"
                  label="Nombre"
                  type="text"
                  inputRef={nombreRef}
                />
              </div>

              <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                <Input size="md" label="DNI" type="number" inputRef={dniRef} />
              </div>

              <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
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

              <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                <Input
                  size="md"
                  label="Fecha de Nacimiento"
                  type="date"
                  inputRef={fechaNacRef}
                />
              </div>

              <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
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
                  label="Fecha de Alta"
                  type="date"
                  inputRef={altaRef}
                  onBlur={checkvigencia}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                <Input
                  size="md"
                  label="Fecha de Vigencia"
                  type="date"
                  inputRef={vigenciaRef}
                  defaultValue={vigencia}
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
              <Button
                variant="gradient"
                color="blue"
                onClick={() => {
                  if (fclose === true) {
                    handleOpen();
                    regAdh();
                  } else if (fclose === false) {
                    regAdh();
                  }
                }}
              >
                <span>Registrar</span>
              </Button>
              <Button
                variant="gradient"
                color="red"
                onClick={handleOpen}
                className="ml-1"
              >
                <span>Cerrar</span>
              </Button>
            </div>
          </div>

          <Alert
            className="mt-5 mb-5 text-white"
            color="blue"
            icon={<InformationCircleIcon strokeWidth={2} className="h-6 w-6" />}
          >
            El plan seleccionado por el titular, es el mismo para todo el grupo
            familiar.
          </Alert>
        </DialogBody>
        <DialogFooter></DialogFooter>
      </Dialog>
    </Fragment>
  );
}
