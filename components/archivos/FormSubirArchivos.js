import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Alert } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const fileTypes = ["JPG", "JPEG", "PNG", "GIF", "PDF", "DOCX", "XLS", "XLSX"];

export const FormSubirArchivos = ({ file, handleUpload }) => {
  return (
    <div className=" ">
      <div className="grid md:grid-cols-1 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <FileUploader
            handleChange={handleUpload}
            name="file"
            types={fileTypes}
          />
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <Typography variant="h6">
            {file
              ? `Archivo Seleccionado: ${file.name}`
              : "No hay archivos seleccionados aun"}
          </Typography>
        </div>
      </div>

      <Alert
        icon={<InformationCircleIcon strokeWidth={2} className="h-6 w-6" />}
        className="mt-6"
      >
        Se pueden subir archivos con formato "JPG", "JPEG", "PNG", "GIF", "PDF",
        "DOCX", "XLS", "XLSX". PERO TRATEN DE PRIORIZAR LAS IMAGENES.
      </Alert>
    </div>
  );
};
