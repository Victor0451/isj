import React, { useState } from "react";
import useUser from "@/hook/useUser";
import { Skeleton } from "@/components/Layouts/Skeleton";
import useWerchow from "@/hook/useWerchow";
import axios from "axios";
import { toast } from "react-toastify";
import { Redirect } from "@/components/auth/Redirect";
import useSWR from "swr";
import { confirmAlert } from "react-confirm-alert";
import moment, { months } from "moment";
import { registrarHistoria, regHistorialSocio } from "@/libs/funciones";
import FormImpRecibo from "@/components/cobranza/FormImpRecibo";
import Router, { useRouter } from "next/router";
import jsCookie from "js-cookie";

function ImpresionRecibo(props) {
  let recRef = React.createRef();

  const { usu } = useWerchow();

  const { isLoading } = useUser();

  const [datos, guardarDatos] = useState(null);
  const [socio, guardarSocio] = useState(null);

  let router = useRouter();
  if (router.query.serie) {
    jsCookie.set("serie", router.query.serie ,{expires:1});
    jsCookie.set("rec", router.query.rec ,{expires:1});
    jsCookie.set("contrato", router.query.contrato ,{expires:1});
    jsCookie.set("fecha", router.query.fecha ,{expires:1});
  }

  const traerDatos = async () => {
    if (jsCookie.get("serie")) {
      const serie = jsCookie.get("serie");
      const rec = jsCookie.get("rec");
      const contrato = jsCookie.get("contrato");
      const fecha = jsCookie.get("fecha");

      await axios
        .get(`/api/cobranza`, {
          params: {
            rec: rec,
            contrato: contrato,
            fecha: fecha,
            serie: serie,
            f: "traer recibo",
          },
        })
        .then((res) => {
          guardarDatos(res.data);

          axios
            .get("/api/socios", {
              params: {
                f: "maestro contrato",
                ficha: res.data[0].CONTRATO,
              },
            })
            .then((res1) => {
              if (res1.data) {
                let ficha = JSON.parse(res1.data);
                guardarSocio(ficha);
              }
            })
            .catch((error) => {
              console.log(error);
              toast.error("Ocurrio un error al traer los datos del socio");
            });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ocurrio un error al traer los datos del recibo");
        });
    }
  };

  const totalCuotas = (arr) => {
    let total = 0;

    for (let i = 0; i < arr.length; i++) {
      total += parseFloat(arr[i].IMPORTE);
    }

    return total;
  };

  useSWR("/api/cobranza", traerDatos);

  if (isLoading === true) return <Skeleton />;

  return (
    <>
      {!usu ? (
        <Redirect />
      ) : (
        <>
          {datos && socio ? (
            <FormImpRecibo
              datos={datos}
              socio={socio}
              totalCuotas={totalCuotas}
              recRef={recRef}
            />
          ) : null}
        </>
      )}
    </>
  );
}

export default ImpresionRecibo;
