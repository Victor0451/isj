import { FormLogin } from "@/components/auth/FormLogin";
import jsCookie from "js-cookie";
import React, { useState } from "react";
import Router from "next/router";
import axios from "axios";
import useWerchow from "@/hook/useWerchow";
import useUser from "@/hook/useUser";
import { Skeleton } from "@/components/Layouts/Skeleton";
import { Home } from "@/components/home/Home";
import { toast } from "react-toastify";
import useSWR from "swr";
import moment from "moment";

export default function Index() {
  let usuarioRef = React.createRef();
  let contrasenaRef = React.createRef();
  let contratoRef = React.createRef();
  let dniRef = React.createRef();

  const [errores, guardarErrores] = useState(null);
  const [alertas, guardarAlertas] = useState(null);
  const [caso, guardarCaso] = useState([]);
  const [gestion, guardarGestion] = useState([]);
  const [noticias, guardarNoticias] = useState([]);

  const iniciarSesion = async () => {
    guardarErrores(null);
    let usuario = usuarioRef.current.value;
    let contrasena = contrasenaRef.current.value;

    if (usuario === "") {
      guardarErrores("Debes ingresar un nombre de usuario");
    } else if (contrasena === "") {
      guardarErrores("Debes ingresar una contraseña");
    } else {
      try {
        //headers
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        //Req body

        const body = {
          usuario: usuario,
          contrasena: contrasena,
          f: "login",
        };

        await axios.post(`/api/auth`, body, config).then((res) => {
          console.log(res.data.user);
          let user = JSON.stringify(res.data.user);
          jsCookie.set("token", res.data.token, { expires: 1 });
          jsCookie.set("usuario", user, { expires: 1 });
          setTimeout(() => {
            Router.reload();
          }, 500);
        });
      } catch (error) {
        if (error.response.status && error.response.status === 400) {
          guardarErrores(error.response.data.msg);
        } else {
          console.log(error, "LOGIN_FAIL");
        }
      }
    }
  };

  const buscarGestion = async (idcaso, hc) => {
    await axios
      .get(`/api/campanas`, {
        params: {
          f: "gestion caso",
          idcaso: idcaso,
          contrato: hc,
        },
      })
      .then((res1) => {
        if (res1.data.length > 0) {
          guardarGestion(res1.data);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al traer la gestion del caso");
      });
  };

  const buscarCaso = async (f) => {
    guardarAlertas(null);
    guardarErrores(null);

    if (f === "HC") {
      if (contratoRef.current.value === "") {
        toast.error("Debes ingresar el numero de ficha");
        guardarErrores("Debes ingresar el numero de ficha");
      } else {
        await axios
          .get(`/api/campanas`, {
            params: {
              f: "buscar contrato",
              hc: contratoRef.current.value,
            },
          })
          .then((res) => {
            if (res.data.length > 0) {
              guardarCaso(res.data);

              buscarGestion(res.data[0].idcaso, res.data[0].contrato);
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error("Ocurrio un error al tarer el caso");
          });
      }
    } else if (f === "DNI") {
      if (dniRef.current.value === "") {
        toast.error("Debes ingresar el numero de DNI");
        guardarErrores("Debes ingresar el numero de DNI");
      } else {
        await axios
          .get(`/api/campanas`, {
            params: {
              f: "buscar dni",
              dni: dniRef.current.value,
            },
          })
          .then((res) => {
            if (res.data.length > 0) {
              guardarCaso(res.data);

              buscarGestion(res.data[0].idcaso, res.data[0].contrato);
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error("Ocurrio un error al tarer el caso");
          });
      }
    }
  };

  const traerNoticias = async () => {
    await axios
      .get(`/api/noticias`, {
        params: {
          f: "traer noticias",
          perfil: usu.perfil,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          guardarNoticias(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al traer las noticias");
      });

    prestamosPendientes(usu.perfil);
  };

  const { usu } = useWerchow();

  //const { isLoading } = useUser();

  useSWR("/api/noticias", traerNoticias);

  //if (isLoading === true) return <Skeleton />;

  return (
    <>
      {usu ? (
        <>
          <Home
            contratoRef={contratoRef}
            dniRef={dniRef}
            buscarCaso={buscarCaso}
            errores={errores}
            alertas={alertas}
            caso={caso}
            gestion={gestion}
            noticia={noticias}
          />
        </>
      ) : (
        <FormLogin
          usuarioRef={usuarioRef}
          contrasenaRef={contrasenaRef}
          iniciarSesion={iniciarSesion}
          errores={errores}
        />
      )}
    </>
  );
}
