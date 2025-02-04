import { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";

interface LayoutProps {
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-row h-screen v-screen">
            <div className="sm:basis-[15vw] sm:basis-[15vw] xl:basis-[10vw]">
                <Sidebar />
            </div>

            <div className="sm:basis-[85vw] md:basis-[85vw] xl:basis-[90vw]">
                <Navbar />

                <div className="m-2">
                    { children }
                </div>
            </div>
        </div>
    );
}

export default Layout;