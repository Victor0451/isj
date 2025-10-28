import React from "react";
import Editor from "../Layouts/Editor";
import { FormSubirArchivos } from "../archivos/FormSubirArchivos";
import { Archivo } from "../archivos/Archivo";
import {
  Card,
  CardBody,
  Typography,
  Alert,
  Button,
  Select,
  Option,
  Input,
  Drawer,
  IconButton,
  Badge,
} from "@material-tailwind/react";
import {
  CheckCircleIcon,
  XCircleIcon,
  PrinterIcon,
  FolderIcon,
  ArrowUpCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

const FormRedactar = ({
  handleChange,
  operadores,
  operadoSel,
  eliminarDestino,
  eliminarTodosDestino,
  getDescrip,
  handleUpload,
  file,
  asuntoRef,
  errores,
  registrarMsg,
  archivos,
  eliminarArchivos,
  cajasMail,
  cajasMailSel,
  eliminarLink,
  eliminarTodosLink,
}) => {
  return (
    <>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative w-full mb-6 group">
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative w-full mb-6 group">
              <Select
                label="Elige un Destinatario"
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
                onChange={(value) => {
                  handleChange("operador", value);
                }}
              >
                {operadores.map((i, index) => (
                  <Option key={index} value={i.usuario}>
                    {i.usuario}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="relative w-fullcodmail={codmail} mb-6 group">
              <Button onClick={eliminarTodosDestino} color="red">
                Borrar Destinatarios
              </Button>
            </div>
          </div>
        </div>

        <div className="relative w-full mb-6 group">
          <div className="grid md:grid-cols-1 md:gap-6">
            <div className="relative w-full mb-6 group">
              {operadoSel.length === 0 ? (
                <Alert
                  icon={
                    <InformationCircleIcon
                      strokeWidth={2}
                      className="h-6 w-6"
                    />
                  }
                >
                  No hay destinatarios seleccionados.
                </Alert>
              ) : (
                <>
                  {operadoSel.map((o, index) => (
                    <Badge key={index} content="X">
                      <Button
                        onClick={() => eliminarDestino(index)}
                        className=" border-2"
                        size="sm"
                      >
                        {o}
                      </Button>
                    </Badge>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className=" mb-10">
        <Input label="Asunto" inputRef={asuntoRef} />
      </div>
      <div className="border-2">
        <Editor
          getDescrip={getDescrip}
          placeholder={"Descripcion del mail"}
          val={0}
        />
      </div>

      <hr className="border-2 mt-5 mb-5" />

      <Typography variant="paragraph" color="blue-gray" className="mt-5">
        <u>Link de Cajas Generadas</u>
      </Typography>

      <div className="mt-5 border-2 rounded-lg p-4">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative w-full mb-6 group">
            <Select
              label="Elige un Destinatario"
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
              onChange={(value) => {
                handleChange("link", value);
              }}
            >
              {cajasMail.map((i, index) => (
                <Option key={index} value={i.value}>
                  {i.label}
                </Option>
              ))}
            </Select>
          </div>
          <div className="relative w-full mb-6 group">
            {cajasMailSel.length === 0 ? (
              <Alert
                icon={
                  <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
                }
              >
                No hay cajas seleccionadas.
              </Alert>
            ) : (
              <>
                {cajasMailSel.map((o, index) => (
                  <Badge key={index} content="X">
                    <Button
                      onClick={() => eliminarLink(index)}
                      className=" border-2"
                      size="sm"
                    >
                      {o}
                    </Button>
                  </Badge>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <hr className="border-2 mt-5 mb-5" />

      <Typography variant="paragraph" color="blue-gray" className="mt-5">
        <u>Adjuntos</u>
      </Typography>

      <div className="mt-5 border-2 rounded-lg p-4">
        <FormSubirArchivos handleUpload={handleUpload} file={file} />
      </div>

      <hr className="mt-5 mb-5 border-2" />

      <div className="p-4 border-2 rounded-lg mt-6">
        <Typography variant="h5" color="blue-gray" className="mb-6">
          Adjuntos
        </Typography>

        <div className="grid md:grid-cols-3 md:gap-6">
          {archivos.length > 0 ? (
            <>
              {archivos.map((a, index) => (
                <div key={index} className="relative z-0 w-full mb-6 group">
                  <Archivo
                    url={"api/archivos/mails/archivo/"}
                    urlDesc={"api/archivos/mails/descargararchivo/"}
                    archivo={a.adjunto}
                    eliminarArchivos={eliminarArchivos}
                  />
                </div>
              ))}
            </>
          ) : null}
        </div>
      </div>

      {errores ? (
        <Alert
          className="mt-5 mb-5"
          color="red"
          icon={<InformationCircleIcon strokeWidth={2} className="h-6 w-6" />}
        >
          {errores}
        </Alert>
      ) : null}

      <div className="flex justify-end mt-6">
        <Button onClick={registrarMsg}>Enviar</Button>

        <Button
          className="ml-1"
          color="red"
          onClick={() => {
            Router.reload();
          }}
        >
          Canelar
        </Button>
      </div>
    </>
  );
};

export default FormRedactar;
