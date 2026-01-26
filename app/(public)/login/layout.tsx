import "@/app/globals.css"
import React from "react";
import {ThemeProvider} from "@/components/ui/theme-provider";

export default function LoginLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}