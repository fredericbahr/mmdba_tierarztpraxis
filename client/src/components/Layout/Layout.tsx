import { HourglassMedium, House, PawPrint, Pill, Users } from "phosphor-react";
import React from "react";
import { Outlet } from "react-router-dom";

import { ISidebarItem } from "../SideNavigation/SidebarContent";
import { SideNavigation } from "../SideNavigation/SideNavigation";

export const Layout = () => {
  const navbarItems: ISidebarItem[] = [
    {
      name: "Home",
      icon: House,
      route: "/",
    },
    {
      name: "Animals",
      icon: PawPrint,
      route: "/animal",
    },
    {
      name: "Customer",
      icon: Users,
      route: "/customer",
    },
    {
      name: "Medicine",
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
