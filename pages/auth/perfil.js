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
import { registrarHistoria } from "@/libs/funciones";
import FormPerfil from "@/components/auth/FormPerfil";

function Perfil(props) {
  let contrasenaRef = React.createRef();

  const [errores, guardarErrores] = useState(null);

  const { usu } = useWerchow();

  const { isLoading } = useUser();

  const cambiarContrasena = async () => {
    guardarErrores(null);

    let contra = contrasenaRef.current.value;

    if (contra === "") {
      guardarErrores("Debes ingresar tu nueva contraseña");
    } else {
      await confirmAlert({
        title: "ATENCION",
        message: "¿Seguro quieres actualizar la contraseña?",
        buttons: [
          {
            label: "Si",
            onClick: () => {
              let data = {
                id: usu.usuario,
                contra: contra,
                f: "cambiar contrasena",
              };

              axios
                .put(`/api/auth`, data)
                .then((res) => {
                  if (res.status === 200) {
                    toast.success("Contraseña actualizada");

                    let accion = `Actualizacion de contraseña del usuario: ${usu.usuario}.`;

                    registrarHistoria(accion, usu.usuario);
                  }
                })
                .catch((error) => {
                  console.log(error);
                  toast.error("Ocurrio un error al actualizar la contraseña");
                });
            },
          },
          {
            label: "No",
            onClick: () => {
              toast.info("Actualizacion Cancelada");
            },
          },
        ],
      });
    }
  };

  const traduPerfil = (perfil) => {
    let tradu;

    if (perfil === 1) {
      tradu = "Admin";
    } else if (perfil === 2) {
      tradu = "Morosos";
    } else if (perfil === 3) {
      tradu = "Gerencia";
    } else if (perfil === 4) {
      tradu = "Sepelio";
    } else if (perfil === 5) {
      tradu = "Ventas";
    }
    return tradu;
  };

  if (isLoading === true) return <Skeleton />;

  return (
    <>
      {!usu ? (
        <Redirect />
      ) : (
        <>
          <FormPerfil
            usu={usu}
            traduPerfil={traduPerfil}
            contrasenaRef={contrasenaRef}
            cambiarContrasena={cambiarContrasena}
            errores={errores}
          />
        </>
      )}
    </>
  );
}

export default Perfil;
