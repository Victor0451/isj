import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Alert,
  Button,
  Option,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";

import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";
import Select from "react-select";
import ListadoAdherentes from "./ListadoAdherentes";
import ModalNuevoAdherente from "./ModalNuevoAdherente";

const FormNuevosAdherentes = ({
  ficha,
  adherentes,
  obraSoc,
  procutores,
  handleChange,
  apellidoRef,
  nombreRef,
  dniRef,
  fechaNacRef,
  altaRef,
  vigenciaRef,
  errores,
  regAdh,
  fclose,
  checkvigencia,
  vigencia,
  alertas,
  sexo,
}) => {
  return (
    <Card className="h-full w-full p-4 ">
      <CardBody className="rounded-none">
        <Typography variant="h2">Registro de Adherentes</Typography>

        <div className="w-full  p-4 border-2 rounded-xl mt-5">
          <Typography variant="h5">Datos de la Ficha</Typography>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/5 px-3 mt-6 mb-6 md:mb-0">
              <Input
                size="md"
                label="N° Ficha"
                type="number"
                defaultValue={ficha.CONTRATO}
                readOnly
              />
            </div>
            <div className="w-full md:w-1/5 px-3 mt-6 mb-6 md:mb-0">
              <Input
                size="md"
                label="Plan"
                type="text"
                defaultValue={`${ficha.PLAN}`}
                readOnly
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
              <Input
                size="md"
                label="Titular"
                type="text"
                defaultValue={`${ficha.APELLIDOS}, ${ficha.NOMBRES}`}
                readOnly
              />
            </div>
            <div className="w-full md:w-1/5 px-3 mt-6 mb-6 md:mb-0">
              <Input
                size="md"
                label="Obra Social"
                type="text"
                defaultValue={ficha.OBRA_SOC}
                readOnly
              />
            </div>
            <div className="w-full md:w-1/5 px-3 mt-6 mb-6 md:mb-0">
              <Input
                size="md"
                label="Alta"
                type="text"
                defaultValue={moment(ficha.ALTA).format("DD/MM/YYYY")}
                readOnly
              />
            </div>{" "}
            <div className="w-full md:w-1/5 px-3 mt-6 mb-6 md:mb-0">
              <Input
                size="md"
                label="Alta"
                type="text"
                defaultValue={moment(ficha.VIGENCIA).format("DD/MM/YYYY")}
                readOnly
              />
            </div>
          </div>
        </div>
        <hr className="mt-5 mb-5" />
        <div className="w-full  p-4 border-2 rounded-xl mt-5">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-4/6 px-3 mt-6 mb-6 md:mb-0">
              <Typography variant="h5">Listado de Adherentes</Typography>
            </div>
            <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
              <ModalNuevoAdherente
                handleChange={handleChange}
                obraSoc={obraSoc}
                apellidoRef={apellidoRef}
                nombreRef={nombreRef}
                dniRef={dniRef}
                fechaNacRef={fechaNacRef}
                altaRef={altaRef}
                vigenciaRef={vigenciaRef}
                procutores={procutores}
                errores={errores}
                regAdh={regAdh}
                fclose={fclose}
                checkvigencia={checkvigencia}
                vigencia={vigencia}
                alertas={alertas}
                sexo={sexo}
              />
            </div>
          </div>

          <div className="mt-10 border-2 rounded-xl p-4">
            {adherentes.length === 0 ? (
              <Alert
                className="mt-5 mb-5"
                color="blue"
                icon={
                  <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
                }
              >
                Esta ficha no posee adherentes registrados.
              </Alert>
            ) : (
              <ListadoAdherentes listado={adherentes} />
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default FormNuevosAdherentes;
