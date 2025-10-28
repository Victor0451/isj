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
import ReactToPrint from "react-to-print";

export default function ModalAfiliacion({
  ficha,
  cuotasRef,
  handleVigencia,
  handleBlur,
  vigencia,
  cuotas,
  errores,
  showAfi,
  regAfi,
}) {
  let componentRef = React.createRef();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <Fragment>
      <Button className=" bg-gray-900" size="sm" onClick={handleOpen}>
        Solicitud de Afiliacion
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
        <DialogHeader>Solicitud de Afiliacion</DialogHeader>
        <DialogBody divider={true} className="h-[45vw] overflow-scroll">
          <div className="grid md:grid-cols-4 md:gap-6 mt-6">
            <div className="relative w-full mb-6 group">
              <Input
                size="md"
                label="Cuotas Adeudadas"
                type="number"
                inputRef={cuotasRef}
                onChange={handleVigencia}
                onBlur={handleBlur}
              />
            </div>
            <div className="relative w-full mb-6 group">
              <Input
                size="md"
                label="Cuotas Adeudadas"
                type="text"
                value={vigencia}
                readOnly
              />
            </div>
            <div className="relative w-full mb-6 group">
              <ReactToPrint
                onAfterPrint={() => {
                  regAfi();
                  handleOpen();
                }}
                trigger={() => <Button id="btn">Imprimir</Button>}
                content={() => componentRef}
              />
            </div>
          </div>

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

          {showAfi === true ? (
            <div className="p-2 -mt-5" ref={(el) => (componentRef = el)}>
              <div className="border-2 rounded-xl p-4 mt-5">
                <div className="grid md:grid-cols-2 md:gap-6 mt-6">
                  <div className=" flex justify-start ">
                    <img
                      className="smlogonoti"
                      src="/img/logo.png"
                      alt="werchowlogo"
                    />
                  </div>
                  <div className="flex justify-end">
                    <font size="4">
                      San Salvador de Jujuy,{" "}
                      <u>{moment().format("DD/MM/YYYY")}</u>
                    </font>
                  </div>
                </div>

                <div className=" mt-8">
                  <Typography variant="paragraph" className="mt-2">
                    <strong>
                      <u>Sr/A. Afiliado</u>: {""}
                    </strong>
                    {ficha.APELLIDOS}, {ficha.NOMBRES}
                  </Typography>

                  <Typography variant="paragraph" className="mt-2">
                    <strong>
                      <u>Legajo</u>:
                    </strong>{" "}
                    {ficha.CONTRATO}
                  </Typography>

                  <Typography variant="paragraph" className="mt-2">
                    <strong>
                      <u>Nueva Vigencia De Sepelio</u>:
                    </strong>{" "}
                    {vigencia ? <strong>{vigencia}</strong> : null}
                  </Typography>
                </div>

                <div className="flex justify-center mt-8">
                  <Typography variant="h4">
                    <u>Solicitud de Afiliacion</u>
                  </Typography>
                </div>

                <p className="text-justify mt-2 p-2">
                  <Typography variant="paragraph">
                    Por la presente solicito la afiliación a la Empresa Mutual
                    I.S.J. Servicios Sociales, a los efectos de poder efectivizar el pago de la
                    cuota de inscripción. Asimismo acepto que de conformidad a
                    las condiciones de la contratación,la nueva fecha de
                    vigencia es {vigencia ? <strong>{vigencia}</strong> : null},
                    en lo que se refiere al servicio de sepelio, para los
                    servicios médicos la vigencia es de 48 hs.
                  </Typography>
                </p>

                <div className="grid md:grid-cols-3 md:gap-6 mt-6">
                  <div className=" grid md:grid-cols-1 md:gap-6 mt-6 ">
                    <div className="flex justify-center">
                      <strong>
                        ...........................................
                      </strong>
                    </div>
                    <div className="flex justify-center">
                      <label>Firma</label>
                    </div>
                  </div>
                  <div className=" grid md:grid-cols-1 md:gap-6 mt-6 ">
                    <div className="flex justify-center">
                      <strong>
                        ...........................................
                      </strong>
                    </div>
                    <div className="flex justify-center">
                      <label>Aclaración</label>
                    </div>
                  </div>
                  <div className=" grid md:grid-cols-1 md:gap-6 mt-6 ">
                    <div className="flex justify-center">
                      <strong>
                        ...........................................
                      </strong>
                    </div>
                    <div className="flex justify-center">
                      <label>DNI</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
