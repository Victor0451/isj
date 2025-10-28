import React, { useState } from "react";
import useUser from "@/hook/useUser";
import { Skeleton } from "@/components/Layouts/Skeleton";
import useWerchow from "@/hook/useWerchow";
import axios, { all } from "axios";
import { toast } from "react-toastify";
import { Redirect } from "@/components/auth/Redirect";
import FormPrintsSocio from "@/components/socios/FormPrintsSocio";

function Prints(props) {
  let dniRef = React.createRef();
  let contratoRef = React.createRef();
  let pagosRef = React.createRef();
  let fichaRef = React.createRef();

  const [errores, guardarErrores] = useState(null);
  const [alertas, guardarAlertas] = useState(null);
  const [ficha, guardarFicha] = useState([]);
  const [adhs, guardarAdhs] = useState([]);
  const [show, guardarShow] = useState(false);
  const [grupo, guardarGrupo] = useState("");
  const [allPagos, guardarAllPagos] = useState([]);

  const { usu } = useWerchow();

  const { isLoading } = useUser();

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
            guardarFicha(ficha);
            guardarShow(true);

            traerAdhs("adh", ficha[0].CONTRATO);

            descriGrupo(ficha[0].GRUPO);
            traerPagos(ficha[0].CONTRATO, ficha[0].EMPRESA);
          } else if (re.length === 0) {
            axios
              .get("/api/socios", {
                params: {
                  f: "mutual",
                  dni: dniRef.current.value,
                },
              })
              .then((res2) => {
                let re = JSON.parse(res2.data);

                if (re.length > 0) {
                  let ficha = JSON.parse(res2.data);
                  guardarFicha(ficha);
                  guardarShow(true);

                  traerAdhs("mutual adh", ficha[0].CONTRATO);

                  descriGrupo(ficha[0].GRUPO);
                  traerPagos(ficha[0].CONTRATO, ficha[0].EMPRESA);
                } else {
                  guardarAlertas(
                    "El DNI ingresado no esta registrado o pertenece a un adherente"
                  );
                  toast.info(
                    "El DNI ingresado no esta registrado o pertenece a un adherente"
                  );
                }
              })
              .catch((error) => {
                console.log(error);
                toast.error(
                  "Ocurrio un error al tarer los datos del socio en Mutual"
                );
              });
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

  const tarerSocioContrato = async () => {
    let contrato = contratoRef.current.value;

    if (contrato === "") {
      guardarErrores("Debes ingresar un numero de socio");
    } else {
      await axios
        .get(`/api/socios`, {
          params: {
            f: "maestro contrato",
            ficha: contrato,
          },
        })
        .then((res0) => {
          let re = JSON.parse(res0.data);
          if (re.length > 0) {
            let ficha = JSON.parse(res0.data);
            guardarFicha(ficha);
            guardarShow(true);

            traerAdhs("adh", ficha[0].CONTRATO);

            descriGrupo(ficha[0].GRUPO);
            traerPagos(ficha[0].CONTRATO, ficha[0].EMPRESA);
          } else if (re.length === 0) {
            axios
              .get("/api/socios", {
                params: {
                  f: "mutual contrato",
                  ficha: contrato,
                },
              })
              .then((res2) => {
                let re = JSON.parse(res2.data);

                if (re.length > 0) {
                  let ficha = JSON.parse(res2.data);
                  guardarFicha(ficha);
                  guardarShow(true);

                  traerAdhs("mutual adh", ficha[0].CONTRATO);

                  descriGrupo(ficha[0].GRUPO);
                  traerPagos(ficha[0].CONTRATO, ficha[0].EMPRESA);
                } else {
                  guardarAlertas(
                    "El DNI ingresado no esta registrado o pertenece a un adherente"
                  );
                  toast.info(
                    "El DNI ingresado no esta registrado o pertenece a un adherente"
                  );
                }
              })
              .catch((error) => {
                console.log(error);
                toast.error(
                  "Ocurrio un error al tarer los datos del socio en Mutual"
                );
              });
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

  if (isLoading === true) return <Skeleton />;

  return (
    <>
      {!usu ? (
        <Redirect />
      ) : (
        <>
          <FormPrintsSocio
            dniRef={dniRef}
            contratoRef={contratoRef}
            traerSocio={traerSocio}
            tarerSocioContrato={tarerSocioContrato}
            errores={errores}
            alertas={alertas}
            show={show}
            ficha={ficha[0]}
            adhs={adhs}
            grupo={grupo}
            allPagos={allPagos}
            fichaRef={fichaRef}
            pagosRef={pagosRef}
          />
        </>
      )}
    </>
  );
}

export default Prints;
