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

export default function ModalPagoCero({
  mes0Ref,
  ano0Ref,
  fclose,
  errores,
  regPag0,
}) {
  let componentRef = React.createRef();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <Fragment>
      <Button className=" bg-gray-900" size="sm" onClick={handleOpen}>
        Pago Cero
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
        <DialogHeader>Asignacion Pago Cero</DialogHeader>
        <DialogBody divider={true} className="h-[25vw] overflow-scroll">
          <Typography variant="h6" color="blue-gray" className="mb-6">
            Registrar Pago Cero
          </Typography>
          <div className="border-2 rounded-xl p-4 grid md:grid-cols-4 md:gap-6 mt-6">
            <div className="relative w-full mb-6 group">
              <Input size="md" label="Mes" type="number" inputRef={mes0Ref} />
            </div>
            <div className="relative w-full mb-6 group">
              <Input size="md" label="Año" type="number" inputRef={ano0Ref} />
            </div>
            <div className="relative w-full mb-6 group">
              <Button
                onClick={() => {
                  if (fclose === true) {
                    handleOpen();
                    regPag0();
                  } else if (fclose === false) {
                    regPag0();
                  }
                }}
              >
                Reg. Pago Cero
              </Button>
            </div>
          </div>

          <hr className="mt-5 mb-5 border-2" />

          {errores ? (
            <Alert
              color="red"
              icon={
                <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
              }
            >
              {errores}
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
