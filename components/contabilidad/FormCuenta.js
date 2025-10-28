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
  Accordion,
  AccordionHeader,
  AccordionBody,
  Select,
} from "@material-tailwind/react";
import { AcordionIcon } from "../../libs/funciones";

import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";
import ListadoCuentas from "./ListadoCuentas";

const FormCuenta = ({
  nroCuentaRef,
  descCuentaRef,
  cuentas,
  handleChange,
  regCuenta,
  elimCuenta,
  errores,
}) => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <Card className="h-full w-full p-4 ">
      <CardBody className="rounded-none">
        <Typography variant="h2">Plan de Cuentas - San Miguel</Typography>

        <div className="w-full  p-4 border-2 rounded-xl mt-5">
          <Accordion
            open={open === 1}
            icon={<AcordionIcon id={1} open={open} />}
          >
            <AccordionHeader onClick={() => handleOpen(1)}>
              Registrar Nueva Cuenta
            </AccordionHeader>
            <AccordionBody className="p-4">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/4 px-3 mt-6 mb-6 md:mb-0">
                  <Input
                    size="md"
                    label="Nro Cuenta"
                    type="number"
                    inputRef={nroCuentaRef}
                  />
                </div>
                <div className="w-full md:w-3/6 px-3 mt-6 mb-6 md:mb-0">
                  <Input
                    size="md"
                    label="Cuenta"
                    type="text"
                    inputRef={descCuentaRef}
                  />
                </div>
                <div className="w-full md:w-1/4 px-3 mt-6 mb-6 md:mb-0">
                  <Select
                    label="Movimiento"
                    onChange={(value) => {
                      handleChange("movim", value);
                    }}
                  >
                    <Option value="I">Ingreso</Option>
                    <Option value="E">Egreso</Option>
                    <Option value="A">Ambas</Option>
                  </Select>
                </div>
              </div>
              <br />

              {errores ? (
                <Alert
                  className="mt-5 mb-5"
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

              <div className="flex justify-end mt-6">
                <Button className="" color="blue" onClick={regCuenta}>
                  Registrar
                </Button>
              </div>
            </AccordionBody>
          </Accordion>
          {/* <Accordion
            open={open === 2}
            icon={<AcordionIcon id={2} open={open} />}
          >
            <AccordionHeader onClick={() => handleOpen(2)}>
              How to use Material Tailwind?
            </AccordionHeader>
            <AccordionBody>
              We&apos;re not always in the position that we want to be at.
              We&apos;re constantly growing. We&apos;re constantly making
              mistakes. We&apos;re constantly trying to express ourselves and
              actualize our dreams.
            </AccordionBody>
          </Accordion>
          <Accordion
            open={open === 3}
            icon={<AcordionIcon id={3} open={open} />}
          >
            <AccordionHeader onClick={() => handleOpen(3)}>
              What can I do with Material Tailwind?
            </AccordionHeader>
            <AccordionBody>
              We&apos;re not always in the position that we want to be at.
              We&apos;re constantly growing. We&apos;re constantly making
              mistakes. We&apos;re constantly trying to express ourselves and
              actualize our dreams.
            </AccordionBody>
          </Accordion> */}
        </div>

        <div className="w-full  p-4 border-2 rounded-xl mt-5">
          <ListadoCuentas listado={cuentas} 
          elimCuenta={elimCuenta}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default FormCuenta;
