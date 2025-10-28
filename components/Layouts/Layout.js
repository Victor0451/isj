import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../Navbar/Navbar";
import useUser from "@/hook/useUser";
import useSWR from "swr";
import axios from "axios";

export const Layout = ({ children }) => {
  const [msj, guardarMensajes] = useState(0);
  const [prest, guardarPrest] = useState(0);
  const [orde, guardarOrde] = useState(0);

  const { user, isLoading } = useUser();

  const traerNotificaciones = async () => {
    if (user) {
      let usu = JSON.parse(user.name);

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
    }
  };

  useSWR("/api/ordenpago", traerNotificaciones);

  return (
    <div className='div className="min-h-full"'>
      <Head>
        <title>MUTUAL ISJ</title>

        {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"/> */}
      </Head>

      <main>
        {!user ? null : (
          <Navbar
            user={JSON.parse(user.name)}
            msj={msj}
            prest={prest}
            orde={orde}
          />
        )}

        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>

      {/* <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossOrigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.min.js" integrity="sha384-VHvPCCyXqtD5DqJeNxl2dtTyhF78xXNXdkwX1CZeRusQfRKp+tA7hAShOK/B/fQ2" crossOrigin="anonymous"></script> */}
    </div>
  );
};
