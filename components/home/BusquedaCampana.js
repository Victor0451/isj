import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardBody,
  Input,
  Button,
  Alert,
} from "@material-tailwind/react";

import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import InfoCaso from "../Layouts/InfoCaso";

const BusquedaCampana = ({
  contratoRef,
  dniRef,
  buscarCaso,
  errores,
  alertas,
  caso,
  gestion,
}) => {
  return (
    <Card className="h-full w-full">
      <CardBody floated={"false"} shadow={"false"} className="rounded-xl">
        <div className="p-4 border-2 rounded-lg ">
          <Typography variant="h5" color="blue-gray" className="mb-6">
            Busqueda en Campañas
          </Typography>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
              <Input label="Contrato " inputRef={contratoRef} />
            </div>
            <div className="w-full md:w-1/6 px-3 mt-6 mb-6 md:mb-0">
              <Button className="" onClick={() => buscarCaso("HC")}>
                Buscar
              </Button>
            </div>
            <div className="w-full md:w-1/3 px-3 mt-6 mb-6 md:mb-0">
              <Input label="DNI " inputRef={dniRef} />
            </div>
            <div className="w-full md:w-1/6 px-3 mt-6 mb-6 md:mb-0">
              <Button className="" onClick={() => buscarCaso("DNI")}>
                Buscar
              </Button>
            </div>
          </div>

          {errores ? (
            <Alert
              color="red"
              icon={
                <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
              }
            >
              {errores}
            </Alert>
          ) : null}

          {alertas ? (
            <Alert
              color="blue"
              icon={
                <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
              }
            >
              {alertas}
            </Alert>
          ) : null}
        </div>

        {caso.length > 0 ? (
          <>
            <hr className="mt-5 mb-5 border-2" />
            <div className="mt-5 border-2 rounded-lg p-4">
              <Typography variant="h5" color="blue-gray" className="mb-6">
                Gestiones realizadas
              </Typography>

              <InfoCaso caso={caso} gestion={gestion} />
            </div>
          </>
        ) : null}
      </CardBody>
    </Card>
  );
};

export default BusquedaCampana;
