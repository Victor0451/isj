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
import ListadoCuentas from "./ListadoCuentas";

export default function ModalCtaTjt({
  errores,
  ficha,
  cuentaRef,
  observacionRef,
  regDebCred,
  fclose,
  cuenta,
}) {
  let componentRef = React.createRef();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <Fragment>
      <Button className=" bg-gray-900" size="sm" onClick={handleOpen}>
        Registrar N° Tarjeta/Cuenta
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
        <DialogHeader>
          Registros de datos para el descuento automatico
        </DialogHeader>
        <DialogBody divider={true} className="h-[35vw] overflow-scroll">
          <div className="border-2 rounded-xl p-4 mt-6">
            <Typography variant="h6" color="blue-gray" className="mb-6">
              Alta de Credito/Debito
            </Typography>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/5 px-3 mt-6 mb-6 md:mb-0">
                <Input
                  size="md"
                  label="Contrato"
                  type="number"
                  readOnly
                  value={ficha.CONTRATO}
                />
              </div>
              <div className="w-full md:w-1/5 px-3 mt-6 mb-6 md:mb-0">
                <Input
                  size="md"
                  label="DNI Titular"
                  type="number"
                  readOnly
                  value={ficha.NRO_DOC}
                />
              </div>
              <div className="w-full md:w-1/5 px-3 mt-6 mb-6 md:mb-0">
                <Input
                  size="md"
                  label="Grupo"
                  type="number"
                  readOnly
                  value={ficha.GRUPO}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
                <Input
                  size="md"
                  label="Nro Tarjeta/ Cuenta Bancaria"
                  type="number"
                  inputRef={cuentaRef}
                />
              </div>
              <div className="w-full md:w-full px-3 mt-6 mb-6 md:mb-0">
                <Input
                  size="md"
                  label="Observacion"
                  type="text"
                  inputRef={observacionRef}
                />
              </div>
            </div>

            {errores ? (
              <Alert
                color="red"
                className="mt-6 mb-6"
                icon={
                  <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
                }
              >
                {errores}
              </Alert>
            ) : null}

            <div className="flex justify-end mt-8">
              <Button
                onClick={() => {
                  if (fclose === true) {
                    handleOpen();
                    regDebCred();
                  } else if (fclose === false) {
                    regDebCred();
                  }
                }}
              >
                Registrar
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

            <hr className="mt-5 mb-5 border-2" />

            <Typography variant="h6" color="blue-gray" className="mb-6">
              Cuentas Registradas
            </Typography>
            <div className="border-2 rounded-xl p-4">
              <ListadoCuentas listado={cuenta} />
            </div>
          </div>
        </DialogBody>
        <DialogFooter></DialogFooter>
      </Dialog>
    </Fragment>
  );
}
