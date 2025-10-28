import React from "react";
import {
  PrinterIcon,
  InformationCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Input,
  Alert,
  Typography,
  Option,
  Textarea,
  Card,
  CardBody,
  Button,
  Collapse,
} from "@material-tailwind/react";
import Link from "next/link";

const Restringed = () => {
  return (
    <Card className="h-full w-full p-4 mt-5 border-2 ">
      <CardBody className="rounded-none">
        <Typography className="mb-5 align-middle" variant="h1">
          <strong>AREA RESTRINGIDA</strong>
        </Typography>
        <Typography className="mb-5" variant="h5">
          No tienes permiso para acceder a esta sección.{" "}
          <Link href={"/"}>
            <Button>Volver Al Inicio</Button>
          </Link>
        </Typography>

        <div className=" flex justify-center">
          <img
            src="/img/restringed.png"
            className="logerr mt-4 mb-4 border border-dark 
        "
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default Restringed;
