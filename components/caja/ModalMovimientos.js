import React, { Fragment, useState, useMemo } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Alert,
  Input,
  Textarea,
} from "@material-tailwind/react";
import {
  PrinterIcon,
  ClockIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";
import Select from "react-select";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

export default function ModalMovimientos({
  nombreBoton,
  movim,
  tarerCuentas,
  cuentas,
  tipoFac,
  handleChange,
  fechaRef,
  serieRef,
  nroCompRef,
  cuitRef,
  importeRef,
  preRegImputacion,
  eliminarImpuPrecargado,
  alertas,
  errores,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <Fragment>
      <Button
        className="ml-10"
        size="sm"
        onClick={() => {
          handleOpen();
          tarerCuentas(movim);
        }}
      >
        {nombreBoton}
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
        {movim === "I" ? (
          <DialogHeader>Registro de Ingresos</DialogHeader>
        ) : movim === "E" ? (
          <DialogHeader>Registro de Egresos</DialogHeader>
        ) : null}

        <DialogBody divider={true} className="h-[30vw] overflow-scroll">
          <form id="impuForm">
            <div className="flex flex-wrap -mx-3 mb-6 border-2 rounded-xl p-4">
              <div className=" w-full md:w-full px-3 mt-3  md:mb-0">
                <Typography variant="h5" className="mb-5">
                  Datos del movimiento
                </Typography>
              </div>
              <div className=" w-full md:w-1/4 px-3 mt-6  md:mb-0">
                <Input
                  size="md"
                  label="Fecha"
                  type="date"
                  inputRef={fechaRef}
                />
              </div>
              <div className=" w-full md:w-1/4 px-3 mt-6  md:mb-0">
                <Select
                  className=" text-sm rounded-xl"
                  placeholder="Cuenta"
                  options={cuentas.map((i) => ({
                    label: `${i.DESC}`,
                    value: `${i.CODI}-${i.CUEN}-${i.DESC}`,
                  }))}
                  onChange={(value) => {
                    handleChange("cuenta", value.value);
                  }}
                />
              </div>
              <div className=" w-full md:w-1/4 px-3 mt-6  md:mb-0">
                <Select
                  className=" text-sm rounded-xl"
                  placeholder="Comprobante"
                  options={tipoFac.map((i) => ({
                    label: `${i.tipo_factura}`,
                    value: `${i.tipo_factura}`,
                  }))}
                  onChange={(value) => {
                    handleChange("comprobante", value.value);
                  }}
                />
              </div>
              <div className=" w-full md:w-1/4 px-3 mt-6  md:mb-0">
                <Input
                  size="md"
                  label="Serie"
                  type="number"
                  inputRef={serieRef}
                />
              </div>
              <div className=" w-full md:w-1/4 px-3 mt-6  md:mb-0">
                <Input
                  size="md"
                  label="N° Comprobante"
                  type="number"
                  inputRef={nroCompRef}
                />
              </div>
              <div className=" w-full md:w-1/4 px-3 mt-6  md:mb-0">
                <Input
                  size="md"
                  label="Importe"
                  type="number"
                  inputRef={importeRef}
                />
              </div>
              <div className=" w-full md:w-1/4 px-3 mt-6  md:mb-0">
                <Input size="md" label="CUIT" type="text" inputRef={cuitRef} />
              </div>
              <div className=" w-full md:w-full px-3 mt-6  md:mb-0">
                <Textarea
                  rows={5}
                  label="Detalle"
                  onChange={(value) => {
                    handleChange("detalle", value);
                  }}
                />
              </div>
            </div>
          </form>
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
              color="green"
              icon={
                <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
              }
            >
              {alertas}
            </Alert>
          ) : null}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="blue"
            className="ml-1"
            onClick={() => preRegImputacion(movim)}
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
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
