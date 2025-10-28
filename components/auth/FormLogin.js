import React from "react";
import { Alert, Card, CardHeader } from "@material-tailwind/react";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

export const FormLogin = ({
  usuarioRef,
  contrasenaRef,
  iniciarSesion,
  errores,
}) => {
  return (
    <div className="flex justify-center">
      <Card className=" w-1/2 h-1/2  px-6 py-12 lg:px-8 ">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="img/logo.png"
              alt="Your Company"
            />

            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Mutual ISJ - Bienvenido
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="usuario"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Usuario
                </label>
                <div className="mt-2">
                  <input
                    id="usuario"
                    type="text"
                    placeholder="Usuario"
                    required
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ref={usuarioRef}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Contraseña
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    required
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ref={contrasenaRef}
                  />
                </div>
              </div>

              {errores ? (
                <Alert
                  color="red"
                  icon={
                    <InformationCircleIcon
                      strokeWidth={2}
                      className="h-6 w-6"
                    />
                  }
                >
                  {errores}
                </Alert>
              ) : null}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => iniciarSesion()}
                >
                  Iniciar Sesion
                </button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
