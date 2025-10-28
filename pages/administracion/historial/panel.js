import React, { useState } from "react";
import useUser from "@/hook/useUser";
import { Redirect } from "@/components/auth/Redirect";

import { Skeleton } from "@/components/Layouts/Skeleton";
import useWerchow from "@/hook/useWerchow";
import useSWR from "swr";
import axios from "axios";
import PanelHistorial from "@/components/adminisracion/historial/PanelHistorial";
import { toast } from "react-toastify";

function panel(props) {
  const [operadores, guardarOperadores] = useState([]);
  const [historial, guardarHistorial] = useState([]);
  const [operSel, guardarOperSel] = useState("");
  const [loading, guardarLoading] = useState(0);

  const { usu } = useWerchow();

  const { isLoading } = useUser();

  const traerInfo = async () => {
    await axios
      .get("/api/auth", {
        params: {
          f: "operadores",
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          guardarOperadores(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al traer el listado de operadores");
      });
  };

  const handleChange = (f, value) => {
    if (f === "operador") {
      guardarOperSel(value);
    }
  };

  const traerHistorial = async (f) => {
    if (f === "T") {
      guardarOperSel("");
    }

    toast.info(
      "Generando Historial... Este proceso puede demorar unos segundo, Espera el mensaje de finalizacion"
    );

    guardarLoading(1);

    guardarHistorial([]);

    await axios
      .get("/api/historia", {
        params: {
          f: "traer historial",
          operador: operSel,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          guardarHistorial(res.data);
          toast.success("Historial Generado");
          guardarLoading(0);
        } else {
          toast.info("No se encontraron registros");
          guardarLoading(2);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al generar el historial");
        guardarLoading(2);
      });
  };

  useSWR("/api/historial", traerInfo);

  if (isLoading === true) return <Skeleton />;
  return (
    <>
      {!usu ? (
        <Redirect />
      ) : usu ? (
        <>
          <PanelHistorial
            operadores={operadores}
            handleChange={handleChange}
            traerHistorial={traerHistorial}
            historial={historial}
            loading={loading}
          />
        </>
      ) : null}
    </>
  );
}

export default panel;
