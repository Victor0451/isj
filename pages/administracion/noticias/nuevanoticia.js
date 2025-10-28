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
import { useRouter } from "next/router";
import jsCookie from "js-cookie";
import FormNuevaNoticia from "@/components/adminisracion/noticias/FormNuevaNoticia";

function NuevaNoticia(props) {
  const [notiSel, guardarNotiSel] = useState("");
  const [destSel, guardarDestSel] = useState("");
  const [errores, guardarErrores] = useState(null);

  const { usu } = useWerchow();

  const { isLoading } = useUser();

  const handleChange = (f, value) => {
    if (f === "desti") {
      guardarDestSel(value);
    } else if (f === "noti") {
      guardarNotiSel(value.target.value);
    }
  };

  const registrarNoticia = async () => {
    guardarErrores(null);
    if (notiSel === "") {
      guardarErrores("Debes ingresar la noticia a comunicar");
    } else if (destSel === "") {
      guardarErrores("Debes seleccionar el destinatario de la noticia");
    } else {
      await confirmAlert({
        title: "ATENCION",
        message: "¿Seguro quieres registrar la noticia?",
        buttons: [
          {
            label: "Si",
            onClick: () => {
              let data = {
                fecha: moment().format("YYYY-MM-DD HH:mm:ss"),
                noticia: notiSel,
                operador: usu.usuario,
                perfil: destSel,
                f: "nueva noticia",
              };

              axios
                .post(`/api/noticias`, data)
                .then((res) => {
                  if (res.status === 200) {
                    toast.success("La noticia fue registrada con exito");
                  }
                })
                .catch((error) => {
                  console.log(error);
                  toast.error("Ocurrio un error al registrar la noticia");
                });
            },
          },
          {
            label: "No",
            onClick: () => {
              toast.info("No se registro ninguna noticia");
            },
          },
        ],
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
          <FormNuevaNoticia
            handleChange={handleChange}
            registrarNoticia={registrarNoticia}
            errores={errores}
          />
        </>
      )}
    </>
  );
}

export default NuevaNoticia;
