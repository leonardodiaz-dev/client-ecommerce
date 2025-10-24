import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function PublicLayout(){
    return(
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <NavBar />
            <Outlet />
        </div>
    )
}