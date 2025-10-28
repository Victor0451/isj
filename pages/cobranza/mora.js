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
import FormMora from "@/components/cobranza/FormMora";

function Mora(props) {
  let componentRef = React.createRef();

  const [errores, guardarErrores] = useState(null);
  const [mesSel, guardarMesSel] = useState("");
  const [anoSel, guardarAnoSel] = useState("");
  const [cCob, guardarCCob] = useState([]);
  const [cOf, guardarCOf] = useState([]);
  const [cbanco, guardarCbanco] = useState([]);
  const [cbancoP, guardarCbancoP] = useState([]);
  const [cpolicia, guardarCpolicia] = useState([]);
  const [ctjt, guardarCtjt] = useState([]);

  const { usu } = useWerchow();

  const { isLoading } = useUser();

  const handleChange = async (f, value) => {
    if (f === "mes") {
      guardarMesSel(value);
    } else if (f === "ano") {
      guardarAnoSel(value);
    }
  };

  const traerInfo = async () => {
    if (mesSel === "") {
      guardarErrores("Debes seleccionar el mes a analizar");
    } else if (anoSel === "") {
      guardarErrores("Debes seleccionar el año a analizar");
    } else {
      await axios
        .get(`/api/mora`, {
          params: {
            mes: mesSel,
            ano: anoSel,
            f: "traer mcob",
          },
        })
        .then((res) => {
          if (res.data) {
            let list = JSON.parse(res.data);
            guardarCCob(list);
          } else {
            toast.info("Aun no se genero la cartera c1000 en este mes");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ocurrio un error al generar c1000");
        });

      await axios
        .get(`/api/mora`, {
          params: {
            mes: mesSel,
            ano: anoSel,
            f: "traer mof",
          },
        })
        .then((res) => {
          if (res.data) {
            let list = JSON.parse(res.data);
            guardarCOf(list);
          } else {
            toast.info("Aun no se genero la cartera c1000 en este mes");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ocurrio un error al generar c1000");
        });

      await axios
        .get(`/api/mora`, {
          params: {
            mes: mesSel,
            ano: anoSel,
            f: "traer mtjt",
          },
        })
        .then((res) => {
          if (res.data) {
            let list = JSON.parse(res.data);
            guardarCtjt(list);
          } else {
            toast.info("Aun no se genero la cartera ctjt en este mes");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ocurrio un error al generar ctjt");
        });

      await axios
        .get(`/api/mora`, {
          params: {
            mes: mesSel,
            ano: anoSel,
            f: "traer mbanco activo",
          },
        })
        .then((res) => {
          if (res.data) {
            let list = JSON.parse(res.data);
            guardarCbanco(list);
          } else {
            toast.info("Aun no se genero la cartera cbanco en este mes");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ocurrio un error al generar cbanco");
        });

      await axios
        .get(`/api/mora`, {
          params: {
            mes: mesSel,
            ano: anoSel,
            f: "traer mbanco pasivo",
          },
        })
        .then((res) => {
          if (res.data) {
            let list = JSON.parse(res.data);
            guardarCbancoP(list);
          } else {
            toast.info("Aun no se genero la cartera cbanco en este mes");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ocurrio un error al generar cbanco");
        });

      await axios
        .get(`/api/mora`, {
          params: {
            mes: mesSel,
            ano: anoSel,
            f: "traer mpolicia",
          },
        })
        .then((res) => {
          if (res.data) {
            let list = JSON.parse(res.data);
            guardarCpolicia(list);
          } else {
            toast.info("Aun no se genero la cartera cpolicia en este mes");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ocurrio un error al generar cpolicia");
        });
    }
  };

  const porcent = (adel, emi, cob) => {
    let efect = 0;

    let emiTot = parseFloat(emi) + parseFloat(adel);
    let cobTot = parseFloat(cob) + parseFloat(adel);

    efect = (cobTot * 100) / emiTot;

    return efect.toFixed(2);
  };

  const totates = (arr, f) => {
    let total = 0;

    if (f === "fichas") {
      for (let i = 0; i < arr.length; i++) {
        total += parseInt(arr[i].fichas);
      }

      return total;
    } else if (f === "mora") {
      for (let i = 0; i < arr.length; i++) {
        total += parseFloat(arr[i].mora);
      }

      return total.toFixed(2);
    }
  };

  let totArr = cCob.concat(cOf.concat(cbanco.concat(cbancoP.concat(cpolicia))));

  if (isLoading === true) return <Skeleton />;

  return (
    <>
      {!usu ? (
        <Redirect />
      ) : (
        <>
          <FormMora
            handleChange={handleChange}
            traerInfo={traerInfo}
            errores={errores}
            cCob={cCob}
            cOf={cOf}
            ctjt={ctjt}
            cbanco={cbanco}
            cbancoP={cbancoP}
            cpolicia={cpolicia}
            totArr={totArr}
            porcent={porcent}
            totales={totates}
            componentRef={componentRef}
          />
        </>
      )}
    </>
  );
}

export default Mora;
