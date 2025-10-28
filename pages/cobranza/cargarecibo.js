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
import FormCobranza from "@/components/cobranza/FormCobranza";
import Router from "next/router";
import FormCargaRecibo from "@/components/cobranza/FormCargaRecibo";

function cargarecibo(props) {
  let nRecRef = React.createRef();
  let importeRef = React.createRef();
  let contratoRef = React.createRef();
  let diaPagRef = React.createRef();

  const [serieSel, guardarSerieSel] = useState("");
  const [medPag, guardarMedPag] = useState("");
  const [mesSel, guardarMesSel] = useState("");
  const [anoSel, guardarAnoSel] = useState("");
  const [nupagos, guardarNuPagos] = useState([]);
  const [show, guardarShow] = useState(false);
  const [errores, guardarErrores] = useState(null);

  const { usu } = useWerchow();

  const { isLoading } = useUser();

  const handleChange = async (f, value) => {
    if (f === "serie") {
      guardarSerieSel(value);
      guardarMedPag("AFIP/ARCA");
    }
    if (f === "mes") {
      guardarMesSel(value);
    }
    if (f === "ano") {
      guardarAnoSel(value);
    }
  };

  const checkRec = async () => {
    guardarShow(false);

    if (serieSel === "") {
      toast.error("Debes seleccionar el tipo de recibo a cargar");
    } else if (nRecRef.current.value === "") {
      toast.error("Debes ingresar el N° de Recibo");
    } else {
      await axios
        .get("/api/cobranza", {
          params: {
            f: "check rec",
            serie: serieSel,
            nro: parseInt(nRecRef.current.value),
          },
        })
        .then((res) => {
          let dat = JSON.parse(res.data);

          console.log(dat.length);
          if (dat.length > 0) {
            toast.info(
              `El recibo ingresado ya se encuentra cargaro en el socio: ${dat[0].CONTRATO}`
            );
            guardarShow(false);
          } else {
            toast.success(`Puedes realizar la confeccion del recibo a cargar`);
            guardarShow(true);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ocurrio un error al chequear el recibo");
        });
    }
  };

  const preCargaRec = () => {
    guardarErrores(null);

    const prepago = {
      SERIE: serieSel,
      NRO_RECIBO: nRecRef.current.value,
      MES: mesSel,
      ANO: anoSel,
      IMPORTE: importeRef.current.value,
      DIA_REN: moment().format("YYYY-MM-DD"),
      DIA_CAR: moment().format("YYYY-MM-DD"),
      DIA_EMI: moment().format("YYYY-MM-DD"),
      DIA_PAG: diaPagRef.current.value,
      HORA_CAR: moment().format("HH:mm:ss"),
      CONTRATO: contratoRef.current.value,
      MAN_COM: "P   ",
      MOVIM: "P",
      OPERADOR: usu.usuario,
      PUESTO: 31,
      ZONA: 1,
      SUCURSAL: "W",
      EMPRESA: "SAN MIGUEL",
      MED_PAG: "AFIP",
    };

    if (prepago.CONTRATO === "") {
      toast.warning(
        "Debes ingresar el numero de ficha a la que corresponde el recibo"
      );
      guardarErrores(
        "Debes ingresar el numero de ficha a la que corresponde el recibo"
      );
    } else if (prepago.DIA_PAG === "") {
      toast.warning("Debes ingresar la fecha en que se cobro el recibo");
      guardarErrores("Debes ingresar la fecha en que se cobro el recibo");
    } else if (prepago.MES === "" || prepago.MES === 0) {
      toast.warning("Debes ingresar el mes a cobrar");
      guardarErrores("Debes ingresar el mes a cobrar");
    } else if (prepago.ANO === "" || prepago.ANO === 0) {
      toast.warning("Debes ingresar el año a cobrar");
      guardarErrores("Debes ingresar el año a cobrar");
    } else if (prepago.IMPORTE === "") {
      toast.warning("Debes ingresar el importe del recibo");
      guardarErrores("Debes ingresar el importe del recibo");
    } else {
      let encontrado = false;

      if (nupagos.length === 0) {
        toast.success("Pago pre cargado exitosamente");
        guardarNuPagos([...nupagos, prepago]);
      } else {
        for (let i = 0; i < nupagos.length; i++) {
          if (nupagos[i].MES === mesSel && nupagos[i].ANO === anoSel) {
            encontrado = true;
          }
        }
        if (encontrado === true) {
          toast.warning("El mes ingresado ya exitse");
        } else if (encontrado === false) {
          toast.success("Pago pre cargado exitosamente");
          guardarNuPagos([...nupagos, prepago]);
        }
      }
    }
  };

  const eliminarPagoPrecargado = (index) => {
    nupagos.splice(index, 1);

    guardarNuPagos([...nupagos]);
  };

  const registrarPagos = async (arr) => {
    confirmAlert({
      title: "Atencion",
      message: "¿Seguro quieres registrar el/los pagos al socio?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            let pago = {
              SERIE: "",
              NRO_RECIBO: "",
              MES: "",
              ANO: "",
              IMPORTE: "",
              DIA_REN: "",
              DIA_CAR: "",
              DIA_EMI: "",
              DIA_PAG: "",
              HORA_CAR: "",
              CONTRATO: "",
              MAN_COM: "",
              MOVIM: "",
              OPERADOR: "",
              PUESTO: "",
              ZONA: "",
              SUCURSAL: "",
              EMPRESA: "",
              RENDIDO: 0,
              MED_PAG: medPag,
              f: "reg pago",
            };

            for (let i = 0; i < arr.length; i++) {
              pago.SERIE = arr[i].SERIE;
              pago.NRO_RECIBO = arr[i].NRO_RECIBO;
              pago.MES = arr[i].MES;
              pago.ANO = arr[i].ANO;
              pago.IMPORTE = arr[i].IMPORTE;
              pago.DIA_REN = arr[i].DIA_REN;
              pago.DIA_CAR = arr[i].DIA_CAR;
              pago.DIA_EMI = arr[i].DIA_EMI;
              pago.DIA_PAG = arr[i].DIA_PAG;
              pago.HORA_CAR = arr[i].HORA_CAR;
              pago.CONTRATO = parseInt(arr[i].CONTRATO);
              pago.MAN_COM = arr[i].MAN_COM;
              pago.MOVIM = arr[i].MOVIM;
              pago.OPERADOR = arr[i].OPERADOR;
              pago.PUESTO = arr[i].PUESTO;
              pago.ZONA = arr[i].ZONA;
              pago.SUCURSAL = arr[i].SUCURSAL;
              pago.EMPRESA = arr[i].EMPRESA;

              axios
                .post("/api/cobranza", pago)
                .then((res) => {
                  if (res.status === 200) {
                    let hist = {
                      CONTRATO: pago.CONTRATO,
                      OPERADOR: usu.usuario,
                      ACCION: `Carga de recibo ${medPag} del mes: ${arr[i].MES}/${arr[i].ANO}, monto: $${arr[i].IMPORTE}.`,
                      FECHA: moment().format("DD/MM/YYYY HH:mm"),
                      f: "reg historia",
                    };

                    registrarHistoria(hist);
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            toast.info("El/los pagos no fueron registrados.");
          },
        },
      ],
    });
  };

  // useSWR("/api/cobranza", traerPuestos);

  if (isLoading === true) return <Skeleton />;

  return (
    <>
      {!usu ? (
        <Redirect />
      ) : (
        <>
          <FormCargaRecibo
            nupagos={nupagos}
            preCargaRec={preCargaRec}
            nRecRef={nRecRef}
            importeRef={importeRef}
            contratoRef={contratoRef}
            diaPagRef={diaPagRef}
            handleChange={handleChange}
            checkRec={checkRec}
            show={show}
            eliminarPagoPrecargado={eliminarPagoPrecargado}
            registrarPagos={registrarPagos}
            errores={errores}
          />
        </>
      )}
    </>
  );
}

export default cargarecibo;
