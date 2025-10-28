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
import ListadoHistorialCuota from "./ListadoHistorialCuotas";

export default function ModalActualizarCuota({
  errores,
  histCuotas,
  cuotaMensual,
  nuCuotaRef,
  actCuota,
  fclose,
  alerCuo,
  confirmacion,
}) {
  let componentRef = React.createRef();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <Fragment>
      <Button className=" bg-gray-900" size="sm" onClick={handleOpen}>
        <>{alerCuo ? <>Registrar Cuota</> : <>Actualizar Cuota</>}</>
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
        <DialogHeader>Actualizar Cuota</DialogHeader>
        <DialogBody divider={true} className="h-[45vw] overflow-scroll">
          <Typography variant="h6" color="blue-gray" className="mb-6">
            Modificar Cuota
          </Typography>
          <div className="border-2 rounded-xl p-4 grid md:grid-cols-4 md:gap-6 mt-6">
            <div className="relative w-full mb-6 group">
              <Input
                size="md"
                label="Cuota Actual"
                type="text"
                readOnly
                value={`$${cuotaMensual}`}
              />
            </div>
            <div className="relative w-full mb-6 group">
              <Input
                size="md"
                label="Nueva Cuota"
                type="number"
                inputRef={nuCuotaRef}
              />
            </div>
            <div className="relative w-full mb-6 group">
              <Button
                onClick={() => {
                  if (fclose === true) {
                    handleOpen();
                    actCuota();
                  } else if (fclose === false) {
                    actCuota();
                  }
                }}
              >
                Actualizar
              </Button>
            </div>
          </div>

          <hr className="mt-5 mb-5 border-2" />

          <Typography variant="h6" color="blue-gray" className="mb-6">
            Historial de Cuota Mensual
          </Typography>
          <div className="border-2 rounded-xl p-4">
            <ListadoHistorialCuota listado={histCuotas} />
          </div>

          {errores ? (
            <Alert
              color="red"
              className="mt-5"
              icon={
                <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
              }
            >
              {errores}
            </Alert>
          ) : null}

          {confirmacion ? (
            <Alert
              color="green"
              className="mt-5"
              icon={
                <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
              }
            >
              {confirmacion}
            </Alert>
          ) : null}
        </DialogBody>
        <DialogFooter>
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
