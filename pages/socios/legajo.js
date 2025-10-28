import React, { useState } from "react";
import useUser from "@/hook/useUser";
import { Skeleton } from "@/components/Layouts/Skeleton";
import useWerchow from "@/hook/useWerchow";
import axios, { all } from "axios";
import { toast } from "react-toastify";
import { Redirect } from "@/components/auth/Redirect";
import useSWR from "swr";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";
import { registrarHistoria } from "@/libs/funciones";
import { useRouter } from "next/router";
import jsCookie from "js-cookie";
import { ip } from "@/config/config";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import FormLegajoSocio from "@/components/socios/FormLegajoSocio";

function Legajo(props) {
  let dniRef = React.createRef();
  let contratoRef = React.createRef();
  let apellidoRef = React.createRef();
  let cuentaRef = React.createRef();
  let observacionRef = React.createRef();
  let nuCuotaRef = React.createRef();
  let mes0Ref = React.createRef();
  let ano0Ref = React.createRef();
  let cuotasRef = React.createRef();

  const [errores, guardarErrores] = useState(null);
  const [alertas, guardarAlertas] = useState(null);
  const [confirmacion, guardarConfirmacion] = useState(null);
  const [alerCuo, guardarAlerCuo] = useState(null);
  const [ficha, guardarFicha] = useState([]);
  const [adhs, guardarAdhs] = useState([]);
  const [show, guardarShow] = useState(false);
  const [archivos, guardarArchivos] = useState([]);
  const [file, setFile] = useState(null);
  const [grupo, guardarGrupo] = useState("");
  const [allPagos, guardarAllPagos] = useState([]);
  const [usos, guardarUsos] = useState([]);
  const [historial, guardarHistorial] = useState([]);
  const [histCuotas, guardarHistCuotas] = useState([]);
  const [cuotaMensual, guardarCuotaMensual] = useState(0);
  const [baja, guardarBaja] = useState(false);
  const [listApe, guardarApellidos] = useState([]);
  const [gl, guardarGastoLuto] = useState([]);
  const [fclose, guardarFClose] = useState(false);
  const [cuenta, guardarCuenta] = useState([]);
  const [fbaj, guardarFbaj] = useState(false);
  const [justiSel, guardarJustiSel] = useState("");
  const [vigencia, guardarVigencia] = useState(null);
  const [cuotas, guardarCuotas] = useState(null);
  const [showAfi, guardarShowAfi] = useState(false);

  const { usu } = useWerchow();

  const { isLoading } = useUser();

  const traerInfo = async (ficha) => {
    await axios
      .get(`/api/socios`, {
        params: {
          ficha: ficha,
          f: "traer archivos",
        },
      })
      .then((res1) => {
        let archivos = res1.data;

        guardarArchivos(archivos);

        if (res1.data.length === 0) {
          toast.warning("Este legajo no tiene archivos adjuntos");
        } else {
          toast.info("Se trajeron los archivos adjuntados a este legajo");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const eliminarArchivos = async (id) => {
    await confirmAlert({
      title: "ATENCION",
      message: "¿Seguro quieres eliminar la imagen?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            axios
              .delete(
                `${ip}api/archivos/legajovirtualsm/eliminararchivos/${id}`
              )
              .then((res) => {
                if (res.status === 200) {
                  toast.success("El archivo fue eliminado con exito");

                  let accion = `Se elimino un archivo en el legajo virtual del Socio: ${ficha[0].CONTRATO} - ${ficha[0].APELLIDOS}, ${ficha[0].NOMBRES}.`;

                  registrarHistoria(accion, usu.usuario);

                  setTimeout(() => {
                    traerInfo(ficha[0].CONTRATO);
                  }, 500);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleSoli = async (file) => {
    setFile(file);

    const upload = new FormData();

    upload.append("file", file);

    await axios
      .post(
        `${ip}api/archivos/legajovirtualsm/uploadfichalegajosoli/${ficha[0].CONTRATO}`,
        upload
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("Archivo Subido Con Exito", "Atencion");

          let accion = `Se subio un archivo al legajo virtual del Socio: ${ficha[0].CONTRATO} - ${ficha[0].APELLIDOS}, ${ficha[0].NOMBRES}.`;

          registrarHistoria(accion, usu.usuario);
        }

        setTimeout(() => {
          traerInfo(ficha[0].CONTRATO);
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCondi = async (file) => {
    setFile(file);

    const upload = new FormData();

    upload.append("file", file);

    await axios
      .post(
        `${ip}api/archivos/legajovirtualsm/uploadfichalegajocondi/${ficha[0].CONTRATO}`,
        upload
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("Archivo Subido Con Exito", "Atencion");

          let accion = `Se subio un archivo al legajo virtual del Socio: ${ficha[0].CONTRATO} - ${ficha[0].APELLIDOS}, ${ficha[0].NOMBRES}.`;

          registrarHistoria(accion, usu.usuario);
        }

        setTimeout(() => {
          traerInfo(ficha[0].CONTRATO);
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRehab = async (file) => {
    setFile(file);

    const upload = new FormData();

    upload.append("file", file);

    await axios
      .post(
        `${ip}api/archivos/legajovirtualsm/uploadfichalegajorehab/${ficha[0].CONTRATO}`,
        upload
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("Archivo Subido Con Exito", "Atencion");

          let accion = `Se subio un archivo al legajo virtual del Socio: ${ficha[0].CONTRATO} - ${ficha[0].APELLIDOS}, ${ficha[0].NOMBRES}.`;

          registrarHistoria(accion, usu.usuario);
        }

        setTimeout(() => {
          traerInfo(ficha[0].CONTRATO);
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNoti = async (file) => {
    setFile(file);

    const upload = new FormData();

    upload.append("file", file);

    await axios
      .post(
        `${ip}api/archivos/legajovirtualsm/uploadfichalegajonoti/${ficha[0].CONTRATO}`,
        upload
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("Archivo Subido Con Exito", "Atencion");

          let accion = `Se subio un archivo al legajo virtual del Socio: ${ficha[0].CONTRATO} - ${ficha[0].APELLIDOS}, ${ficha[0].NOMBRES}.`;

          registrarHistoria(accion, usu.usuario);
        }

        setTimeout(() => {
          traerInfo(ficha[0].CONTRATO);
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRecF = async (file) => {
    setFile(file);

    const upload = new FormData();

    upload.append("file", file);

    await axios
      .post(
        `${ip}api/archivos/legajovirtualsm/uploadfichalegajorecf/${ficha[0].CONTRATO}`,
        upload
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("Archivo Subido Con Exito", "Atencion");

          let accion = `Se subio un archivo al legajo virtual del Socio: ${ficha[0].CONTRATO} - ${ficha[0].APELLIDOS}, ${ficha[0].NOMBRES}.`;

          registrarHistoria(accion, usu.usuario);
        }

        setTimeout(() => {
          traerInfo(ficha[0].CONTRATO);
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRecD = async (file) => {
    setFile(file);

    const upload = new FormData();

    upload.append("file", file);

    await axios
      .post(
        `${ip}api/archivos/legajovirtualsm/uploadfichalegajorecd/${ficha[0].CONTRATO}`,
        upload
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("Archivo Subido Con Exito", "Atencion");

          let accion = `Se subio un archivo al legajo virtual del Socio: ${ficha[0].CONTRATO} - ${ficha[0].APELLIDOS}, ${ficha[0].NOMBRES}.`;

          registrarHistoria(accion, usu.usuario);
        }

        setTimeout(() => {
          traerInfo(ficha[0].CONTRATO);
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          empre: empre,
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
          empre: empre,
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
    guardarBaja(false);
    guardarFbaj(false);

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

            if (ficha[0].ESTADO === 0) {
              guardarBaja(true);
            } else {
              guardarBaja(false);
            }

            guardarFicha(ficha);
            guardarShow(true);

            traerAdhs("adh", ficha[0].CONTRATO);
            traerInfo(ficha[0].CONTRATO);
            descriGrupo(ficha[0].GRUPO);
            traerPagos(ficha[0].CONTRATO, ficha[0].EMPRESA);
            traerUsos(ficha[0].CONTRATO);
            traerHistorial(ficha[0].CONTRATO);
            traerCuotas(ficha[0].CONTRATO);
            traerCuenta(ficha[0].CONTRATO);
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

  const tarerSocioContrato = async (hc) => {
    guardarErrores(null);
    guardarAlertas(null);
    guardarShow(false);
    guardarBaja(false);
    guardarFbaj(false);

    let contrato;

    if (!hc.view) {
      contrato = hc;
    } else if (hc.view) {
      contrato = contratoRef.current.value;
    }

    if (contrato === "") {
      guardarErrores("Debes ingresar un numero de socio");
    } else {
      axios
        .get("/api/socios", {
          params: {
            f: "maestro contrato",
            ficha: contrato,
          },
        })
        .then((res0) => {
          console.log(res0);  
          let re = JSON.parse(res0.data);
          if (re.length > 0) {
            let ficha = JSON.parse(res0.data);

            if (ficha[0].ESTADO === 0) {
              guardarBaja(true);
            } else {
              guardarBaja(false);
            }

            guardarFicha(ficha);
            guardarShow(true);

            traerAdhs("adh", ficha[0].CONTRATO);
            traerInfo(ficha[0].CONTRATO);
            descriGrupo(ficha[0].GRUPO);
            traerPagos(ficha[0].CONTRATO, ficha[0].EMPRESA);
            traerUsos(ficha[0].CONTRATO);
            traerHistorial(ficha[0].CONTRATO);
            traerCuotas(ficha[0].CONTRATO);
            traerCuenta(ficha[0].CONTRATO);
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

  const traerApellido = async () => {
    guardarErrores(null);
    guardarAlertas(null);

    let apellido = apellidoRef.current.value;

    if (apellido === "") {
      guardarErrores("Debes ingresar el apellido del titular");
    } else {
      axios
        .get("/api/socios", {
          params: {
            f: "maestro apellido",
            apellido: apellido,
          },
        })
        .then((res0) => {
          let re = JSON.parse(res0.data);
          if (re.length > 0) {
            guardarApellidos(re);
          } else if (re.length === 0) {
            guardarAlertas(
              "El Apellido ingresado no esta registrado o pertenece a un socio de Werchow"
            );
            toast.info(
              "El Apellido ingresado no esta registrado o pertenece a un socio de Werchow"
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

  const traerUsos = async (contrato) => {
    await axios
      .get(`/api/socios`, {
        params: {
          contrato: contrato,
          f: "traer usos",
        },
      })
      .then((res) => {
        if (res.data) {
          let usos = JSON.parse(res.data);

          guardarUsos(usos);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al generar el listado de usos");
      });
  };

  const traerHistorial = async (contrato) => {
    await axios
      .get(`/api/socios`, {
        params: {
          contrato: contrato,
          f: "traer historial",
        },
      })
      .then((res) => {
        if (res.data) {
          let list = JSON.parse(res.data);

          guardarHistorial(list);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al generar el historial de movimientos");
      });
  };

  const traerCuotas = async (contrato) => {
    await axios
      .get(`/api/socios`, {
        params: {
          contrato: contrato,
          f: "traer cuotas",
        },
      })
      .then((res) => {
        if (res.data) {
          let arr = JSON.parse(res.data);
          guardarHistCuotas(arr);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          "Ocurrio un error al generar el historial de cuotas mensuales"
        );
      });

    await axios
      .get(`/api/socios`, {
        params: {
          contrato: contrato,
          f: "traer cuota mensual",
        },
      })
      .then((res) => {
        if (res.data[0]) {
          guardarCuotaMensual(res.data[0].IMPORTE);
        } else if (!res.data[0]) {
          toast.warning(
            "Esta ficha no tiene cuota mensual registrada. REGISTRA CUOTA URGENTE!!"
          );
          guardarAlerCuo(
            "Esta ficha no tiene cuota mensual registrada. REGISTRA CUOTA URGENTE!!"
          );
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al traer la cuota mensual");
      });
  };

  const traerCuenta = async (contrato) => {
    await axios
      .get(`/api/socios`, {
        params: {
          contrato: contrato,
          f: "traer cuenta",
        },
      })
      .then((res) => {
        if (res.data) {
          let arr = JSON.parse(res.data);
          guardarCuenta(arr);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          "Ocurrio un error al traer el N° de Tarjeta/Cuenta Bancaria"
        );
      });
  };

  const regDebCred = async () => {
    guardarErrores(null);

    const data = {
      contrato: ficha[0].CONTRATO,
      dni: ficha[0].NRO_DOC,
      grupo: ficha[0].GRUPO,
      cuenta: `${cuentaRef.current.value}`,
      observacion: observacionRef.current.value,
      f: "reg cuenta",
    };

    if (data.cuenta === "") {
      guardarFClose(false);
      guardarErrores(
        "Debes ingresar un N° de tarjeta o cuenta bancaria, segun corresponda"
      );
    } else {
      guardarFClose(true);
      await confirmAlert({
        title: "ATENCION",
        message: "¿Seguro quieres registrar el N° de Tarjeta/Cuenta Bancaria?",
        buttons: [
          {
            label: "Si",
            onClick: () => {
              axios
                .post(`/api/socios`, data)
                .then((res) => {
                  if (res.status === 200) {
                    toast.success(
                      "El debito/credito del socio fue registrado correctamente"
                    );

                    let hist = {
                      CONTRATO: data.contrato,
                      OPERADOR: usu.usuario,
                      ACCION: `Alta N° de Tarjeta/Cuenta Bancaria: ${data.cuenta}.`,
                      FECHA: moment().format("DD/MM/YYYY HH:mm"),
                      f: "reg historia",
                    };

                    registrarHistoria(hist);

                    traerCuenta(data.contrato);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            },
          },
          {
            label: "No",
            onClick: () => {
              toast.info("Accion cancelada, no se realizo el registro");
            },
          },
        ],
      });
    }
  };

  const actCuota = async () => {
    if (alerCuo) {
      let data = {
        f: "reg cuota",
        CONTRATO: ficha[0].CONTRATO,
        IMPORTE: nuCuotaRef.current.value,
        CUO_ANT: 0,
        DESDE: moment().format("YYYY-MM-DD"),
        OPERADOR: usu.usuario,
      };

      await axios
        .post("/api/socios", data)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Cuota Registrada");

            let hist = {
              CONTRATO: ficha[0].CONTRATO,
              OPERADOR: usu.usuario,
              ACCION: `Registro de cuota de $${cuotaMensual} a $${data.IMPORTE}.`,
              FECHA: moment().format("DD/MM/YYYY HH:mm"),
              f: "reg historia",
            };

            guardarConfirmacion("Cuota registrada Correctamente");

            registrarHistoria(hist);

            traerHistorial(ficha[0].CONTRATO);
            traerCuotas(ficha[0].CONTRATO);
            guardarAlerCuo(null);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ocurrio un error al registrar la cuota");
        });
    } else {
      if (nuCuotaRef.current.value === "") {
        guardarErrores("Debes ingresar el valor de la nueva cuota");
      } else {
        let data = {
          f: "act valor cuota",
          cuota: nuCuotaRef.current.value,
          vieja: cuotaMensual,
          contrato: ficha[0].CONTRATO,
        };

        guardarErrores(null);

        guardarFClose(true);
        await confirmAlert({
          title: "ATENCION",
          message: "¿Seguro quieres actualizar el valor de la cuota?",
          buttons: [
            {
              label: "Si",
              onClick: () => {
                axios
                  .put(`/api/socios`, data)
                  .then((res) => {
                    if (res.status === 200) {
                      toast.success("El valor de la cuota fue actualizado");

                      let hist = {
                        CONTRATO: data.contrato,
                        OPERADOR: usu.usuario,
                        ACCION: `Actualizacion de cuota de $${cuotaMensual} a $${data.cuota}.`,
                        FECHA: moment().format("DD/MM/YYYY HH:mm"),
                        f: "reg historia",
                      };

                      registrarHistoria(hist);

                      traerHistorial(ficha[0].CONTRATO);
                      traerCuotas(ficha[0].CONTRATO);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              },
            },
            {
              label: "No",
              onClick: () => {
                toast.info("Accion cancelada, no se realizo la actualizacion");
              },
            },
          ],
        });
      }
    }
  };

  const regPag0 = async () => {
    if (mes0Ref.current.value === "") {
      guardarErrores("Debes ingresar el mes del pago 0");
    } else if (ano0Ref.current.value === "") {
      guardarErrores("Debes ingresar el año del pago 0");
    } else {
      let data = {
        f: "reg pago 0",
        ano: ano0Ref.current.value,
        mes: mes0Ref.current.value,
        fecha: moment().format("YYYY-MM-DD"),
        hora: moment().format("HH:mm"),
        operador: usu.usuario,
        contrato: ficha[0].CONTRATO,
      };

      guardarErrores(null);

      guardarFClose(true);
      await confirmAlert({
        title: "ATENCION",
        message: "¿Seguro quieres actualizar el valor de la cuota?",
        buttons: [
          {
            label: "Si",
            onClick: () => {
              axios
                .post(`/api/socios`, data)
                .then((res) => {
                  if (res.status === 200) {
                    toast.success("El pago 0 fue registrado");

                    let hist = {
                      CONTRATO: data.contrato,
                      OPERADOR: usu.usuario,
                      ACCION: `Registro Pago 0 en la cuota: ${data.mes}-${data.ano}.`,
                      FECHA: moment().format("DD/MM/YYYY HH:mm"),
                      f: "reg historia",
                    };

                    registrarHistoria(hist);

                    traerPagos(ficha[0].CONTRATO, ficha[0].EMPRESA);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            },
          },
          {
            label: "No",
            onClick: () => {
              toast.info("Accion cancelada, no se realizo el registro");
            },
          },
        ],
      });
    }
  };

  const activarModoBaja = (f) => {
    if (f === "si") {
      guardarFbaj(true);
    } else if (f === "no") {
      guardarFbaj(false);
    }
  };

  const handleChange = async (f, value) => {
    if (f === "justificacion") {
      guardarJustiSel(value.target.value);
    }
  };

  const bajaFicha = async () => {
    let data = {
      f: "baja ficha",
      contrato: ficha[0].CONTRATO,
    };

    if (justiSel === "") {
      toast.warning("Debes justificar el motivo de la baja");
    } else {
      await confirmAlert({
        title: "ATENCION",
        message: "¿Seguro que quieres dar de baja a esta ficha?",
        buttons: [
          {
            label: "Si",
            onClick: () => {
              axios
                .put(`/api/socios`, data)
                .then((res) => {
                  if (res.status === 200) {
                    toast.success(
                      "La ficha completa (titular y adherentes) esta dada de baja."
                    );

                    let hist = {
                      CONTRATO: data.contrato,
                      OPERADOR: usu.usuario,
                      ACCION: `Baja de ficha, motivo: ${justiSel}.`,
                      FECHA: moment().format("DD/MM/YYYY HH:mm"),
                      f: "reg historia",
                    };

                    registrarHistoria(hist);
                    tarerSocioContrato(ficha[0].CONTRATO);
                    setTimeout(() => {
                      traerAdhs("adh", ficha[0].CONTRATO);
                    }, 500);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            },
          },
          {
            label: "No",
            onClick: () => {
              toast.info("Accion cancelada, no se realizo la baja");
            },
          },
        ],
      });
    }
  };

  const bajaAdh = async (id, adhe, contra) => {
    let data = {
      f: "baja adhe",
      idadh: id,
      contrato: contra,
    };

    await confirmAlert({
      title: "ATENCION",
      message: "¿Seguro que quieres dar de baja al adherente seleccionado?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            axios
              .put(`/api/socios`, data)
              .then((res) => {
                if (res.status === 200) {
                  toast.success("El adherente fue dado de baja.");

                  let hist = {
                    CONTRATO: data.contrato,
                    OPERADOR: usu.usuario,
                    ACCION: `Baja de adherente: ${adhe}.`,
                    FECHA: moment().format("DD/MM/YYYY HH:mm"),
                    f: "reg historia",
                  };

                  registrarHistoria(hist);

                  traerHistorial(ficha[0].CONTRATO);
                  traerCuotas(ficha[0].CONTRATO);
                  setTimeout(() => {
                    traerAdhs("adh", ficha[0].CONTRATO);
                  }, 500);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            toast.info("Accion cancelada, no se realizo la baja");
          },
        },
      ],
    });
  };

  const reafiliarFicha = async () => {
    let data = {
      f: "reafiliar ficha",
      contrato: ficha[0].CONTRATO,
    };

    await confirmAlert({
      title: "ATENCION",
      message: "¿Seguro que quieres reafiliar esta ficha?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            axios
              .put(`/api/socios`, data)
              .then((res) => {
                if (res.status === 200) {
                  toast.success(
                    "La ficha completa (titular y adherentes) fue reafiliada, chequea las vigencias."
                  );

                  let hist = {
                    CONTRATO: data.contrato,
                    OPERADOR: usu.usuario,
                    ACCION: `Ficha reafiliada.`,
                    FECHA: moment().format("DD/MM/YYYY HH:mm"),
                    f: "reg historia",
                  };

                  registrarHistoria(hist);
                  tarerSocioContrato(ficha[0].CONTRATO);

                  setTimeout(() => {
                    traerAdhs("adh", ficha[0].CONTRATO);
                  }, 500);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            toast.info("Accion cancelada, no se reafilio la ficha");
          },
        },
      ],
    });
  };

  const reafilAdh = async (id, adhe, contra) => {
    let data = {
      f: "reafiliar adhe",
      idadh: id,
      contrato: contra,
    };

    await confirmAlert({
      title: "ATENCION",
      message: "¿Seguro que quieres reafiliar al adherente seleccionado?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            axios
              .put(`/api/socios`, data)
              .then((res) => {
                if (res.status === 200) {
                  toast.success("El adherente fue reafiliado.");

                  let hist = {
                    CONTRATO: data.contrato,
                    OPERADOR: usu.usuario,
                    ACCION: `Adherente Reafiliado: ${adhe}.`,
                    FECHA: moment().format("DD/MM/YYYY HH:mm"),
                    f: "reg historia",
                  };

                  registrarHistoria(hist);

                  traerHistorial(ficha[0].CONTRATO);
                  traerCuotas(ficha[0].CONTRATO);
                  setTimeout(() => {
                    traerAdhs("adh", ficha[0].CONTRATO);
                  }, 500);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            toast.info("Accion cancelada, no se reafilio al adherente");
          },
        },
      ],
    });
  };

  const gasLuto = async (plan, alta, cantadh) => {
    await axios
      .get(`/api/socios`, {
        params: {
          f: "gasto luto",
        },
      })
      .then((res) => {
        if (res.data) {
          guardarGastoLuto(res.data[0]);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al consultar el gasto de luto");
      });
  };

  const handleVigencia = () => {
    guardarErrores(null);
    let cuotas = cuotasRef.current.value;

    if (cuotas === "") {
      document.getElementById("btn").hidden = true;
      guardarVigencia("");
      guardarShowAfi(false);
    } else if (cuotas !== "") {
      if (cuotas === "1") {
        guardarCuotas(cuotas);

        let carencia = cuotas * 15;

        let vigencia = moment().add(carencia, "days").format("DD/MM/YYYY");

        document.getElementById("btn").hidden = false;

        guardarVigencia(vigencia);

        guardarShowAfi(true);
      } else if (cuotas > "1") {
        guardarCuotas(cuotas);

        let carencia = cuotas * 30;

        let vigencia = moment().add(carencia, "days").format("DD/MM/YYYY");

        document.getElementById("btn").hidden = false;

        guardarVigencia(vigencia);

        guardarShowAfi(true);
      }
    }
  };

  const handleBlur = () => {
    let cuotas = cuotasRef.current.value;

    if (cuotas === "") {
      const error = "Debes Ingresar La Cantidad De Cuotas Adeudadas";
      guardarErrores(error);
    }
  };

  const regAfi = async () => {
    const rehab = {
      contrato: ficha[0].CONTRATO,
      apellido: ficha[0].APELLIDOS,
      nombre: ficha[0].NOMBRES,
      operador: usu.usuario,
      idoperador: usu.id,
      vigencia: moment(vigencia).format("YYYY-MM-DD"),
      fecha: moment().format("YYYY-MM-DD"),
      cuotas: cuotasRef.current.value,
      dni: ficha[0].NRO_DOC,
      empresa: ficha[0].EMPRESA,
      f: "soli afi",
    };

    await axios
      .post(`/api/socios`, rehab)
      .then((res) => {
        if (res.status === 200) {
          toast.success(
            "La rehabilitacion del socio fue registrada, puede imprimir la notificacion"
          );

          let accion = `Se emitio una notificacion de rehabilitacion de servicios ID: ${res.data.idrehab} al socio: ${rehab.contrato} - ${rehab.apellido}, ${rehab.nombre} perteneciente a: ${rehab.empresa}`;

          registrarHistoria(accion, usu.usuario);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useSWR("/api/sepelio/servicios", gasLuto);

  if (isLoading === true) return <Skeleton />;

  return (
    <>
      {!usu ? (
        <Redirect />
      ) : (
        <>
          <FormLegajoSocio
            dniRef={dniRef}
            contratoRef={contratoRef}
            traerSocio={traerSocio}
            tarerSocioContrato={tarerSocioContrato}
            traerApellido={traerApellido}
            errores={errores}
            alertas={alertas}
            show={show}
            ficha={ficha[0]}
            adhs={adhs}
            archivos={archivos}
            grupo={grupo}
            allPagos={allPagos}
            handleSoli={handleSoli}
            handleCondi={handleCondi}
            handleRehab={handleRehab}
            handleNoti={handleNoti}
            handleRecD={handleRecD}
            handleRecF={handleRecF}
            eliminarArchivos={eliminarArchivos}
            file={file}
            usos={usos}
            historial={historial}
            histCuotas={histCuotas}
            cuotaMensual={cuotaMensual}
            baja={baja}
            apellidoRef={apellidoRef}
            listApe={listApe}
            gl={gl}
            cuentaRef={cuentaRef}
            observacionRef={observacionRef}
            regDebCred={regDebCred}
            fclose={fclose}
            cuenta={cuenta}
            traerHistorial={traerHistorial}
            nuCuotaRef={nuCuotaRef}
            actCuota={actCuota}
            mes0Ref={mes0Ref}
            ano0Ref={ano0Ref}
            regPag0={regPag0}
            fbaj={fbaj}
            activarModoBaja={activarModoBaja}
            bajaFicha={bajaFicha}
            handleChange={handleChange}
            bajaAdh={bajaAdh}
            reafiliarFicha={reafiliarFicha}
            reafilAdh={reafilAdh}
            alerCuo={alerCuo}
            confirmacion={confirmacion}
            handleVigencia={handleVigencia}
            handleBlur={handleBlur}
            cuotasRef={cuotasRef}
            vigencia={vigencia}
            cuotas={cuotas}
            showAfi={showAfi}
            regAfi={regAfi}
          />
        </>
      )}
    </>
  );
}

export default Legajo;
