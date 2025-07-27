import {ReactNode} from "react";
import {LandingLayout} from "@/shared/layout";

export default function Layout({
                                       children
                                   }: Readonly<{
    children: ReactNode
}>) {
    return <LandingLayout>{children}</LandingLayout>
}
