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
import ListadoRecibos from "@/components/cobranza/ListadoRecibos";
import Restringed from "@/components/auth/Restringed";

function listadorecibos(props) {
  const [recibos, guardarRecibos] = useState([]);

  const { usu } = useWerchow();

  const { isLoading } = useUser();

  const traerRecibos = async () => {
    if (usu.perfil === 1 || usu.perfil === 3) {
      await axios
        .get(`/api/cobranza`, {
          params: {
            f: "listado recibos admin",
          },
        })
        .then((res) => {
          if (res.data) {
            guardarRecibos(res.data);
          }
        })
        .catch((error) => {
          console.log(error);

          toast.error("Ocurrio un error al generar el listado de cajas");
        });
    } else {
      await axios
        .get(`/api/cobranza`, {
          params: {
            f: "listado recibos",
            operador: usu.usuario,
          },
        })
        .then((res) => {
          if (res.data) {
            guardarRecibos(res.data);
          }
        })
        .catch((error) => {
          console.log(error);

          toast.error("Ocurrio un error al generar el listado de recibos");
        });
    }
  };

  const anularRec = async (id, contrato, recibo, serie, importe) => {
    await confirmAlert({
      title: "ATENCION",
      message: "¿Seguro quieres anular el recibo seleccionado?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            let data = {
              f: "anular recibo",
              id: id,
            };

            axios
              .put("/api/cobranza", data)
              .then((res) => {
                if (res.status === 200) {
                  toast.success("El recibo fue anulado");

                  let hist = {
                    CONTRATO: contrato,
                    OPERADOR: usu.usuario,
                    ACCION: `Anulacion de recibo ${serie}-${recibo}, con un importe de $${importe} . `,
                    FECHA: moment().format("DD/MM/YYYY HH:mm"),
                    f: "reg historia",
                  };

                  registrarHistoria(hist);

                  setTimeout(() => {
                    traerRecibos();
                  }, 500);
                }
              })
              .catch((error) => {
                console.log(error);
                toast.error("Ocurrio un error al anular el recibo");
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            toast.info("Accion cancelada, el recibo sigue activo");
          },
        },
      ],
    });
  };

  useSWR("/api/cobranza", traerRecibos);

  if (isLoading === true) return <Skeleton />;

  return (
    <>
      {!usu ? (
        <Redirect />
      ) : (
        <>
          {usu.perfil === 1 || usu.perfil === 3 ? (
            <ListadoRecibos listado={recibos} anularRec={anularRec} />
          ) : (
            <>
              <Restringed />
            </>
          )}
        </>
      )}
    </>
  );
}

export default listadorecibos;
