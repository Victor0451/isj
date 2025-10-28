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
import jsCookie from "js-cookie";
import FormImpCaja from "@/components/caja/FormImpCaja";

function impresioncaja(props) {
  let cajaRef = React.createRef();
  const [ingresos, guardarIngresos] = useState([]);
  const [egresos, guardarEgresos] = useState([]);

  const { usu } = useWerchow();

  const { isLoading } = useUser();

  let params = useRouter();

  if (params.query.fecha) {
    jsCookie.set("fecha", params.query.fecha, { expires: 1 });
    jsCookie.set("usucaja", params.query.usucaja, { expires: 1 });
  }

  const traerCaja = async () => {
    if (jsCookie.get("fecha")) {
      await axios
        .get("/api/caja", {
          params: {
            fecha: jsCookie.get("fecha"),
            usuario: jsCookie.get("usucaja"),
            f: "traer ingresos caja fecha",
          },
        })
        .then((res) => {
          if (res.data) {
            let caj = JSON.parse(res.data);
            guardarIngresos(caj);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ocurrio un error al traer los datos de la ficha");
        });

      await axios
        .get("/api/caja", {
          params: {
            fecha: jsCookie.get("fecha"),
            usuario: jsCookie.get("usucaja"),
            f: "traer egresos caja fecha",
          },
        })
        .then((res) => {
          if (res.data) {
            let caj = JSON.parse(res.data);
            guardarEgresos(caj);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ocurrio un error al traer los datos de la ficha");
        });
    }
  };
  const totales = (f, arr, arr2) => {
    let total = 0;
    let ing = 0;
    let egr = 0;

    if (f === "I") {
      for (let i = 0; i < arr.length; i++) {
        ing += parseFloat(arr[i].IMPORTE);
      }

      return ing.toFixed(2);
    } else if (f === "E") {
      for (let i = 0; i < arr.length; i++) {
        egr += parseFloat(arr[i].IMPORTE);
      }

      return egr.toFixed(2);
    } else if (f === "D") {
      for (let i = 0; i < arr.length; i++) {
        ing += parseFloat(arr[i].IMPORTE);
      }

      for (let i = 0; i < arr2.length; i++) {
        egr += parseFloat(arr2[i].IMPORTE);
      }

      total = ing - egr;

      return total.toFixed(2);
    }
  };

  useSWR("/api/caja", traerCaja);

  if (isLoading === true) return <Skeleton />;

  return (
    <>
      {!usu ? (
        <Redirect />
      ) : (
        <>
          <FormImpCaja
            ingresos={ingresos}
            egresos={egresos}
            totales={totales}
            fecha={jsCookie.get("fecha")}
            cajaRef={cajaRef}
          />
        </>
      )}
    </>
  );
}

export default impresioncaja;
