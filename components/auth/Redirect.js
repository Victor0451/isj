import React from "react";
import {
  Card,
  CardBody,
  Typography,
  Alert,
  Button,
  Select,
  Option,
  Input,
} from "@material-tailwind/react";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";

export const Redirect = () => {
  return (
    <Card className="h-full w-full p-4 ">
      <CardBody className="rounded-none">
        <img
          className=" max-h-full max-w-full rounded-xl"
          src="/img/logerr.jpg"
          alt="No Registrado"
        />

        <div className="mt-10 ">
          <Typography variant="h5" color="black">
            Se requiere autorizacion para navergar por el sistema. Haz click en
            el link para {""}
            <a
              href="/"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Iniciar Sesion
            </a>
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
};
