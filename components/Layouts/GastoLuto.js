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
import moment from "moment";

const GastoLuto = ({ plan, alta, cantadh, gl }) => {
  let inicio = moment(alta).format("YYYY-MM-DD");

  let anti = moment().diff(inicio, "years");

  return (
    <>
      <Alert
        color="blue"
        className="max-w-screen mt-5 mb-5"
        icon={<InformationCircleIcon className="mt-px h-6 w-6" />}
      >
        <Typography variant="h5" color="white">
          Gasto de Luto
        </Typography>
        <Typography color="white" className="mt-2 font-normal">
          El gasto de luto estimado para este socio es de: $
          {anti <= 3 ? <>{gl.gasto1}</> : anti > 3 ? <>{gl.gasto2}</> : null}
        </Typography>
      </Alert>
    </>
  );
};

export default GastoLuto;
