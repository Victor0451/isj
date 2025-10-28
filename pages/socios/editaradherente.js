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
import FormEditarAdherente from "@/components/socios/FormEditarAdherente";

function editaradherente(props) {
  const { usu } = useWerchow();

  const { isLoading } = useUser();

  let params = useRouter();

  if (params.query.dni) {
    jsCookie.set("dni", params.query.dni, { expires: 1 });
  }

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
  const [vigencia, guardarVigencia] = useState("");
  const [alertas, guardarAlertas] = useState(null);

  const traerDatos = async () => {
    if (jsCookie.get("dni")) {
      await axios
        .get("/api/socios", {
          params: {
            dni: jsCookie.get("dni"),
            f: "mae adh",
          },
        })
        .then((res) => {
          if (res.data) {
            let arr = JSON.parse(res.data);

            guardarFicha(arr[0]);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ocurrio un error al traer los datos de la ficha");
        });
    }

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

  const putDato = async (dato, tc, campo) => {
    let data = {
      dni: ficha.NRO_DOC,
      campo: campo,
      dato: dato,
      tc: tc,
      f: "editar adh",
    };

    if (tc === "D") {
      data.dato = moment(dato).format("YYYY-MM-DD");
    }

    await axios
      .put("/api/socios", data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Datos editados correctamente");

          document.getElementById("frmEdit").reset();

          traerDatos();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al editar los datos del titular");
      });
  };

  const editSocio = async () => {
    guardarAlertas(null);
    guardarErrores(null);

    let data = {
      PRODUCTOR: productoSel,
      APELLIDOS: apellidoRef.current.value,
      NOMBRES: nombreRef.current.value,
      NRO_DOC: dniRef.current.value,
      NACIMIENTO: fechaNacRef.current.value,
      ALTA: altaRef.current.value,
      VIGENCIA: vigenciaRef.current.value,
      OBRA_SOC: obraSocSel,
      SEXO: sexoSel,
      f: "edit adh",
    };

    if (data.PRODUCTOR !== "") {
      putDato(data.PRODUCTOR, "S", "PRODUCTOR");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos, PRODUCTOR anterior: ${ficha.PRODUCTO} ----> PRODUCTOR nuevo  ${data.PRODUCTO}.`,
        FECHA: moment().format("DD/MM/YYYY HH:mm"),
        f: "reg historia",
      };

      registrarHistoria(hist);
    } else if (data.NACIMIENTO !== "") {
      putDato(data.NACIMIENTO, "D", "NACIMIENTO");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos, NACIMIENTO anterior: ${moment(
          ficha.NACIMIENTO
        ).format("YYYY-MM-DD")} ----> NACIMIENTO nuevo: ${moment(
          data.NACIMIENTO
        ).format("YYYY-MM-DD")}.`,
        FECHA: moment().format("DD/MM/YYYY HH:mm"),
        f: "reg historia",
      };

      registrarHistoria(hist);
    } else if (data.ALTA !== "") {
      putDato(data.ALTA, "D", "ALTA");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos, ALTA anterior: ${moment(ficha.ALTA).format(
          "YYYY-MM-DD"
        )} ----> ALTA nueva: ${moment(data.ALTA).format("YYYY-MM-DD")}.`,
        FECHA: moment().format("DD/MM/YYYY HH:mm"),
        f: "reg historia",
      };

      registrarHistoria(hist);
    } else if (data.VIGENCIA !== "") {
      putDato(data.VIGENCIA, "D", "VIGENCIA");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos, VIGENCIA anterior: ${moment(
          ficha.VIGENCIA
        ).format("YYYY-MM-DD")} ----> VIGENCIA nueva: ${moment(
          data.VIGENCIA
        ).format("YYYY-MM-DD")}.`,
        FECHA: moment().format("DD/MM/YYYY HH:mm"),
        f: "reg historia",
      };

      registrarHistoria(hist);
    } else if (data.APELLIDOS !== "") {
      putDato(data.APELLIDOS, "S", "APELLIDOS");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos, APELLIDO anterior: ${ficha.APELLIDOS} ----> APELLIDO nuevo: ${data.APELLIDOS}.`,
        FECHA: moment().format("DD/MM/YYYY HH:mm"),
        f: "reg historia",
      };

      registrarHistoria(hist);
    } else if (data.NOMBRES !== "") {
      putDato(data.NOMBRES, "S", "NOMBRES");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos, NOMBRE anterior: ${ficha.NOMBRES} ----> NOMBRE nuevo: ${data.NOMBRES}.`,
        FECHA: moment().format("DD/MM/YYYY HH:mm"),
        f: "reg historia",
      };

      registrarHistoria(hist);
    } else if (data.NRO_DOC !== "") {
      putDato(data.NRO_DOC, "I", "NRO_DOC");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos, DNI anterior: ${ficha.NRO_DOC} ----> DNI nuevo: ${data.NRO_DOC}.`,
        FECHA: moment().format("DD/MM/YYYY HH:mm"),
        f: "reg historia",
      };

      registrarHistoria(hist);
    } else if (data.OBRA_SOC !== "") {
      putDato(data.OBRA_SOC, "I", "OBRA_SOC");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos, OBRA SOCIAL anterior: ${ficha.OBRA_SOC} ----> OBRA SOCIAL nueva: ${data.OBRA_SOC}.`,
        FECHA: moment().format("DD/MM/YYYY HH:mm"),
        f: "reg historia",
      };

      registrarHistoria(hist);
    } else if (data.SEXO !== "") {
      putDato(data.SEXO, "S", "SEXO");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos, SEXO anterior: ${ficha.SEXO} ----> SEXO nuevo: ${data.SEXO}.`,
        FECHA: moment().format("DD/MM/YYYY HH:mm"),
        f: "reg historia",
      };

      registrarHistoria(hist);
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

  useSWR("/api/socios", traerDatos);

  if (isLoading === true) return <Skeleton />;

  return (
    <>
      {!usu ? (
        <Redirect />
      ) : (
        <>
          {ficha.length === 0 ? null : (
            <FormEditarAdherente
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
              checkEdad={checkEdad}
              checkvigencia={checkvigencia}
              vigencia={vigencia}
              alertas={alertas}
              sexo={sexo}
              editSocio={editSocio}
            />
          )}
        </>
      )}
    </>
  );
}

export default editaradherente;
