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
import FormEfectividad from "@/components/cobranza/FormEfectividad";

function efectividad(props) {
  let efecRef = React.createRef();

  const [errores, guardarErrores] = useState(null);
  const [mesSel, guardarMesSel] = useState("");
  const [anoSel, guardarAnoSel] = useState("");
  const [cOf, guardarCof] = useState([]);
  const [noData, guardarNoData] = useState(0);
  const [sinPago, guardarPSinPago] = useState([]);
  const [cuota, guardarCuota] = useState("");

  const { usu } = useWerchow();

  const { isLoading } = useUser();

  const handleChange = async (f, value) => {
    if (f === "mes") {
      guardarMesSel(value);
    } else if (f === "ano") {
      guardarAnoSel(value);
    }
  };

  const porcent = (adel, emi, cob) => {
    let efect = 0;

    let emiTot = parseFloat(emi);
    let cobTot = parseFloat(cob);

    efect = (cobTot * 100) / emiTot;

    if (!efect) {
      return 0;
    } else {
      return efect.toFixed(2);
    }
  };

  const totates = (arr, f) => {
    let total = 0;

    if (f === "emi") {
      for (let i = 0; i < arr.length; i++) {
        total += parseFloat(arr[i].total);
      }
      if (!total) {
        return 0;
      } else {
        return total.toFixed(2);
      }
    } else if (f === "fichas emi") {
      for (let i = 0; i < arr.length; i++) {
        total += parseInt(arr[i].fichas);
      }

      if (!total) {
        return 0;
      } else {
        return total;
      }
    } else if (f === "cob") {
      for (let i = 0; i < arr.length; i++) {
        total += parseFloat(arr[i].cobrado);
      }
      if (!total) {
        return 0;
      } else {
        return total.toFixed(2);
      }
    } else if (f === "fichas cob") {
      for (let i = 0; i < arr.length; i++) {
        total += parseInt(arr[i].fichascob);
      }

      if (!total) {
        return 0;
      } else {
        return total;
      }
    } else if (f === "adelantado") {
      for (let i = 0; i < arr.length; i++) {
        total += parseFloat(arr[i].adelantado);
      }

      if (!total) {
        return 0;
      } else {
        return total.toFixed(2);
      }
    }
  };

  const getEmiSO = async (tableName) => {
    let dat1 = [];
    let dat2 = [];
    let dat3 = [];

    await axios
      .get("/api/cobranza", {
        params: {
          tab: tableName,
          f: "ofi emi",
        },
      })
      .then((res) => {
        if (res.data) {
          let d1 = JSON.parse(res.data);
          dat1 = d1;
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al calcular la cartera emitida");
      });

    await axios
      .get("/api/cobranza", {
        params: {
          mes: mesSel,
          ano: anoSel,
          f: "ofi cob",
          tab: tableName,
        },
      })
      .then((res) => {
        if (res.data) {
          let d2 = JSON.parse(res.data);
          dat2 = d2;
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al calcular la cartera cobrada");
      });

    await axios
      .get("/api/cobranza", {
        params: {
          mes: mesSel,
          ano: anoSel,
          f: "ofi adel",
        },
      })
      .then((res) => {
        if (res.data) {
          let d3 = JSON.parse(res.data);
          dat3 = d3;
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al calcular la cartera cobrada");
      });

    if (dat1[0]) {
      let cOf = [
        {
          zona: dat1[0].zona,
          descr: dat1[0].descr,
          fichas: dat1[0].fichas,
          total: dat1[0].total,
          fichascob: dat2[0].fichascob,
          cobrado: dat2[0].cobrado,
          adelantado: dat3[0].adelantado,
        },
      ];

      guardarCof(cOf);
    }
  };

  const buscarEfect = async () => {
    guardarNoData(0);

    let mesEnv;

    if (mesSel < 10) {
      mesEnv = `0${mesSel}`;
    } else {
      mesEnv = mesSel;
    }

    let tableName = `so${mesEnv}${anoSel}`;

    await axios
      .get("/api/cobranza", {
        params: {
          tab: tableName,
          f: "check so",
        },
      })
      .then((res) => {
        if (res.data.length === 0) {
          toast.warning(
            `No hay datos generados para la efectividad de ${mesEnv}/${anoSel}`
          );
          guardarNoData(1);
        } else {
          guardarNoData(2);
          getEmiSO(tableName);
          guardarCuota(`${mesEnv}/${anoSel}`);
        }
      });
  };

  const generarPadronSinPago = async () => {
    let mesEnv;

    if (mesSel < 10) {
      mesEnv = `0${mesSel}`;
    }

    let tableName = `so${mesEnv}${anoSel}`;

    await axios
      .get("/api/cobranza", {
        params: {
          tab: tableName,
          f: "socios sin abonar",
          mes: mesSel,
          ano: anoSel,
        },
      })
      .then((res) => {
        if (res.data) {
          let dat = JSON.parse(res.data);
          guardarPSinPago(dat);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          `Ocurrio un error al generar el padron que aun no pago lel mes ${mesEnv}/${anoSel}`
        );
      });
  };

  if (isLoading === true) return <Skeleton />;

  return (
    <>
      {!usu ? (
        <Redirect />
      ) : (
        <>
          <FormEfectividad
            handleChange={handleChange}
            errores={errores}
            porcent={porcent}
            totales={totates}
            buscarEfect={buscarEfect}
            cOf={cOf}
            noData={noData}
            efecRef={efecRef}
            mesSel={mesSel}
            anoSel={anoSel}
            generarPadronSinPago={generarPadronSinPago}
            sinPago={sinPago}
            cuota={cuota}
          />
        </>
      )}
    </>
  );
}

export default efectividad;
