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
import FormEditarTitular from "@/components/socios/FormEditarTitular";

function editartitular(props) {
  const [ficha, guardarFicha] = useState([]);

  const { usu } = useWerchow();

  const { isLoading } = useUser();

  let params = useRouter();

  if (params.query.contrato) {
    jsCookie.set("contrato", params.query.contrato, { expires: 1 });
  }

  const sexo = [
    { DESCRIP: "Masculino", CODIGO: "M" },
    { DESCRIP: "Femenino", CODIGO: "F" },
  ];

  let cuotaRef = React.createRef();
  let apellidoRef = React.createRef();
  let nombreRef = React.createRef();
  let dniRef = React.createRef();
  let fechaNacRef = React.createRef();
  let altaRef = React.createRef();
  let vigenciaRef = React.createRef();
  let domiRef = React.createRef();
  let nDomiRef = React.createRef();
  let barrioRef = React.createRef();
  let domiCobRef = React.createRef();
  let domiLabRef = React.createRef();
  let mailRef = React.createRef();
  let telefonoRef = React.createRef();
  let movilRef = React.createRef();

  const [errores, guardarErrores] = useState(null);
  const [alertas, guardarAlertas] = useState(null);
  const [grupos, guardarGrupos] = useState([]);
  const [zonas, guardarZonas] = useState([]);
  const [sucursales, guardarSucursales] = useState([]);
  const [procutores, guardarProductores] = useState([]);
  const [localidades, guardarLocalidades] = useState([]);
  const [obraSoc, guardarObraSoc] = useState([]);
  const [planes, guardarPlanes] = useState([]);
  const [grupoSel, guardarGrupoSel] = useState("");
  const [zonaSel, guardarZonaSel] = useState("");
  const [sucursalSel, guardarSucursalSel] = useState("");
  const [procutorSel, guardarProductorSel] = useState("");
  const [localidadSel, guardarLocalidadSel] = useState("");
  const [obraSocSel, guardarObraSocSel] = useState("");
  const [planSel, guardarPlanSel] = useState("");
  const [sexoSel, guardarSexoSel] = useState("");
  const [vigencia, guardarVigencia] = useState("");

  const traerDatos = async () => {
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
          f: "traer grupos",
        },
      })
      .then((res) => {
        if (res.data) {
          let arr = JSON.parse(res.data);

          guardarGrupos(arr);
        }
      })
      .catch((error) => {
        console.log(error);

        toast.error(
          "Ocurrio un error al generar el listado de medios de pagos"
        );
      });

    await axios
      .get("/api/socios", {
        params: {
          f: "traer zonas",
        },
      })
      .then((res) => {
        if (res.data) {
          let arr = JSON.parse(res.data);

          guardarZonas(arr);
        }
      })
      .catch((error) => {
        console.log(error);

        toast.error("Ocurrio un error al generar el listado de zonas");
      });

    await axios
      .get("/api/socios", {
        params: {
          f: "traer sucursales",
        },
      })
      .then((res) => {
        if (res.data) {
          let arr = JSON.parse(res.data);

          guardarSucursales(arr);
        }
      })
      .catch((error) => {
        console.log(error);

        toast.error("Ocurrio un error al generar el listado de sucursales");
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

    await axios
      .get("/api/socios", {
        params: {
          f: "traer localidades",
        },
      })
      .then((res) => {
        if (res.data) {
          let arr = JSON.parse(res.data);

          guardarLocalidades(arr);
        }
      })
      .catch((error) => {
        console.log(error);

        toast.error("Ocurrio un error al generar el listado de localidades");
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

    await axios
      .get("/api/socios", {
        params: {
          f: "traer planes",
        },
      })
      .then((res) => {
        if (res.data) {
          let arr = JSON.parse(res.data);

          guardarPlanes(arr);
        }
      })
      .catch((error) => {
        console.log(error);

        toast.error("Ocurrio un error al generar el listado de planes");
      });
  };

  const handleChange = async (f, value) => {
    if (f === "grupo") {
      guardarGrupoSel(value);
    } else if (f === "zona") {
      guardarZonaSel(value);
    } else if (f === "grupo") {
      guardarGrupoSel(value);
    } else if (f === "sucursal") {
      guardarSucursalSel(value);
    } else if (f === "productor") {
      guardarProductorSel(value);
    } else if (f === "localidad") {
      guardarLocalidadSel(value);
    } else if (f === "obra social") {
      guardarObraSocSel(value);
    } else if (f === "plan") {
      guardarPlanSel(value);
    } else if (f === "sexo") {
      guardarSexoSel(value);
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

      if (edad <= 45) {
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

  const putDato = async (dato, tc, campo) => {
    let data = {
      contrato: ficha.CONTRATO,
      campo: campo,
      dato: dato,
      tc: tc,
      f: "editar socio",
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
      GRUPO: grupoSel,
      ZONA: zonaSel,
      SUCURSAL: sucursalSel,
      PRODUCTO: procutorSel,
      APELLIDOS: apellidoRef.current.value,
      NOMBRES: nombreRef.current.value,
      NRO_DOC: dniRef.current.value,
      NACIMIENTO: fechaNacRef.current.value,
      CALLE: domiRef.current.value,
      NRO_CALLE: nDomiRef.current.value,
      BARRIO: barrioRef.current.value,
      LOCALIDAD: localidadSel,
      DOMI_COBR: domiCobRef.current.value,
      DOMI_LAB: domiLabRef.current.value,
      ALTA: altaRef.current.value,
      VIGENCIA: vigenciaRef.current.value,
      OBRA_SOC: obraSocSel,
      TELEFONO: telefonoRef.current.value,
      MOVIL: movilRef.current.value,
      MAIL: mailRef.current.value,
      EMPRESA: "SM",
      OPERADOR: usu.usuario,
      PLAN: planSel,
      SEXO: sexoSel,
      f: "edit socio",
    };

    if (data.GRUPO !== "") {
      putDato(data.GRUPO, "I", "GRUPO");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos, GRUPO anterior: ${ficha.GRUPO} ----> GRUPO nuevo: ${data.GRUPO}.`,
        FECHA: moment().format("DD/MM/YYYY HH:mm"),
        f: "reg historia",
      };

      registrarHistoria(hist);
    } else if (data.ZONA !== "") {
      putDato(data.ZONA, "S", "ZONA");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos,  ZONA anterior: ${ficha.ZONA} ----> ZONA nueva: ${data.ZONA}.`,
        FECHA: moment().format("DD/MM/YYYY HH:mm"),
        f: "reg historia",
      };

      registrarHistoria(hist);
    } else if (data.SUCURSAL !== "") {
      putDato(data.SUCURSAL, "S", "SUCURSAL");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos, SUCURSAL anterior: ${ficha.SUCURSAL} ----> SUCURSAL nueva: ${data.SUCURSAL}.`,
        FECHA: moment().format("DD/MM/YYYY HH:mm"),
        f: "reg historia",
      };

      registrarHistoria(hist);
    } else if (data.PRODUCTO !== "") {
      putDato(data.PRODUCTO, "S", "PRODUCTOR");

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
    } else if (data.CALLE !== "") {
      putDato(data.CALLE, "S", "CALLE");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos, CALLE anterior: ${ficha.CALLE} ----> CALLE nuevo: ${data.CALLE}.`,
        FECHA: moment().format("DD/MM/YYYY HH:mm"),
        f: "reg historia",
      };

      registrarHistoria(hist);
    } else if (data.NRO_CALLE !== "") {
      putDato(data.NRO_CALLE, "I", "NRO_CALLE");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos, N° CALLE anterior: ${ficha.NRO_CALLE} ----> N° CALLE nuevo: ${data.NRO_CALLE}.`,
        FECHA: moment().format("DD/MM/YYYY HH:mm"),
        f: "reg historia",
      };

      registrarHistoria(hist);
    } else if (data.BARRIO !== "") {
      putDato(data.BARRIO, "S", "BARRIO");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos, BARRIO anterior: ${ficha.BARRIO} ----> BARRIO nuevo: ${data.BARRIO}.`,
        FECHA: moment().format("DD/MM/YYYY HH:mm"),
        f: "reg historia",
      };

      registrarHistoria(hist);
    } else if (data.LOCALIDAD !== "") {
      putDato(data.LOCALIDAD, "S", "LOCALIDAD");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos, LOCALIDAD anterior: ${ficha.LOCALIDAD} ----> LOCALIDAD nueva: ${data.LOCALIDAD}.`,
        FECHA: moment().format("DD/MM/YYYY HH:mm"),
        f: "reg historia",
      };

      registrarHistoria(hist);
    } else if (data.TELEFONO !== "") {
      putDato(data.TELEFONO, "S", "TELEFONO");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos, TELEFONO anterior: ${ficha.TELEFONO} ----> TELEFONO nuevo: ${data.TELEFONO}.`,
        FECHA: moment().format("DD/MM/YYYY HH:mm"),
        f: "reg historia",
      };

      registrarHistoria(hist);
    } else if (data.MOVIL !== "") {
      putDato(data.MOVIL, "S", "MOVIL");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos, MOVIL anterior: ${ficha.MOVIL} ----> MOVIL nuevo: ${data.MOVIL}.`,
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
    } else if (data.MAIL !== "") {
      putDato(data.MAIL, "S", "MAIL");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos, MAIL anterior: ${ficha.MAIL} ----> MAIL nuevo: ${data.MAIL}.`,
        FECHA: moment().format("DD/MM/YYYY HH:mm"),
        f: "reg historia",
      };

      registrarHistoria(hist);
    } else if (data.PLAN !== "") {
      putDato(data.PLAN, "S", "PLAN");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos, PLAN anterior: ${ficha.PLAN} ----> PLAN nuevo: ${data.PLAN}.`,
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
    } else if (data.DOMI_COBR !== "") {
      putDato(data.DOMI_COBR, "S", "DOMI_COBR");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos, Domicilio Cobrador anterior: ${ficha.DOMI_COBR} ----> Domicilio Cobrador nuevo: ${data.DOMI_COBR}.`,
        FECHA: moment().format("DD/MM/YYYY HH:mm"),
        f: "reg historia",
      };

      registrarHistoria(hist);
    } else if (data.DOMI_LAB !== "") {
      putDato(data.DOMI_LAB, "S", "DOM_LAB");

      let hist = {
        CONTRATO: ficha.CONTRATO,
        OPERADOR: usu.usuario,
        ACCION: `Edicion de datos, Domicilio Laboral anterior: ${ficha.DOMI_LAB} ----> Domicilio Laboral nuevo: ${data.DOMI_LAB}.`,
        FECHA: moment().format("DD/MM/YYYY HH:mm"),
        f: "reg historia",
      };

      registrarHistoria(hist);
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
            <FormEditarTitular
              ficha={ficha}
              grupos={grupos}
              zonas={zonas}
              sucursales={sucursales}
              procutores={procutores}
              localidades={localidades}
              obraSoc={obraSoc}
              planes={planes}
              cuotaRef={cuotaRef}
              apellidoRef={apellidoRef}
              nombreRef={nombreRef}
              dniRef={dniRef}
              fechaNacRef={fechaNacRef}
              altaRef={altaRef}
              vigenciaRef={vigenciaRef}
              domiRef={domiRef}
              nDomiRef={nDomiRef}
              barrioRef={barrioRef}
              domiCobRef={domiCobRef}
              domiLabRef={domiLabRef}
              mailRef={mailRef}
              telefonoRef={telefonoRef}
              movilRef={movilRef}
              handleChange={handleChange}
              errores={errores}
              alertas={alertas}
              checkEdad={checkEdad}
              checkvigencia={checkvigencia}
              vigencia={vigencia}
              sexo={sexo}
              editSocio={editSocio}
            />
          )}
        </>
      )}
    </>
  );
}

export default editartitular;
