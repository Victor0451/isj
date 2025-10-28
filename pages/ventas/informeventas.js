import React, { useState } from "react";
import useUser from "@/hook/useUser";
import { Skeleton } from "@/components/Layouts/Skeleton";
import useWerchow from "@/hook/useWerchow";
import axios from "axios";
import { toast } from "react-toastify";
import { Redirect } from "@/components/auth/Redirect";
import useSWR from "swr";
import { confirmAlert } from "react-confirm-alert";
import { registrarHistoria, regHistorialSocio } from "@/libs/funciones";
import FormInformeVentas from "@/components/ventas/FormInformeVentas";

function informeventas(props) {
  let desdeRef = React.createRef();
  let HastaRef = React.createRef();

  const [errores, guardarErrores] = useState(null);
  const [mesSel, guardarMesSel] = useState("");
  const [anoSel, guardarAnoSel] = useState("");
  const [listado, guardarListado] = useState([]);
  const [desdeInf, guardarDesdeInf] = useState("");
  const [hastaInf, guardarHastaInf] = useState("");
  const [cuotaInf, guardarCuotaInf] = useState("");

  const { usu } = useWerchow();

  const { isLoading } = useUser();

  const handleChange = async (f, value) => {
    if (f === "mes") {
      guardarMesSel(value);
    } else if (f === "ano") {
      guardarAnoSel(value);
    }
  };

  const generarInforme = async () => {
    guardarErrores(null);

    let desde = desdeRef.current.value;
    let hasta = HastaRef.current.value;

    if (desde === "") {
      guardarErrores("Debes seleccionar la fecha de inicio del rango");
    } else if (hasta === "") {
      guardarErrores("Debes seleccionar la fecha finalizacion del rango");
    } else if (mesSel === "") {
      guardarErrores("Debes seleccionar el mes de la cuota a verificar");
    } else if (anoSel === "") {
      guardarErrores("Debes seleccionar el año de la cuota a verificar");
    } else {
      guardarDesdeInf(desde);
      guardarHastaInf(hasta);

      let mesEnv;

      if (mesSel < 10) {
        mesEnv = `0${mesSel}`;
      }

      guardarCuotaInf(`${mesEnv}/${anoSel}`);

      await axios
        .get("/api/ventas", {
          params: {
            f: "informe ventas",
            desde: desde,
            hasta: hasta,
            mes: mesEnv,
            ano: anoSel,
          },
        })
        .then((res) => {
          if (res.data) {
            let dat = JSON.parse(res.data);

            guardarListado(dat);
          }
        })
        .catch((error) => {
          console.log(error);

          toast.error("Ocurrio un error al generar el listado de ventas");
        });
    }
  };

  if (isLoading === true) return <Skeleton />;

  return (
    <>
      {!usu ? (
        <Redirect />
      ) : (
        <>
          <FormInformeVentas
            desdeRef={desdeRef}
            HastaRef={HastaRef}
            handleChange={handleChange}
            generarInforme={generarInforme}
            errores={errores}
            listado={listado}
            desdeInf={desdeInf}
            hastaInf={hastaInf}
            cuotaInf={cuotaInf}
          />
        </>
      )}
    </>
  );
}

export default informeventas;
