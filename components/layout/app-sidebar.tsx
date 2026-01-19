"use client"

import * as React from "react"
import { NavCommercial } from "@/components/layout/nav-commercial"
import { NavFinance } from "./nav-finance"
import { NavUser } from "@/components/layout/nav-user"
import { QuickMenu } from "@/components/layout/quick-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { navCommercial,modules, user, navFinance, navProduct, navStock } from "@/data/nav-bar-data"
import { NavProduct } from "./nav-product"
import { NavStock } from "./nav-stock"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <QuickMenu modules={modules} />
      </SidebarHeader>
      <SidebarContent>
        <NavCommercial items={navCommercial} />
        <NavFinance items={navFinance} />
        <NavProduct items={navProduct} />
        <NavStock items ={navStock} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
