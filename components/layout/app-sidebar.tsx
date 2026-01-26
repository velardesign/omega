"use client"

import * as React from "react"
import {NavCommercial} from "@/components/layout/nav-commercial"
import {NavFinance} from "./nav-finance"
import {NavUser} from "@/components/layout/nav-user"
import {QuickMenu} from "@/components/layout/quick-menu"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import {navCommercial, modules, navFinance, navProduct, navStock} from "@/data/nav-bar-data"
import {NavProduct} from "./nav-product"
import {NavStock} from "./nav-stock"
import {User} from "better-auth";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar>{
    user: User
}

export function AppSidebar({user, ...props}: AppSidebarProps) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <QuickMenu modules={modules}/>
            </SidebarHeader>
            <SidebarContent>
                <NavCommercial items={navCommercial}/>
                <NavFinance items={navFinance}/>
                <NavProduct items={navProduct}/>
                <NavStock items={navStock}/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user}/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
