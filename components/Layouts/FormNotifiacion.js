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
import CardNotificacion from "./CardNotificacion";

const FormNotifiacion = ({ msj, prest, orde }) => {
  return (
    <Card className="h-full w-full p-4 ">
      <CardBody className="rounded-none">
        <Typography variant="h2">Notificaciones</Typography>

        <div className="mt-5 grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-3 p-4">
          <CardNotificacion
            titulo={"Mails Sin Leer"}
            descripcion={
              "Accede a la bandeja de entrada para revisar tus mensajes"
            }
            url={"/mail/inbox"}
            noti={msj}
          />

          <CardNotificacion
            titulo={"Prestamos Pendientes"}
            descripcion={
              "Accede al listado de prestamos pendientes de aprobacion"
            }
            url={"/prestamos/listadoprestamos"}
            noti={prest}
          />

          <CardNotificacion
            titulo={"Ordenes de Pago Pendientes"}
            descripcion={"Accede al listado de ordenes de pago pendientes"}
            url={"/ordenpago/listadoorden"}
            noti={orde}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default FormNotifiacion;
