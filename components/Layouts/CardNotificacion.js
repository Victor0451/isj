import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Badge,
} from "@material-tailwind/react";
import { BellAlertIcon, BellSlashIcon } from "@heroicons/react/24/solid";

const CardNotificacion = ({ titulo, descripcion, url, noti }) => {
  return (
    <Card className="mt-6 ml-2">
      <CardBody>
        {noti > 0 ? (
          <Badge content={noti}>
            <BellAlertIcon className="text-blue-500 w-12 h-12 mb-4" />
          </Badge>
        ) : noti === 0 ? (
          <Badge content={noti}>
            <BellSlashIcon className="text-blue-500 w-12 h-12 mb-4" />
          </Badge>
        ) : null}

        <Typography variant="h5" color="blue-gray" className="mb-2">
          {titulo}
        </Typography>
        <Typography>{descripcion}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <a href={`${url}`} className="inline-block">
          <Button size="sm" variant="text" className="flex items-center gap-2">
            Acceder
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default CardNotificacion;
