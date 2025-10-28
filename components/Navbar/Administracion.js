import React from "react";
import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  ChevronDownIcon,
  ArrowDownLeftIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export const Administracion = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setIsMenuOpen(true),
    onMouseLeave: () => setIsMenuOpen(false),
  };

  return (
    <React.Fragment>
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem
              {...triggers}
              className="hidden items-center gap-2 lg:flex lg:rounded-full"
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" />{" "}
              Administracion{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList
          {...triggers}
          className="hidden  grid-cols-4 gap-3 overflow-visible lg:grid"
        >
          <ul className="col-span-4 flex w-full flex-col gap-1">
            <Menu placement="right-start">
              <MenuHandler>
                <MenuItem className="hidden items-center gap-2 lg:flex lg:rounded-full">
                  <Typography color="black">Contabilidad</Typography>
                  <ChevronDownIcon
                    strokeWidth={2}
                    className={`h-3 w-3 transition-transform `}
                  />
                </MenuItem>
              </MenuHandler>
              <MenuList>
                <Link href={"/contabilidad/cuentas"}>
                  <MenuItem>
                    <Typography color="black">Plan de Cuentas</Typography>
                  </MenuItem>
                </Link>
              </MenuList>
            </Menu>

            <Link href={"/administracion/historial/panel"}>
              <MenuItem>
                <Typography color="black">Historial del Sistema</Typography>
              </MenuItem>
            </Link>

            <Menu placement="right-start">
              <MenuHandler>
                <MenuItem className="hidden items-center gap-2 lg:flex lg:rounded-full">
                  <Typography color="black">Informes</Typography>
                  <ChevronDownIcon
                    strokeWidth={2}
                    className={`h-3 w-3 transition-transform `}
                  />
                </MenuItem>
              </MenuHandler>
              <MenuList>
                <Link href={"/cobranza/efectividad"}>
                  <MenuItem>
                    <Typography color="black">
                      Efectividad de Cobranza
                    </Typography>
                  </MenuItem>
                </Link>
                <Link href={"/ventas/informeventas"}>
                  <MenuItem>
                    <Typography color="black">Informe de Ventas</Typography>
                  </MenuItem>
                </Link>
              </MenuList>
            </Menu>

            <Menu placement="right-start">
              <MenuHandler>
                <MenuItem className="hidden items-center gap-2 lg:flex lg:rounded-full">
                  <Typography color="black">Noticias</Typography>
                  <ChevronDownIcon
                    strokeWidth={2}
                    className={`h-3 w-3 transition-transform `}
                  />
                </MenuItem>
              </MenuHandler>
              <MenuList>
                <Link href={"/administracion/noticias/nuevanoticia"}>
                  <MenuItem>
                    <Typography color="black">Registrar Noticia</Typography>
                  </MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </ul>
        </MenuList>
      </Menu>

      <MenuItem className="flex items-center gap-2 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Administracion{" "}
      </MenuItem>
    </React.Fragment>
  );
};
