import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Alert,
  Button,
  Select,
  Option,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";

import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

const FormNuevaNoticia = ({ handleChange, errores, registrarNoticia }) => {
  return (
    <Card className="h-full w-full p-4 ">
      <CardBody className="rounded-none">
        <Typography variant="h2">
          <u>Registrar Noticias</u>
        </Typography>

        <div className="p-4 border-2 rounded-lg mt-6 ">
          <Typography variant="h5" color="blue-gray" className="mb-6">
            Ingrese el N° de Socio.
          </Typography>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative w-full mb-6 group">
              <Textarea
                rows={5}
                label="Noticia"
                onChange={(value) => {
                  handleChange("noti", value);
                }}
              />
            </div>
            <div className="relative w-full mb-6 group ">
              <div>
                <Select
                  defaultValue={""}
                  label="Elige el destinatario"
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                  onChange={(value) => {
                    handleChange("desti", value);
                  }}
                >
                  <Option value="2">Morosos</Option>
                  <Option value="3">Gerencia</Option>
                  <Option value="4">Sepelio</Option>
                  <Option value="5">Ventas</Option>
                </Select>
              </div>
              <div className="flex justify-end">
                <Button className="mt-10 " onClick={registrarNoticia}>
                  Registrar
                </Button>
              </div>
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
        </div>
      </CardBody>
    </Card>
  );
};

export default FormNuevaNoticia;
