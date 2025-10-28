import React, { Fragment, useState } from "react";
import parse from "html-react-parser";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { EyeIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import { Archivo } from "../archivos/Archivo";
import Link from "next/link";

const ModalLeerMsj = ({ row, archivos, traerArchivos }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <Fragment>
      <EyeIcon
        color="#0288d1"
        className="butlist mt-px h-6 w-6"
        onClick={() => {
          handleOpen();
          traerArchivos(row.codmail);
        }}
      />

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="xl"
      >
        <DialogHeader>Mail</DialogHeader>
        <DialogBody divider className="h-[45vw] overflow-scroll">
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative w-full mb-6 group">
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative w-full mb-6 group">
                  <Input label="Envia" defaultValue={row.envia} readOnly />
                </div>
                <div className="relative w-full mb-6 group">
                  <Input
                    label="Fecha"
                    defaultValue={moment(row.fecha).format("DD/MM/YYYY HH:mm")}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" mb-10">
            <Input label="Asunto" defaultValue={row.asunto} readOnly />
          </div>

          <div className="border-2 rounded-xl p-4">
            {row.descrip ? <>{parse(`${row.descrip}`)}</> : <>Sin Contenido</>}
          </div>

          <hr className="border-2 mt-5 mb-5" />

          <div className="p-4 border-2 rounded-lg mt-6">
            <Typography variant="h5" color="blue-gray" className="mb-6">
              Cajas Adjuntadas
            </Typography>

            <Link href={`${row.url_caja}`} target="_blank">
              <strong>Este enlace te lleva a la caja adjuntada.</strong>
            </Link>
          </div>

          <hr className="border-2 mt-5 mb-5" />
          <div className="p-4 border-2 rounded-lg mt-6">
            <Typography variant="h5" color="blue-gray" className="mb-6">
              Archivos Adjuntos
            </Typography>

            <div className="grid md:grid-cols-3 md:gap-6">
              {archivos.length > 0 ? (
                <>
                  {archivos.map((a, index) => (
                    <div key={index} className="relative z-0 w-full mb-6 group">
                      <Archivo
                        url={"api/archivos/mails/archivo/"}
                        urlDesc={"api/archivos/mails/descargararchivo/"}
                        archivo={a.adjunto}
                        eliminarArchivos={() => {}}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <Alert
                  className="mt-5 mb-5"
                  color="blue"
                  icon={
                    <InformationCircleIcon
                      strokeWidth={2}
                      className="h-6 w-6"
                    />
                  }
                >
                  No hay adjuntos
                </Alert>
              )}
            </div>
          </div>
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
};

export default ModalLeerMsj;
