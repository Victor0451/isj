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
import { v4 as uuidv4 } from "uuid";
import { registrarHistoria } from "@/libs/funciones";
import FormInbox from "@/components/mail/FormInbox";
import { ip } from "@/config/config";
import Router from "next/router";

function Inbox(props) {
  let asuntoRef = React.createRef();

  const [noDataI, guardarNodataI] = useState(false);
  const [noDataS, guardarNodataS] = useState(false);
  const [bandeja, guardarBandeja] = useState(true);
  const [enviados, guardarEnviados] = useState(false);
  const [redactar, guardarRedactar] = useState(false);
  const [entrada, guardarEntrada] = useState([]);
  const [salida, guardarSalida] = useState([]);
  const [operadores, guardarOperadores] = useState([]);
  const [operadoSel, guardarOperadoSel] = useState([]);
  const [descrip, guardarDescrip] = useState(null);
  const [file, setFile] = useState(null);
  const [codmail, guardarCodmail] = useState(null);
  const [errores, guardarErrores] = useState(null);
  const [archivos, guardarArchivos] = useState([]);
  const [cajasMail, guardarCajasMail] = useState([]);
  const [cajasMailSel, guardarCajasMailSel] = useState([]);

  const { usu } = useWerchow();

  const { isLoading } = useUser();

  const traerMails = async () => {
    await axios
      .get(`/api/mailinterno`, {
        params: {
          f: "entrada",
          usu: usu.usuario,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          guardarEntrada(res.data);
          guardarNodataI(false);
        } else if (res.data.length === 0) {
          guardarNodataI(true);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al traer la bandeja de entrada");
      });

    await axios
      .get(`/api/mailinterno`, {
        params: {
          f: "salida",
          usu: usu.usuario,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          guardarSalida(res.data);
          guardarNodataS(false);
        } else if (res.data.length === 0) {
          guardarNodataS(true);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al traer la bandeja de entrada");
      });

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

    await axios
      .get("/api/mailinterno", {
        params: {
          f: "traer cajas mail",
          op: usu.usuario,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.length > 0) {
          guardarCajasMail(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al traer el listado de cajas");
      });
  };

  const traerArchivos = async (id) => {
    let param;

    if (id) {
      param = id;
    } else {
      param = codmail;
    }

    await axios
      .get(`/api/mailinterno`, {
        params: {
          f: "traer archivos",
          codmail: param,
        },
      })
      .then((res2) => {
        if (res2.data.length > 0) {
          guardarArchivos(res2.data);
        } else if (res2.data.length === 0) {
          guardarArchivos([]);
          toast.info("Este mail no tiene adjuntos");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          "Ocurrio un error al traer los archivos de este legajo virtual"
        );
      });
  };

  const vistas = (f) => {
    if (f === "B") {
      guardarBandeja(true);
      guardarEnviados(false);
      guardarRedactar(false);
    } else if (f === "E") {
      guardarBandeja(false);
      guardarEnviados(true);
      guardarRedactar(false);
    } else if (f === "R") {
      guardarCodmail(uuidv4());
      guardarBandeja(false);
      guardarEnviados(false);
      guardarRedactar(true);
    }
  };

  const handleChange = (f, value) => {
    if (f === "operador") {
      guardarOperadoSel([...operadoSel, value]);
    } else if (f === "link") {
      if (cajasMailSel.length === 0) {
        guardarCajasMailSel([...cajasMailSel, value]);
      } else {
        toast.info("Solo puede generar un link por mail");
      }
    }
  };

  const eliminarDestino = (index) => {
    operadoSel.splice(index, 1);

    guardarOperadoSel([...operadoSel]);

    toast.success("El destinatario fue eliminado");
  };

  const eliminarLink = (index) => {
    cajasMailSel.splice(index, 1);

    guardarCajasMailSel([...cajasMailSel]);

    toast.success("El link fue eliminado");
  };

  const eliminarTodosDestino = () => {
    guardarOperadoSel([]);

    toast.success("Todos los destinatarios fueron eliminados");
  };

  const eliminarTodosLink = () => {
    guardarCajasMailSel([]);

    toast.success("Todos los destinatarios fueron eliminados");
  };

  const getDescrip = (text) => {
    guardarDescrip(text);
  };

  const handleUpload = async (file) => {
    setFile(file);

    const upload = new FormData();

    upload.append("file", file);

    await axios
      .post(`${ip}api/archivos/mails/uploadadjunto/${codmail}`, upload)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Archivo Subido Con Exito", "Atencion");

          setTimeout(() => {
            traerArchivos();
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const registrarMsg = async () => {
    guardarErrores(null);

    if (operadoSel.length === 0) {
      guardarErrores("Debes elegir un destinatario");
    } else if (asuntoRef.current.value === "") {
      guardarErrores("Debes ingresar un asunto");
    } else {
      const mail = {
        fecha: moment().format("YYYY-MM-DD HH:mm:ss"),
        envia: usu.usuario,
        recibe: "",
        descrip: descrip,
        codmail: codmail,
        asunto: asuntoRef.current.value,
        leido: false,
        fecha_leido: null,
        url_caja: cajasMailSel[0],
        f: "enviar mail",
      };

      if (operadoSel.length > 0) {
        for (let i = 0; i < operadoSel.length; i++) {
          mail.recibe = operadoSel[i];

          postMSJ(mail);

          let accion = `${mail.envia} envio un mail interno al destinatario ${
            operadoSel[i]
          } el dia ${moment(mail.fecha).format("DD/MM/YYYY HH:mm:ss")}.`;

          registrarHistoria(accion, usu.usuario);
        }
      } else {
        toast.error("Debes seleccionar al menos un destinatario");
        guardarErrores("Debes seleccionar al menos un destinatario");
      }
    }
  };

  const postMSJ = async (mail) => {
    await axios
      .post(`/api/mailinterno`, mail)
      .then((res) => {
        if (res.status === 200) {
          toast.info("El mail fue enviado correctamente", "ATENCION");

          setTimeout(() => {
            Router.reload();
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al enviar el mail");
      });
  };

  const eliminarArchivos = async (id) => {
    await confirmAlert({
      title: "ATENCION",
      message: "¿Seguro quieres eliminar el adjunto?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            axios
              .delete(`${ip}api/archivos/mails/eliminararchivos/${id}`)
              .then((res) => {
                if (res.status === 200) {
                  toast.success("El adjunto fue eliminado ");

                  setTimeout(() => {
                    traerArchivos();
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

  useSWR("/api/mailinterno", traerMails);

  if (isLoading === true) return <Skeleton />;

  return (
    <>
      {!usu ? (
        <Redirect />
      ) : (
        <>
          <FormInbox
            entrada={entrada}
            salida={salida}
            noDataI={noDataI}
            noDataS={noDataS}
            usu={usu}
            bandeja={bandeja}
            enviados={enviados}
            redactar={redactar}
            vistas={vistas}
            operadores={operadores}
            handleChange={handleChange}
            operadoSel={operadoSel}
            eliminarDestino={eliminarDestino}
            eliminarTodosDestino={eliminarTodosDestino}
            getDescrip={getDescrip}
            handleUpload={handleUpload}
            file={file}
            asuntoRef={asuntoRef}
            errores={errores}
            registrarMsg={registrarMsg}
            archivos={archivos}
            eliminarArchivos={eliminarArchivos}
            traerArchivos={traerArchivos}
            cajasMail={cajasMail}
            cajasMailSel={cajasMailSel}
            eliminarLink={eliminarLink}
            eliminarTodosLink={eliminarTodosLink}
          />
        </>
      )}
    </>
  );
}

export default Inbox;
