import React from "react";
import { Typography, MenuItem } from "@material-tailwind/react";
import useUser from "@/hook/useUser";
import jsCookie from "js-cookie";
import { Socios } from "./Socios";
import { Administracion } from "./Administracion";
import { Cobranza } from "./Cobranza";
import { Gestion } from "./Gestion";

export const NavListItems = ({}) => {
  const { user, isLoading } = useUser();
  let usu = {};

  if (jsCookie.get("usuario")) {
    usu = JSON.parse(jsCookie.get("usuario"));
  }

  return (
    <>
      <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
        {usu.administracion === 1 ? <Administracion /> : null}
        {/* {usu.gestion === true ? <Gestion usu={usu} /> : null} */}
        {usu.cobranza === 1 ? <Cobranza /> : null}
        {usu.socios === 1 ? <Socios /> : null}
      </ul>
    </>
  );
};
