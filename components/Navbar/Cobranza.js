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

export const Cobranza = () => {
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
              <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Cobranza{" "}
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
              <Menu placement="right-start">
                <MenuHandler>
                  <MenuItem className="hidden items-center gap-2 lg:flex lg:rounded-full">
                    <Typography color="black">Recibos</Typography>
                    <ChevronDownIcon
                      strokeWidth={2}
                      className={`h-3 w-3 transition-transform `}
                    />
                  </MenuItem>
                </MenuHandler>
                <MenuList>
                  <Link href={"/cobranza/recibo"}>
                    <MenuItem>
                      <Typography color="black">Emision Recibo</Typography>
                    </MenuItem>
                  </Link>
                  <Link href={"/cobranza/listadorecibos"}>
                    <MenuItem>
                      <Typography color="black">Listado de Recibos</Typography>
                    </MenuItem>
                  </Link>
                  <Link href={"/cobranza/cargarecibo"}>
                    <MenuItem>
                      <Typography color="black">
                        Carga de Recibos Externos
                      </Typography>
                    </MenuItem>
                  </Link>
                </MenuList>
              </Menu>

              <Menu placement="right-start">
                <MenuHandler>
                  <MenuItem className="hidden items-center gap-2 lg:flex lg:rounded-full">
                    <Typography color="black">Caja</Typography>
                    <ChevronDownIcon
                      strokeWidth={2}
                      className={`h-3 w-3 transition-transform `}
                    />
                  </MenuItem>
                </MenuHandler>
                <MenuList>
                  <Link href={"/caja/cierre"}>
                    <MenuItem>
                      <Typography color="black">Cierre</Typography>
                    </MenuItem>
                  </Link>
                  <Link href={"/caja/listadocajas"}>
                    <MenuItem>
                      <Typography color="black">Listado de Caja</Typography>
                    </MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </Menu>
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Cobranza{" "}
      </MenuItem>
    </React.Fragment>
  );
};
