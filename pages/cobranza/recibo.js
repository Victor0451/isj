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

function socios(props) {
  let dniRef = React.createRef();
  let contratoRef = React.createRef();

  const [errores, guardarErrores] = useState(null);
  const [alertas, guardarAlertas] = useState(null);
  const [ficha, guardarFicha] = useState(null);
  const [adhs, guardarAdhs] = useState([]);
  const [show, guardarShow] = useState(false);
  const [grupo, guardarGrupo] = useState("");
  const [allPagos, guardarAllPagos] = useState([]);
  const [nupagos, guardarNuPagos] = useState([]);
  const [cuotaMensual, guardarCuotaMensual] = useState(0);
  const [mesSel, guardarMesSel] = useState(0);
  const [anoSel, guardarAnoSel] = useState(0);
  const [recibo, guardarRecibo] = useState([]);
  const [puestos, guardarPuestos] = useState([]);
  const [medPag, guardarMedPag] = useState("EFECTIVO");

  const { usu } = useWerchow();

  const { isLoading } = useUser();

  const traerAdhs = async (f, contrato) => {
    await axios
      .get(`/api/socios`, {
        params: {
          f: f,
          contrato: contrato,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          guardarAdhs(JSON.parse(res.data));
        } else if (res.data.length === 0) {
          toast.info("El socio no posee adherentes");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          "Orcurrio un error al traer el listado de adherentes de la ficha"
        );
      });
  };

  const traerPagos = async (ficha, empre) => {
    let pagos = [];
    let pagosB = [];
    let allPagos = [];

    await axios
      .get(`/api/socios`, {
        params: {
          f: "traer pagos",
          ficha: ficha,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          pagos = res.data;
        } else {
          toast.info("El socio no posee pagos en efectivo registrados");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al traer los pagos");
      });

    await axios
      .get(`/api/socios`, {
        params: {
          f: "traer pagosb",
          ficha: ficha,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          pagosB = res.data;
        } else {
          toast.info("El socio no posee pagos de Debito/Credito registrados");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al traer los pagos");
      });

    if (pagos.length > 0 && pagosB.length > 0) {
      allPagos = pagos.concat(pagosB);
      guardarAllPagos(allPagos);
    } else if (pagos.length > 0 && pagosB.length === 0) {
      guardarAllPagos(pagos);
    } else if (pagos.length === 0 && pagosB.length > 0) {
      guardarAllPagos(pagosB);
    }
  };

  const descriGrupo = async (grupo) => {
    await axios
      .get("/api/socios", {
        params: {
          f: "traer grupo",
          grupo: grupo,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          let grup = `${res.data[0].CODIGO} - ${res.data[0].DESCRIP}`;
          guardarGrupo(grup);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al traer el grupo");
      });
  };

  const traerSocio = async () => {
    guardarErrores(null);
    guardarAlertas(null);
    guardarShow(false);

    if (dniRef.current.value === "") {
      guardarErrores("Debes ingresar un numero de DNI");
    } else {
      axios
        .get("/api/socios", {
          params: {
            f: "maestro",
            dni: dniRef.current.value,
          },
        })
        .then((res0) => {
          let re = JSON.parse(res0.data);
          if (re.length > 0) {
            let ficha = JSON.parse(res0.data);

            if (
              ficha[0].GRUPO === 666 ||
              ficha[0].GRUPO === 1001 ||
              ficha[0].GRUPO === 1005 ||
              ficha[0].GRUPO === 1006 ||
              ficha[0].GRUPO === 3444 ||
              ficha[0].GRUPO === 3666 ||
              ficha[0].GRUPO === 3777 ||
              ficha[0].GRUPO === 3888 ||
              ficha[0].GRUPO === 3999 ||
              ficha[0].GRUPO === 4004 ||
              ficha[0].GRUPO === 7777 ||
              ficha[0].GRUPO === 8500
            ) {
              confirmAlert({
                title: "¡¡¡¡¡ATENCION!!!!!",
                message:
                  "FICHA CON ESTADO DE MOROSIDAD, HAY QUE DEFINIR ANTES SU SITUACION.",
                buttons: [
                  {
                    label: "OK",
                    onClick: () => {},
                  },
                ],
              });
            }

            guardarFicha(ficha[0]);
            guardarShow(true);

            traerAdhs("adh", ficha[0].CONTRATO);
            descriGrupo(ficha[0].GRUPO);
            traerCuotas(ficha[0].CONTRATO);
            traerPagos(ficha[0].CONTRATO, ficha[0].EMPRESA);
            traerPuestos();
          } else {
            guardarAlertas(
              "El DNI ingresado no esta registrado o pertenece a un adherente"
            );
            toast.info(
              "El DNI ingresado no esta registrado o pertenece a un adherente"
            );
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(
            "Ocurrio un error al tarer los datos del socio en Werchow"
          );
        });
    }
  };

  const tarerSocioContrato = async () => {
    guardarErrores(null);
    guardarAlertas(null);
    guardarShow(false);

    let contrato = contratoRef.current.value;

    if (contrato === "") {
      guardarErrores("Debes ingresar un numero de socio");
    } else {
      await axios
        .get(`/api/socios`, {
          params: {
            f: "maestro contrato",
            ficha: contrato,
          },
        })
        .then((res0) => {
          let re = JSON.parse(res0.data);
          if (re.length > 0) {
            let ficha = JSON.parse(res0.data);

            if (
              ficha[0].GRUPO === 666 ||
              ficha[0].GRUPO === 1001 ||
              ficha[0].GRUPO === 1005 ||
              ficha[0].GRUPO === 1006 ||
              ficha[0].GRUPO === 3444 ||
              ficha[0].GRUPO === 3666 ||
              ficha[0].GRUPO === 3777 ||
              ficha[0].GRUPO === 3888 ||
              ficha[0].GRUPO === 3999 ||
              ficha[0].GRUPO === 4004 ||
              ficha[0].GRUPO === 7777 ||
              ficha[0].GRUPO === 8500
            ) {
              confirmAlert({
                title: "¡¡¡¡¡ATENCION!!!!!",
                message:
                  "FICHA CON ESTADO DE MOROSIDAD, HAY QUE DEFINIR ANTES SU SITUACION.",
                buttons: [
                  {
                    label: "OK",
                    onClick: () => {},
                  },
                ],
              });
            }

            guardarFicha(ficha[0]);
            guardarShow(true);

            traerAdhs("adh", ficha[0].CONTRATO);
            descriGrupo(ficha[0].GRUPO);
            traerCuotas(ficha[0].CONTRATO);
            traerPagos(ficha[0].CONTRATO, ficha[0].EMPRESA);
            traerPuestos();
          } else {
            guardarAlertas(
              "El N° de Ficha ingresado no esta registrado o pertenece a un adherente"
            );
            toast.info(
              "El N° de Ficha ingresado no esta registrado o pertenece a un adherente"
            );
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(
            "Ocurrio un error al tarer los datos del socio en Werchow"
          );
        });
    }
  };

  const traerCuotas = async (contrato) => {
    await axios
      .get(`/api/socios`, {
        params: {
          contrato: contrato,
          f: "traer cuota mensual",
        },
      })
      .then((res) => {
        if (res.data) {
          guardarCuotaMensual(res.data[0].IMPORTE);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al traer la cuota mensual");
      });
  };

  const handleChange = async (f, value) => {
    if (f === "mes") {
      guardarMesSel(value);
    } else if (f === "ano") {
      guardarAnoSel(value);
    }
  };

  const preCargarPago = () => {
    let mesCurso = parseInt(moment().format("MM"));
    let anoCurso = parseInt(moment().format("YYYY"));
    let diaCurso = parseInt(moment().format("DD"));

    const prepago = {
      SERIE: puestos.serie_sm,
      NRO_RECIBO: 0,
      MES: mesSel,
      ANO: anoSel,
      IMPORTE: cuotaMensual,
      DIA_REN: moment().format("YYYY-MM-DD"),
      DIA_CAR: moment().format("YYYY-MM-DD"),
      DIA_EMI: moment().format("YYYY-MM-DD"),
      DIA_PAG: moment().format("YYYY-MM-DD"),
      HORA_CAR: moment().format("HH:mm:ss"),
      CONTRATO: ficha.CONTRATO,
      MAN_COM: "X",
      MOVIM: "P",
      OPERADOR: usu.usuario,
      PUESTO: puestos.puesto_sm,
      ZONA: ficha.ZONA,
      SUCURSAL: ficha.SUCURSAL,
      EMPRESA: "SAN MIGUEL",
    };

    if (!recibo) {
      prepago.NRO_RECIBO = 1;
    } else {
      prepago.NRO_RECIBO = recibo + 1;
    }

    if (prepago.MES === "" || prepago.MES === 0) {
      toast.warning("Debes ingresar el mes a cobrar", "ATENCION");
    } else if (prepago.ANO === "" || prepago.ANO === 0) {
      toast.warning("Debes ingresar el año a cobrar", "ATENCION");
    } else {
      // CALCULOS DE VENCIMIENTOS
      if (prepago.ANO < anoCurso) {
        prepago.IMPORTE = prepago.IMPORTE * 1.2;
      } else if (prepago.ANO === anoCurso) {
        if (prepago.MES === mesCurso) {
          if (diaCurso > 15 && diaCurso <= 20) {
            prepago.IMPORTE = prepago.IMPORTE * 1.1;
          } else if (diaCurso > 20) {
            prepago.IMPORTE = prepago.IMPORTE * 1.2;
          }
        } else if (prepago.MES < mesCurso) {
          prepago.IMPORTE = prepago.IMPORTE * 1.2;
        }
      } else if (prepago.ANO > anoCurso) {
        prepago.IMPORTE = prepago.IMPORTE;
      }
      // ------------------------------

      // FICHAS DE COBRADORES

      // ---------------------------------

      let encontrado = false;

      if (nupagos.length === 0) {
        toast.success("Pago pre cargado exitosamente", "ATENCION");
        guardarNuPagos([...nupagos, prepago]);
      } else {
        for (let i = 0; i < nupagos.length; i++) {
          if (nupagos[i].MES === mesSel && nupagos[i].ANO === anoSel) {
            encontrado = true;
          }
        }
        if (encontrado === true) {
          toast.warning("El mes ingresado ya exitse", "ATENCION");
        } else if (encontrado === false) {
          toast.success("Pago pre cargado exitosamente", "ATENCION");
          guardarNuPagos([...nupagos, prepago]);
        }
      }
    }
  };

  const totalPagosPrecargados = (arr) => {
    let total = 0;

    for (let i = 0; i < arr.length; i++) {
      total += parseFloat(arr[i].IMPORTE);
    }

    return total.toFixed(2);
  };

  const eliminarPagoPrecargado = (index) => {
    nupagos.splice(index, 1);

    guardarNuPagos([...nupagos]);
  };

  const traerUltimoRecibo = async (ser) => {
    await axios
      .get(`/api/cobranza`, {
        params: {
          serie: ser,
          f: "ultimo recibo",
        },
      })
      .then((res) => {
        if (res.data[0]) {
          guardarRecibo(res.data[0].NRO_RECIBO);
        }
      })
      .catch((error) => {
        toast.error("Ocurrio un error al traer el recibo, posiblemente no tengas configurada una serie.", "ATENCION");
        console.log(error);
      });
  };

  const traerPuestos = async () => {
    await axios
      .get(`/api/cobranza`, {
        params: {
          operador: usu.usuario,
          f: "traer puestos",
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          let dat = res.data[0];

          guardarPuestos(dat);

          traerUltimoRecibo(dat.serie_sm, dat.puesto_sm);
        } else if (res.data.length === 0) {
          toast.warning("El usuario no tiene una serie configurada.");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al traer el puesto y serie");
      });
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
              pago.CONTRATO = arr[i].CONTRATO;
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
                      ACCION: `Cobranza de cuota: ${arr[i].MES}/${arr[i].ANO}, monto: $${arr[i].IMPORTE}, medio de pago: ${medPag}.`,
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

            setTimeout(() => {
              Router.push(
                `/cobranza/impresionrecibo?serie=${arr[0].SERIE}&contrato=${
                  arr[0].CONTRATO
                }&fecha=${moment(arr[0].DIA_PAG).format(
                  "YYYY-MM-DD"
                )}&f=traer recibo&rec=${arr[0].NRO_RECIBO}`
              );
            }, 800);
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

  const pagoJubilado = (e) => {
    let mesCurso = parseInt(moment().format("MM"));
    let anoCurso = parseInt(moment().format("YYYY"));
    let diaCurso = parseInt(moment().format("DD"));
    if (e.target.checked === true) {
      guardarMedPag("JUBILADO");

      for (let i = 0; i < nupagos.length; i++) {
        nupagos[i].IMPORTE = cuotaMensual;
        guardarNuPagos([nupagos[i]]);
      }
    } else if (e.target.checked === false) {
      guardarMedPag("EFECTIVO");

      for (let i = 0; i < nupagos.length; i++) {
        if (nupagos[i].ANO < anoCurso) {
          nupagos[i].IMPORTE = cuotaMensual * 1.2;
        } else if (nupagos[i].ANO === anoCurso) {
          if (nupagos[i].MES === mesCurso) {
            if (diaCurso > 15 && diaCurso <= 20) {
              nupagos[i].IMPORTE = cuotaMensual * 1.1;
            } else if (diaCurso > 20) {
              nupagos[i].IMPORTE = cuotaMensual * 1.2;
            }
          } else if (nupagos[i].MES < mesCurso) {
            nupagos[i].IMPORTE = cuotaMensual * 1.2;
          }
        } else if (nupagos[i].ANO > anoCurso) {
          nupagos[i].IMPORTE = cuotaMensual;
        }
        guardarNuPagos([nupagos[i]]);
      }
    }
  };

  const pagoTarjeta = (e) => {
    let mesCurso = parseInt(moment().format("MM"));
    let anoCurso = parseInt(moment().format("YYYY"));
    let diaCurso = parseInt(moment().format("DD"));
    if (e.target.checked === true) {
      guardarMedPag("TARJETA");

      for (let i = 0; i < nupagos.length; i++) {
        nupagos[i].IMPORTE = nupagos[i].IMPORTE * 1.1;
        guardarNuPagos([nupagos[i]]);
      }
    } else if (e.target.checked === false) {
      guardarMedPag("EFECTIVO");

      for (let i = 0; i < nupagos.length; i++) {
        if (nupagos[i].ANO < anoCurso) {
          nupagos[i].IMPORTE = cuotaMensual * 1.2;
        } else if (nupagos[i].ANO === anoCurso) {
          if (nupagos[i].MES === mesCurso) {
            if (diaCurso > 15 && diaCurso <= 20) {
              nupagos[i].IMPORTE = cuotaMensual * 1.1;
            } else if (diaCurso > 20) {
              nupagos[i].IMPORTE = cuotaMensual * 1.2;
            }
          } else if (nupagos[i].MES < mesCurso) {
            nupagos[i].IMPORTE = cuotaMensual * 1.2;
          } else if (nupagos[i].MES > mesCurso) {
            nupagos[i].IMPORTE = cuotaMensual;
          }
        } else if (nupagos[i].ANO > anoCurso) {
          nupagos[i].IMPORTE = cuotaMensual;
        }
        guardarNuPagos([nupagos[i]]);
      }
    }
  };

  // useSWR("/api/cobranza", traerPuestos);

  if (isLoading === true) return <Skeleton />;

  return (
    <>
      {!usu ? (
        <Redirect />
      ) : (
        <>
          <FormCobranza
            dniRef={dniRef}
            contratoRef={contratoRef}
            errores={errores}
            alertas={alertas}
            traerSocio={traerSocio}
            tarerSocioContrato={tarerSocioContrato}
            ficha={ficha}
            allPagos={allPagos}
            grupo={grupo}
            cuotaMensual={cuotaMensual}
            handleChange={handleChange}
            preCargarPago={preCargarPago}
            totalPagosPrecargados={totalPagosPrecargados}
            eliminarPagoPrecargado={eliminarPagoPrecargado}
            nupagos={nupagos}
            usu={usu}
            puestos={puestos}
            registrarPagos={registrarPagos}
            pagoJubilado={pagoJubilado}
            pagoTarjeta={pagoTarjeta}
          />
        </>
      )}
    </>
  );
}

export default socios;
