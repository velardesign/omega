"use client";

import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  const getBreadcrumbLabel = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    return segments.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  };

  const currentLabels = getBreadcrumbLabel(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Omega</BreadcrumbLink>
        </BreadcrumbItem>
        {currentLabels.map((currentLabel,index) => {
          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{currentLabel}</BreadcrumbPage>
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
