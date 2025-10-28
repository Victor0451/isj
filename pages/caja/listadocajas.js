import React, { useState } from "react";
import useUser from "@/hook/useUser";
import { Skeleton } from "@/components/Layouts/Skeleton";
import useWerchow from "@/hook/useWerchow";
import axios from "axios";
import { toast } from "react-toastify";
import { Redirect } from "@/components/auth/Redirect";
import useSWR from "swr";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";
import { registrarHistoria, regHistorialSocio } from "@/libs/funciones";
import Router, { useRouter } from "next/router";
import ListadoCajas from "@/components/caja/ListadoCajas";
import jsCookie from "js-cookie";

function listadocajas(props) {
  const [cajas, guardarCajas] = useState([]);

  const { usu } = useWerchow();

  const { isLoading } = useUser();

  const traerCajas = async () => {
    if (usu.perfil === 1 || usu.perfil === 3) {
      await axios
        .get(`/api/caja`, {
          params: {
            f: "listado cajas admin",
          },
        })
        .then((res) => {
          if (res.data) {
            let cajas = JSON.parse(res.data);

            guardarCajas(cajas);
          }
        })
        .catch((error) => {
          console.log(error);

          toast.error("Ocurrio un error al generar el listado de cajas");
        });
    } else {
      await axios
        .get(`/api/caja`, {
          params: {
            f: "listado cajas",
            operador: usu.usuario,
          },
        })
        .then((res) => {
          if (res.data) {
            let cajas = JSON.parse(res.data);

            guardarCajas(cajas);
          }
        })
        .catch((error) => {
          console.log(error);

          toast.error("Ocurrio un error al generar el listado de cajas");
        });
    }
  };

  useSWR("/api/caja", traerCajas);

  if (isLoading === true) return <Skeleton />;

  return (
    <>
      {!usu ? (
        <Redirect />
      ) : (
        <>
          <ListadoCajas listado={cajas} />
        </>
      )}
    </>
  );
}

export default listadocajas;
