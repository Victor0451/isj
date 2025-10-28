import React from "react";
import moment from "moment";
import { Alert, Typography } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon as InformationCircleIconSolid } from "@heroicons/react/24/solid";

const Alertas = ({ noticia }) => {
  return (
    <>
      {noticia ? (
        <div className="flex w-full flex-col gap-2">
          <Alert
            icon={<InformationCircleIcon strokeWidth={2} className="h-6 w-6" />}
          >
            <Typography className=" font-extrabold">Novedades:</Typography>
            <ul className="mt-2 ml-2 list-disc list-inside text-center">
              <li>{noticia.noticia}</li>
            </ul>
            <hr className="mt-2 text-center" />
            <p className="mt-2 text-center">
              {noticia.operador} -{" "}
              {moment.utc(noticia.fecha).format("DD/MM/YYYY")}
            </p>
          </Alert>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-2">
          <Alert
            icon={<InformationCircleIcon strokeWidth={2} className="h-6 w-6" />}
          >
            No hay novedades.
          </Alert>
        </div>
      )}
    </>
  );
};

export default Alertas;
