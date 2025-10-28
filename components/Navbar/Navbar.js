import React, { use, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Bars2Icon, BellIcon } from "@heroicons/react/24/outline";
import { NavListItems } from "./NavListItems";
import { ProfileMenu } from "./ProfileMenu";

export default function ComplexNavbar({ user, msj, orde, prest }) {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth < 1000 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto max-w-full p-2 lg:pl-6 bg-deep-orange-900"> 
      <div className="relative mx-auto flex items-center">
        <Typography
          as="a"
          href="/"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          MUTUAL I.S.J.
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavListItems />
        </div>
        <IconButton
          size="sm"
          color="white"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        <ProfileMenu user={user} msj={msj} orde={orde} prest={prest} />
      </div>

      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavListItems />
      </Collapse>
    </Navbar>
  );
}
