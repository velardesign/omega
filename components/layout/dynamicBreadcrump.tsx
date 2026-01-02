"use client"

import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

export function DynamicBreadcrumb(){

    const pathname = usePathname();

    const getBreadcrumbLabel = (path:string) => {
        const segments = path.split("/").filter(Boolean);
        const lastSegment = segments[segments.length - 1] || "dashboard";
        return lastSegment
        .replace(/-/g, " ")
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    };
    
    const currentLabel = getBreadcrumbLabel(pathname);

    return(
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">
                        Omega
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                    <BreadcrumbPage>{currentLabel}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>

    );
}