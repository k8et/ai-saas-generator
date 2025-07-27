import {ReactNode} from "react";
import {LandingFooter, LandingHeader} from "@/shared/layout/LandingLayout/components";

export const LandingLayout = ({children}: {children: ReactNode}) => {
    return (
        <div className={"flex flex-col min-h-screen w-screen"}>
            <LandingHeader/>
            <main className="flex-grow">{children}</main>
            <LandingFooter/>
        </div>
    );
};

