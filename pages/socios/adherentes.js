import React, { useState, useEffect } from "react";
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
import Router, { useRouter } from "next/router";
import jsCookie from "js-cookie";
import FormNuevosAdherentes from "@/components/socios/FormNuevosAdherentes";

function adherentes(props) {
  const sexo = [
    { DESCRIP: "Masculino", CODIGO: "M" },
    { DESCRIP: "Femenino", CODIGO: "F" },
  ];

  let apellidoRef = React.createRef();
  let nombreRef = React.createRef();
  let dniRef = React.createRef();
  let fechaNacRef = React.createRef();
  let altaRef = React.createRef();
  let vigenciaRef = React.createRef();

  const [ficha, guardarFicha] = useState([]);
  const [adherentes, guardarAdherentes] = useState([]);
  const [obraSoc, guardarObraSoc] = useState([]);
  const [procutores, guardarProductores] = useState([]);
  const [obraSocSel, guardarObraSocSel] = useState("");
  const [productoSel, guardarProductorSel] = useState("");
  const [sexoSel, guardarSexoSel] = useState("");
  const [errores, guardarErrores] = useState(null);
  const [fclose, guardarFClose] = useState(false);
  const [vigencia, guardarVigencia] = useState("");
  const [alertas, guardarAlertas] = useState(null);

  const { usu } = useWerchow();

  const { isLoading } = useUser();

  let params = useRouter();

  if (params.query.contrato) {
    jsCookie.set("contrato", params.query.contrato, { expires: 1 });
  }

  const traerDatos = async () => {
    await axios
      .get("/api/socios", {
        params: {
          f: "traer obra social",
        },
      })
      .then((res) => {
        if (res.data) {
          let arr = JSON.parse(res.data);

          guardarObraSoc(arr);
        }
      })
      .catch((error) => {
        console.log(error);

        toast.error("Ocurrio un error al generar el listado de obras sociales");
      });

    await axios
      .get("/api/socios", {
        params: {
          f: "traer productores",
        },
      })
      .then((res) => {
        if (res.data) {
          let arr = JSON.parse(res.data);

          guardarProductores(arr);
        }
      })
      .catch((error) => {
        console.log(error);

        toast.error("Ocurrio un error al generar el listado de productores");
      });
  };

  const traerAdherentes = async (ficha) => {
    await axios
      .get(`/api/socios`, {
        params: {
          contrato: ficha,
          f: "adh",
        },
      })
      .then((res) => {
        if (res.data) {
          let arr = JSON.parse(res.data);
          guardarAdherentes(arr);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al generar el listado de adherentes");
      });
  };

  const traerFicha = async () => {
    if (jsCookie.get("contrato")) {
      await axios
        .get("/api/socios", {
          params: {
            ficha: jsCookie.get("contrato"),
            f: "maestro contrato",
          },
        })
        .then((res) => {
          if (res.data) {
            let arr = JSON.parse(res.data);
            guardarFicha(arr[0]);

            traerAdherentes(arr[0].CONTRATO);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ocurrio un error al traer los datos de la ficha");
        });
    }
  };

  const handleChange = async (f, value) => {
    if (f === "obra social") {
      guardarObraSocSel(value);
    } else if (f === "productor") {
      guardarProductorSel(value);
    } else if (f === "sexo") {
      guardarSexoSel(value);
    }
  };

  const regAdh = async () => {
    guardarErrores(null);

    let data = {
      CONTRATO: ficha.CONTRATO,
      SUCURSAL: ficha.SUCURSAL,
      PRODUCTOR: productoSel,
      APELLIDOS: apellidoRef.current.value,
      NOMBRES: nombreRef.current.value,
      NRO_DOC: dniRef.current.value,
      NACIMIENTO: fechaNacRef.current.value,
      ALTA: altaRef.current.value,
      VIGENCIA: vigenciaRef.current.value,
      OBRA_SOC: obraSocSel,
      PLAN: ficha.PLAN,
      SEXO: sexoSel,
      f: "reg adh",
    };

    if (data.APELLIDOS === "") {
      guardarErrores("Debes ingresar el apellido del titular");
    } else if (data.NOMBRES === "") {
      guardarErrores("Debes ingresar el nombre del titular");
    } else if (data.NRO_DOC === "") {
      guardarErrores("Debes ingresar el DNI del titular");
    } else if (data.NACIMIENTO === "") {
      guardarErrores("Debes ingresar la fecha de nacimiento del titular");
    } else if (data.NOMBRES === "") {
      guardarErrores("Debes ingresar el nombre del titular");
    } else if (data.OBRA_SOC === "") {
      guardarErrores("Debes seleccionar la obra social del titular");
    } else if (data.PRODUCTO === "") {
      guardarErrores("Debes seleccionar quien es el productor de esta ficha");
    } else if (data.ALTA === "") {
      guardarErrores("Debes ingresar la fecha de alta de esta ficha");
    } else {
      guardarFClose(true);

      await confirmAlert({
        title: "ATENCION",
        message: "¿Estas seguro de registrar este nuevo adherente?",
        buttons: [
          {
            label: "Si",
            onClick: () => {
              axios
                .post("/api/socios", data)
                .then((res) => {
                  if (res.status === 200) {
                    toast.success("El adherente fue registrado con exito");

                    let hist = {
                      CONTRATO: data.CONTRATO,
                      OPERADOR: usu.usuario,
                      ACCION: `Alta nuevo adherente: ${data.APELLIDOS}, ${data.NOMBRES}.`,
                      FECHA: moment().format("DD/MM/YYYY HH:mm"),
                      f: "reg historia",
                    };

                    registrarHistoria(hist);

                    traerAdherentes(data.CONTRATO);
                  }
                })
                .catch((error) => {
                  console.log(error);
                  toast.error("Ocurrio un error al registrar el adherente");
                });
            },
          },
          {
            label: "No",
            onClick: () => {
              toast.info("El adherente no fue registrado.");
            },
          },
        ],
      });
    }
  };

  const checkEdad = () => {
    if (fechaNacRef.current.value !== "") {
      let nac = moment(fechaNacRef.current.value).format("YYYY");

      let hoy = moment().format("YYYY");

      let edad = hoy - nac;

      if (edad < 18) {
        toast.info("El titular debe tener 18 o mas años de edad");
        guardarAlertas("El titular debe tener 18 o mas años de edad");
      }
    }
  };

  const checkvigencia = () => {
    if (fechaNacRef.current.value !== "" && altaRef.current.value) {
      let alta = altaRef.current.value;

      let nac = moment(fechaNacRef.current.value).format("YYYY");

      let hoy = moment().format("YYYY");

      let edad = hoy - nac;

      let vigencia;

      if (edad < 45) {
        vigencia = moment(alta).format("YYYY-MM-DD");
        guardarVigencia(vigencia);
      } else if (edad <= 45) {
        vigencia = moment(alta).add(3, "months").format("YYYY-MM-DD");
        guardarVigencia(vigencia);
      } else if (edad > 45 && edad <= 55) {
        vigencia = moment(alta).add(5, "months").format("YYYY-MM-DD");
        guardarVigencia(vigencia);
      } else if (edad > 55 && edad <= 60) {
        vigencia = moment(alta).add(6, "months").format("YYYY-MM-DD");
        guardarVigencia(vigencia);
      } else if (edad > 60 && edad <= 65) {
        vigencia = moment(alta).add(10, "months").format("YYYY-MM-DD");
        guardarVigencia(vigencia);
      } else if (edad > 65 && edad <= 75) {
        vigencia = moment(alta).add(12, "months").format("YYYY-MM-DD");
        guardarVigencia(vigencia);
      }
    } else if (fechaNacRef.current.value === "") {
      toast.info(
        "Debes ingresar la fecha de nacimiento para calcular la vigencia"
      );
      guardarAlertas(
        "Debes ingresar la fecha de nacimiento para calcular la vigencia"
      );
    }
  };

  useEffect(() => {
    traerFicha();
  }, []);

  useSWR("/api/socios", traerDatos);

  if (isLoading === true) return <Skeleton />;

  return (
    <>
      {!usu ? (
        <Redirect />
      ) : (
        <>
          {ficha.length === 0 ? null : (
            <FormNuevosAdherentes
              apellidoRef={apellidoRef}
              nombreRef={nombreRef}
              dniRef={dniRef}
              fechaNacRef={fechaNacRef}
              altaRef={altaRef}
              vigenciaRef={vigenciaRef}
              ficha={ficha}
              adherentes={adherentes}
              obraSoc={obraSoc}
              procutores={procutores}
              handleChange={handleChange}
              errores={errores}
              regAdh={regAdh}
              fclose={fclose}
              checkEdad={checkEdad}
              checkvigencia={checkvigencia}
              vigencia={vigencia}
              alertas={alertas}
              sexo={sexo}
            />
          )}
        </>
      )}
    </>
  );
}

export default adherentes;
