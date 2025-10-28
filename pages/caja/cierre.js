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
import FormCierre from "@/components/caja/FormCierre";

function cierre(props) {
  let fechaRef = React.createRef();
  let serieRef = React.createRef();
  let nroCompRef = React.createRef();
  let cuitRef = React.createRef();
  let importeRef = React.createRef();

  const [produc, guardarProduc] = useState([]);
  const [cuentas, guardarCuentas] = useState([]);
  const [tipoFac, guardartipoFac] = useState([]);
  const [facturaSel, guardarFacturaSel] = useState("");
  const [detalleSel, guardarDetalleSel] = useState("");
  const [codigoSel, guardarCodigoSel] = useState("");
  const [nCuentaSel, guardarNcuentaSel] = useState("");
  const [cuenDescSel, guardarCuenDescSel] = useState("");
  const [puestos, guardarPuestos] = useState([]);
  const [errores, guardarErrores] = useState(null);
  const [alertas, guardarAlertas] = useState(null);
  const [ingresos, guardarIngresos] = useState([]);
  const [egresos, guardarEgresos] = useState([]);
  const [flag, guardarFlag] = useState(false);

  const { usu } = useWerchow();

  const { isLoading } = useUser();

  const traerMovimientos = async () => {
    await axios
      .get(`/api/caja`, {
        params: {
          f: "traer movimientos",
          operador: usu.usuario,
        },
      })
      .then((res) => {
        if (res.data) {
          let movim = JSON.parse(res.data);

          guardarProduc(movim);
        }
      })
      .catch((error) => {
        console.log(error);

        toast.error("Ocurrio un error al generar los movimientos de la caja");
      });

    traerPuestos();
  };

  const traerPuestos = async () => {
    if (usu.usuario) {
      await axios
        .get(`/api/cobranza`, {
          params: {
            operador: usu.usuario,
            f: "traer puestos",
          },
        })
        .then((res) => {
          if (res.data) {
            guardarPuestos(res.data[0]);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ocurrio un error al traer la cuota mensual");
        });
    }
  };

  const tarerCuentas = async (movim) => {
    await axios
      .get("/api/caja", {
        params: {
          f: "traer cuentas",
          movim: movim,
        },
      })
      .then((res) => {
        if (res.data) {
          let movim = JSON.parse(res.data);
          guardarCuentas(movim);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al generar el listado de cuentas");
      });

    await axios
      .get("/api/caja", {
        params: {
          f: "traer tipo facturas",
        },
      })
      .then((res) => {
        if (res.data) {
          let tipoFac = JSON.parse(res.data);
          guardartipoFac(tipoFac);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al generar el listado de recibos");
      });
  };

  const handleChange = async (f, value) => {
    if (f === "cuenta") {
      let split = value.split("-");

      let cod = split[0];
      let nCuen = split[1];
      let cuenDesc = split[2];

      guardarCodigoSel(cod);

      guardarNcuentaSel(nCuen);

      guardarCuenDescSel(cuenDesc);
    } else if (f === "comprobante") {
      guardarFacturaSel(value);
    } else if (f === "detalle") {
      guardarDetalleSel(value.target.value);
    }
  };

  const resetForm = () => {
    document.getElementById("impuForm").reset();
  };

  const preRegImputacion = async (movim) => {
    guardarAlertas(null);
    guardarErrores(null);

    let impu = {
      SUCURSAL: usu.sucursal,
      PUESTO: puestos.puesto_sm,
      CODIGO: codigoSel,
      MOVIM: movim,
      CUENTA: nCuentaSel,
      CUENTA_DESC: cuenDescSel,
      IMPORTE: importeRef.current.value,
      TIPO: facturaSel,
      SERIE: serieRef.current.value,
      NUMERO: nroCompRef.current.value,
      CUIT: cuitRef.current.value,
      DETALLE: detalleSel,
      FECHA: moment().format("YYYY-MM-DD"),
      FEC_COMP: fechaRef.current.value,
      HORA: moment().format("HH:mm"),
      OPERADOR: usu.usuario,
      f: "reg impu",
    };

    if (impu.CODIGO === "") {
      guardarErrores(
        "Debes seleccionar la cuenta a la que pertenece la imputacion"
      );
    } else if (impu.TIPO === "") {
      guardarErrores("Debes seleccionar el tipo de comprobante");
    } else if (impu.SERIE === "") {
      guardarErrores("Debes ingresar el n° de serie del comprobante");
    } else if (impu.NUMERO === "") {
      guardarErrores("Debes ingresar el n° del comprobante");
    } else if (impu.FEC_COM === "") {
      guardarErrores("Debes ingresar fecha del comprobante");
    } else {
      if (movim === "I") {
        guardarIngresos([...ingresos, impu]);
      } else if (movim === "E") {
        guardarEgresos([...egresos, impu]);
      }

      guardarAlertas("Imputacion registrada correctamente");

      setTimeout(() => {
        guardarErrores(null);
        guardarAlertas(null);
        resetForm();
      }, 1000);
    }
  };

  const eliminarImpuPrecargado = (index, movim) => {
    if (movim === "I") {
      ingresos.splice(index, 1);

      guardarIngresos([...ingresos]);
    } else if (movim === "E") {
      egresos.splice(index, 1);

      guardarEgresos([...egresos]);
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

  const chekCaja = async (user) => {
    let fecha = moment().format("YYYY-MM-DD");

    await axios
      .get(`/api/caja`, {
        params: {
          fecha: fecha,
          user: user,
          f: "check caja",
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          guardarFlag(true);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al chequear la caja", "ATENCION");
      });
  };

  const updateRendido = async () => {
    let data = {
      f: "rendir pagos",
    };

    await axios
      .put(`/api/caja`, data)
      .then((res) => {
        if (res.data === 200) {
          toast.success(
            "Los recibos de la produccion diaria, fueron marcados como rendidos"
          );
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          "Ocurrio un error al marcar como rendido la produccion diaria"
        );
      });
  };

  const postCaja = async (caja, f) => {
    await axios
      .post(`/api/caja`, caja)
      .then((res) => {
        if (f === 1 && res.status === 200) {
          toast.success(
            "Se registraron los movimientos en la caja correctamente",
            "ATENCION"
          );

          updateRendido();

          let hist = {
            CONTRATO: 0,
            OPERADOR: usu.usuario,
            ACCION: `Cierre de caja por parte de: ${usu.usuario}.`,
            FECHA: moment().format("DD/MM/YYYY HH:mm"),
            f: "reg historia",
          };

          registrarHistoria(hist);

          // setTimeout(() => {
          //   Router.reload();
          // }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al reg la caja", "ATENCION");
      });
  };

  const regCierreCaja = async () => {
    await confirmAlert({
      title: "ATENCION",
      message: "¿Estas seguro de que quieres cerrar la caja de hoy?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            if (flag === false) {
              let totI = 0;
              let totE = 0;

              let caja = {
                SUCURSAL: usu.sucursal,
                PUESTO: puestos.puesto_sm,
                CODIGO: 0,
                MOVIM: "",
                CUENTA: "",
                IMPORTE: "",
                TIPO: "",
                SERIE: 0,
                NUMERO: 0,
                CUIT: "",
                DETALLE: "",
                FECHA: "",
                FEC_COMP: "",
                HORA: "",
                OPERADOR: "",
                f: "reg caja",
              };

              let ingre = ingresos.concat(produc);
              console.log(ingre);
              for (let i = 0; i < ingre.length; i++) {
                caja.CODIGO = ingre[i].CODIGO;
                caja.MOVIM = ingre[i].MOVIM;
                caja.CUENTA = ingre[i].CUENTA;
                caja.IMPORTE = ingre[i].IMPORTE;
                caja.TIPO = ingre[i].TIPO;
                caja.SERIE = ingre[i].SERIE;
                caja.NUMERO = ingre[i].NUMERO;
                caja.CUIT = ingre[i].CUIT;
                caja.DETALLE = ingre[i].DETALLE;
                caja.FECHA = ingre[i].FECHA;
                caja.FEC_COMP = ingre[i].FEC_COMP;
                caja.HORA = ingre[i].HORA;
                caja.OPERADOR = ingre[i].OPERADOR;

                totI += parseFloat(ingre[i].IMPORTE);

                postCaja(caja, 0);
              }

              for (let j = 0; j < egresos.length; j++) {
                caja.PUESTO = egresos[j].PUESTO;
                caja.CODIGO = egresos[j].CODIGO;
                caja.MOVIM = egresos[j].MOVIM;
                caja.CUENTA = egresos[j].CUENTA;
                caja.IMPORTE = egresos[j].IMPORTE;
                caja.TIPO = egresos[j].TIPO;
                caja.SERIE = egresos[j].SERIE;
                caja.NUMERO = egresos[j].NUMERO;
                caja.CUIT = egresos[j].CUIT;
                caja.DETALLE = egresos[j].DETALLE;
                caja.FECHA = egresos[j].FECHA;
                caja.FEC_COMP = egresos[j].FEC_COMP;
                caja.HORA = egresos[j].HORA;
                caja.OPERADOR = egresos[j].OPERADOR;

                totE += parseFloat(egresos[j].IMPORTE);

                postCaja(caja, 0);
              }

              caja.CODIGO = 718;
              caja.PUESTO = puestos.puesto_sm;
              caja.CUENTA = "0101010700";
              caja.MOVIM = "E";
              caja.IMPORTE = totI - totE;
              caja.TIPO = "X";
              caja.DETALLE = "VALORES A DEPOSITAR";
              caja.NUMERO = 1;
              caja.CUIT = "0";
              caja.FECHA = moment().format("YYYY-MM-DD");
              caja.FEC_COMP = moment().format("YYYY-MM-DD");
              caja.HORA = moment().format("HH:mm");

              postCaja(caja, 0);

              caja.CODIGO = -1;
              caja.PUESTO = puestos.puesto_sm;
              caja.CUENTA = "";
              caja.MOVIM = "I";
              caja.IMPORTE = 0;
              caja.TIPO = "";
              caja.DETALLE = "SALDO INICIAL";
              caja.NUMERO = 0;
              caja.CUIT = "0";
              caja.FECHA = moment().format("YYYY-MM-DD");
              caja.FEC_COMP = moment().format("YYYY-MM-DD");
              caja.HORA = moment().format("HH:mm");

              postCaja(caja, 1);
            } else if (flag === true) {
              toast.warning(
                `Ya se genero una caja con la fecha en el dia de hoy (${moment().format(
                  "DD/MM/YYYY"
                )})`,
                "ATENCION"
              );
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            toast.info(
              "Cierre cancelado, puede seguir confeccionando la caja de hoy"
            );
          },
        },
      ],
    });
  };

  useSWR("/api/caja", traerMovimientos);

  if (isLoading === true) return <Skeleton />;

  return (
    <>
      {!usu ? (
        <Redirect />
      ) : (
        <>
          <FormCierre
            produc={produc}
            tarerCuentas={tarerCuentas}
            ingresos={ingresos}
            egresos={egresos}
            cuentas={cuentas}
            tipoFac={tipoFac}
            handleChange={handleChange}
            fechaRef={fechaRef}
            serieRef={serieRef}
            nroCompRef={nroCompRef}
            cuitRef={cuitRef}
            importeRef={importeRef}
            preRegImputacion={preRegImputacion}
            eliminarImpuPrecargado={eliminarImpuPrecargado}
            alertas={alertas}
            errores={errores}
            totales={totales}
            regCierreCaja={regCierreCaja}
          />
        </>
      )}
    </>
  );
}

export default cierre;
