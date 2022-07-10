import { FirstAidKit, HourglassMedium, House, PawPrint, Pill, Users } from "phosphor-react";
import React from "react";
import { Outlet } from "react-router-dom";

import { ISidebarItem } from "../SideNavigation/SidebarContent";
import { SideNavigation } from "../SideNavigation/SideNavigation";

export const Layout = () => {
  const navbarItems: ISidebarItem[] = [
    {
      label: "Home",
      icon: House,
      route: "/",
    },
    {
      label: "Tiere",
      icon: PawPrint,
      route: "/animal",
    },
    {
      label: "Kunden",
      icon: Users,
      route: "/customer",
    },
     {
      label: "Behandlungen",
      icon: FirstAidKit,
      route: "/treatment",
     },
    {
      label: "Medikamente",
      icon: Pill,
      route: "/medicine",
    },
  ];

  return (
    <SideNavigation items={navbarItems}>
      <Outlet />
    </SideNavigation>
  );
};
