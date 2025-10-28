import React from "react";
import Link from "next/link";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

export const AccesosDirectos = () => {
  return (
    <div className="mt-4">
      <Typography variant="h5" color="blue-gray">
        Accesos Directos
      </Typography>

      <div className="mt-4 grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-3">
        <Card className="mt-6">
          <CardBody>
            <ArrowRightCircleIcon className="text-blue-500 w-12 h-12 mb-4" />
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Sistema de Servicios Medicos.
            </Typography>
            <Typography>
              Sistema para generar ordenes de consultas y practicas medicas.
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Link href="http://190.231.67.172:3002/" target="__blank">
              <Button
                size="sm"
                variant="text"
                className="flex items-center gap-2"
              >
                Acceder
                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="mt-6">
          <CardBody>
            <ArrowRightCircleIcon className="text-blue-500 w-12 h-12 mb-4" />
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Werchow S.G.I. (VICTOR)
            </Typography>
            <Typography>Sistema de gestion integral WERCHOW.</Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Link href="http://190.231.67.172:3001/" target="__blank">
              <Button
                size="sm"
                variant="text"
                className="flex items-center gap-2"
              >
                Acceder
                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="mt-6">
          <CardBody>
            <ArrowRightCircleIcon className="text-blue-500 w-12 h-12 mb-4" />
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Werchow S.G.I. (ROMINA).
            </Typography>
            <Typography>Sistema de gestion de ventas.</Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Link
              href="http://190.231.67.172:3000/werchow/log.php"
              target="__blank"
            >
              <Button
                size="sm"
                variant="text"
                className="flex items-center gap-2"
              >
                Acceder
                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="mt-6">
          <CardBody>
            <ArrowRightCircleIcon className="text-blue-500 w-12 h-12 mb-4" />
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Alta de Fichas
            </Typography>
            <Typography>
              Este es un acceso rapido al formulario para el alta de nuevos
              socios.
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Link href="/socios/nuevo">
              <Button
                size="sm"
                variant="text"
                className="flex items-center gap-2"
              >
                Registrar Ficha
                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="mt-6">
          <CardBody>
            <ArrowRightCircleIcon className="text-blue-500 w-12 h-12 mb-4" />
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Legajo Virtual
            </Typography>
            <Typography>
              Este es un acceso rapido al legajo virtual del socio, donde figura
              su informacion personal, adherentes y pagos, emulando la funcion
              del fox.
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Link href="/socios/legajo">
              <Button
                size="sm"
                variant="text"
                className="flex items-center gap-2"
              >
                Buscar Ficha
                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="mt-6">
          <CardBody>
            <ArrowRightCircleIcon className="text-blue-500 w-12 h-12 mb-4" />
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Prints de Pago y Ficha.
            </Typography>
            <Typography>
              Acceso rapido para generar prinst de la ficha del socio.
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Link href="/socios/prints">
              <Button
                size="sm"
                variant="text"
                className="flex items-center gap-2"
              >
                Buscar Ficha
                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
