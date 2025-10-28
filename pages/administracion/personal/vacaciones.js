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
import FormVacaciones from "@/components/adminisracion/personal/FormVacaciones";

function Vacaciones(props) {
  let inicioRef = React.createRef();
  let finRef = React.createRef();

  const [empleados, guardarEmpleados] = useState([]);
  const [empSel, guardarEmpSelec] = useState("");
  const [obsSel, guardarObsSelec] = useState("");
  const [errores, guardarErrores] = useState(null);
  const [listVacas, guardarListVacas] = useState([]);

  const { usu } = useWerchow();

  const { isLoading } = useUser();

  const traerDatos = async () => {
    await axios
      .get("/api/prestamos", {
        params: {
          f: "traer empleados",
        },
      })
      .then((res) => {
        if (res.data) {
          guardarEmpleados(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al tarer el listado de empleados");
      });

    await axios
      .get("/api/personal", {
        params: {
          f: "traer vacaciones",
        },
      })
      .then((res) => {
        if (res.data) {
          guardarListVacas(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al tarer el listado de vacaciones");
      });
  };

  const handleChange = (f, value) => {
    if (f === "empleado") {
      guardarEmpSelec(value);
    } else if (f === "observacion") {
      guardarObsSelec(value);
    }
  };

  const regVacaciones = async () => {
    guardarErrores(null);

    let data = {
      empleado: empSel,
      inicio: inicioRef.current.value,
      fin: finRef.current.value,
      dias: 0,
      observacion: obsSel,
      operador: usu.usuario,
      fecha: moment().format("YYYY-MM-DD"),
      f: "reg vacaciones",
    };

    if (data.operador === "") {
      guardarErrores("Debes seleccionar a un empleado");
    } else if (data.inicio === "") {
      guardarErrores("Debes seleccionar el inicio del periodo de vacaciones");
    } else if (data.fin === "") {
      guardarErrores("Debes seleccionar el fin del periodo de vacaciones");
    } else {
      let ini = moment(data.inicio).format("YYYY-MM-DD");
      let fin = moment(data.fin).format("YYYY-MM-DD");
      data.dias = moment(fin).diff(ini, "days");

      await axios
        .post("/api/personal", data)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Se registro con exito el periodo de vacaciones");

            let accionHis = `Se registro el periodo de vacaciones ID ${
              res.data.idvacaciones
            } del empleado ${data.empleado}. Inicia el ${moment(
              data.inicio
            ).format("DD/MM/YYYY")} hasta el ${moment(data.fin).format(
              "DD/MM/YYYY"
            )}, con un total de ${data.dias} dias.`;

            registrarHistoria(accionHis, usu.usuario);

            traerDatos();
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ocurrio un error al registrar el periodo de vacaciones");
        });
    }
  };

  const eliminarVacaciones = async (id) => {
    await confirmAlert({
      title: "ATENCION",
      message: "¿Seguro quieres eliminar el periodo seleccionado?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            axios
              .delete(`/api/personal`, {
                params: {
                  f: "eliminar periodo",
                  idvacaciones: id,
                },
              })
              .then((res) => {
                if (res.status === 200) {
                  toast.success("Periodo Eliminado");
                  let accionHis = `Se elimino el periodo de vacaciones ID ${id}.`;

                  registrarHistoria(accionHis, usu.usuario);
                  traerDatos();
                }
              })
              .catch((error) => {
                console.log(error);
                toast.error(
                  "Ocurrio un error al eliminar el periodo de vacaciones"
                );
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            toast.info(
              "El periodo de vacaciones seleccionado, no fue eliminado"
            );
          },
        },
      ],
    });
  };

  useSWR("/api/prestamos", traerDatos);

  if (isLoading === true) return <Skeleton />;

  return (
    <>
      {!usu ? (
        <Redirect />
      ) : (
        <>
          <FormVacaciones
            empleados={empleados}
            handleChange={handleChange}
            inicioRef={inicioRef}
            finRef={finRef}
            regVacaciones={regVacaciones}
            errores={errores}
            listVacas={listVacas}
            eliminarVacaciones={eliminarVacaciones}
          />
        </>
      )}
    </>
  );
}

export default Vacaciones;
