import React from "react";
import {
  ArrowDownCircleIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import ModalArchivoImg from "./ModalArchivoImg";
import { ip } from "@/config/config";
import Link from "next/link";

export const Archivo = ({ url, urlDesc, archivo, eliminarArchivos }) => {
  return (
    <figure className="relative h-full w-full">
      <img
        className="h-full w-full rounded-xl"
        src={`${ip}${url}${archivo}`}
        alt="nature image"
      />
      <figcaption className="absolute bottom-2 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-center rounded-xl border border-white bg-gray-300  px-2 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm p-1 ">
        <div>
          <div className="grid md:grid-cols-3 md:gap-6">
            <div>
              <ModalArchivoImg archivo={archivo} url={url} />
            </div>

            <div>
              <Link href={`${ip}${urlDesc}${archivo}`}>
                <ArrowDownCircleIcon
                  color="green"
                  className="butlist mt-px h-6 w-6"
                />
              </Link>
            </div>

            <div>
              <TrashIcon
                color="red"
                className="butlist mt-px h-6 w-6"
                onClick={() => {
                  eliminarArchivos(archivo);
                }}
              />
            </div>
          </div>
        </div>
      </figcaption>
    </figure>
  );
};
