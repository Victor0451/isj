import React, { useState } from "react";
import useUser from "@/hook/useUser";
import { Redirect } from "@/components/auth/Redirect";
import { Skeleton } from "@/components/Layouts/Skeleton";
import useWerchow from "@/hook/useWerchow";
import useSWR from "swr";
import axios from "axios";
import FormNotifiacion from "@/components/Layouts/FormNotifiacion";

export default function notificaciones() {
  const [msj, guardarMensajes] = useState(0);
  const [prest, guardarPrest] = useState(0);
  const [orde, guardarOrde] = useState(0);

  const { usu } = useWerchow();

  const { isLoading } = useUser();

  const traerNotificaciones = async () => {
    await axios
      .get(`/api/mailinterno`, {
        params: {
          f: "noti entrada",
          usu: usu.usuario,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          guardarMensajes(res.data.length);
        }
      })
      .catch((error) => {
        console.log(error);
        toastr.error("Ocurrio un error al traer los mensajes", "ATENCION");
      });

    if (usu.perfil === 1 || usu.perfil === 3) {
      await axios
        .get(`/api/prestamos`, {
          params: {
            f: "list prest pendientes",
          },
        })
        .then((res) => {
          guardarPrest(res.data.length);
        })
        .catch((error) => {
          console.log(error);
        });

      await axios
        .get(`/api/ordenpago`, {
          params: {
            f: "traer ordenes pendientes",
          },
        })
        .then((res) => {
          guardarOrde(res.data.length);
        })
        .catch((error) => {
          console.log(error);
          toastr.error("Ocurrio un error al generar el listado", "ATENCION");
        });
    }
  };

  useSWR("/api/ordenpago", traerNotificaciones);

  if (isLoading === true) return <Skeleton />;

  return (
    <>
      {!usu ? (
        <Redirect />
      ) : usu ? (
        <>
          <FormNotifiacion msj={msj} prest={prest} orde={orde} />
        </>
      ) : null}
    </>
  );
}
