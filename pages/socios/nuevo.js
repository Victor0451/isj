import React, { useState } from "react";
import useUser from "@/hook/useUser";
import { Skeleton } from "@/components/Layouts/Skeleton";
import useWerchow from "@/hook/useWerchow";
import axios, { all } from "axios";
import { toast } from "react-toastify";
import { Redirect } from "@/components/auth/Redirect";
import useSWR from "swr";
import { confirmAlert } from "react-confirm-alert";
import moment, { months } from "moment";
import { registrarHistoria } from "@/libs/funciones";
import Router, { useRouter } from "next/router";
import FormNuevoSocio from "@/components/socios/FormNuevoSocio";

function nuevo(props) {
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
  const [infoDNI, guardarInfoDNI] = useState(null);
  const [nFicha, guardarNFicha] = useState(0);
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
  const [chkDNI, guardarChkDNI] = useState(false);

  const { usu } = useWerchow();

  const { isLoading } = useUser();

  const traerDatos = async () => {
    await setInterval(() => {
      axios
        .get("/api/socios", {
          params: {
            f: "traer n ficha",
          },
        })
        .then((res) => {
          if (res.data.length === 1) {
            let ficha = res.data[0].CONTRATO + 1;

            guardarNFicha(ficha);
          } else {
            guardarNFicha(1);
          }
        })
        .catch((error) => {
          console.log(error);

          toast.error("Ocurrio un error al generar el listado de localidades");
        });
    }, 1000);

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

  const regCuota = async (contrato, cuota) => {
    let data = {
      f: "reg cuota",
      CONTRATO: contrato,
      IMPORTE: cuota,
      CUO_ANT: 0,
      DESDE: moment().format("YYYY-MM-DD"),
      OPERADOR: usu.usuario,
    };

    await axios
      .post("/api/socios", data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Cuota Registrada");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocurrio un error al registrar la cuota");
      });
  };

  const regSocio = async () => {
    guardarAlertas(null);
    guardarErrores(null);

    let data = {
      CONTRATO: nFicha,
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
      ESTADO: true,
      f: "reg socio",
    };

    if (data.GRUPO === "") {
      guardarErrores(
        "Debes seleccionar el grupo o medio de pago al cual pertenecera esta ficha"
      );
    } else if (data.ZONA === "") {
      guardarErrores(
        "Debes seleccionar zona de cobranza al cual pertenecera esta ficha"
      );
    } else if (data.SUCURSAL === "") {
      guardarErrores("Debes seleccionar a que sucursal pertenecera esta ficha");
    } else if (data.PRODUCTO === "") {
      guardarErrores("Debes seleccionar quien es el productor de esta ficha");
    } else if (data.ALTA === "") {
      guardarErrores("Debes ingresar la fecha de alta de esta ficha");
    } else if (cuotaRef.current.value === "") {
      guardarErrores("Debes ingresar la cuota mensual de esta ficha");
    } else if (data.APELLIDOS === "") {
      guardarErrores("Debes ingresar el apellido del titular");
    } else if (data.NOMBRES === "") {
      guardarErrores("Debes ingresar el nombre del titular");
    } else if (data.NRO_DOC === "") {
      guardarErrores("Debes ingresar el DNI del titular");
    } else if (data.NACIMIENTO === "") {
      guardarErrores("Debes ingresar la fecha de nacimiento del titular");
    } else if (data.NOMBRES === "") {
      guardarErrores("Debes ingresar el nombre del titular");
    } else if (data.CALLE === "") {
      guardarErrores(
        "Debes ingresar el nombre de la calle donde reside el titular"
      );
    } else if (data.NRO_CALLE === "") {
      guardarErrores("Debes ingresar el N° de calle donde reside titular");
    } else if (data.BARRIO === "") {
      guardarErrores("Debes ingresar el barrio donde reside titular");
    } else if (data.LOCALIDAD === "") {
      guardarErrores("Debes ingresar la localidad donde reside titular");
    } else if (data.TELEFONO === "") {
      guardarErrores("Debes ingresar un N° de telefono");
    } else if (data.OBRA_SOC === "") {
      guardarErrores("Debes seleccionar la obra social del titular");
    } else {
      await confirmAlert({
        title: "ATENCION",
        message: "¿Estas seguro de registrar este nuevo socio?",
        buttons: [
          {
            label: "Si",
            onClick: () => {
              axios
                .post("/api/socios", data)
                .then((res) => {
                  if (res.status === 200) {
                    toast.success("La ficha fue registrada exitosamente");

                    regCuota(data.CONTRATO, cuotaRef.current.value);

                    let hist = {
                      CONTRATO: data.CONTRATO,
                      OPERADOR: usu.usuario,
                      ACCION: `Alta nuevo socio: ${data.APELLIDOS}, ${data.NOMBRES}, con una cuota de $${cuotaRef.current.value}.`,
                      FECHA: moment().format("DD/MM/YYYY HH:mm"),
                      f: "reg historia",
                    };

                    registrarHistoria(hist);

                    confirmAlert({
                      title: "ATENCION",
                      message: "¿Quieres cargar los adherentes ahora?",
                      buttons: [
                        {
                          label: "Si",
                          onClick: () => {
                            Router.push({
                              pathname: "/socios/adherentes",
                              query: {
                                contrato: data.CONTRATO,
                              },
                            });
                          },
                        },
                        {
                          label: "No",
                          onClick: () => {
                            toast.info(
                              "Podras cargar sus adherentes en otro momento."
                            );
                            Router.reload();
                          },
                        },
                      ],
                    });
                  }
                })
                .catch((error) => {
                  console.log(error);
                  toast.error("Ocurrio un error al registrar esta ficha");
                });
            },
          },
          {
            label: "No",
            onClick: () => {
              toast.info(
                "La ficha no fue registrada. Puedes seguir chekeando los datos y cuando estes seguro, registrarla."
              );
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

  const checkExistenciaDni = async () => {
    let dni = dniRef.current.value;

    if (dni === "") {
      guardarErrores("Debes ingresar el DNI del titular");
    } else if (dni.length < 7) {
      guardarErrores("El DNI debe tener al menos 7 dígitos.");
      guardarChkDNI(false); // Aseguramos que no se muestre el formulario si la validación falla
    } else {
      await axios
        .get("/api/socios", {
          params: {
            f: "maestro",
            dni: dni,
          },
        })
        .then((res) => {
          const dat = JSON.parse(res.data);
          if (dat.length !== 0) {
            guardarChkDNI(false);
            guardarInfoDNI(
              `El DNI ingresado esta registrado como titular y pertenece a la ficha N° ${dat[0].CONTRATO} - ${dat[0].APELLIDOS},  ${dat[0].NOMBRES}.`
            );
          } else {
            axios

              .get("/api/socios", {
                params: {
                  f: "mae adh",
                  dni: dni,
                },
              })
              .then((res2) => {
                const dat2 = JSON.parse(res2.data);
                if (dat2.length !== 0) {
                  guardarChkDNI(false);
                  guardarInfoDNI(
                    `El DNI ingresado esta registrado como adherente y pertenece a ${dat2[0].APELLIDOS},  ${dat2[0].NOMBRES} en la ficha N° ${dat2[0].CONTRATO}.`
                  );
                } else {
                  guardarChkDNI(true);
                  guardarInfoDNI(
                    `El DNI ingresado no esta registrado en el sistema.`
                  );
                }
              })
              .catch((error) => {
                console.log(error);
                toast.error(
                  "Ocurrio un error al chequear el DNI en tabla adherentes"
                );
              });
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ocurrio un error al chequear el DNI en titulares");
        });
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
          <FormNuevoSocio
            nFicha={nFicha}
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
            regSocio={regSocio}
            errores={errores}
            alertas={alertas}
            checkEdad={checkEdad}
            checkvigencia={checkvigencia}
            vigencia={vigencia}
            sexo={sexo}
            chkDNI={chkDNI}
            checkExistenciaDni={checkExistenciaDni}
            infoDNI={infoDNI}
          />
        </>
      )}
    </>
  );
}

export default nuevo;
