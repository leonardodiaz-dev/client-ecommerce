import { ChevronRight, CircleUser, Handbag, MapPinHouse } from "lucide-react";
import NavBar from "./NavBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";


export default function ClienteLayout() {

    const navigate = useNavigate()
    const location = useLocation()

    const links = [
        { to: "/myaccount/myProfile", label: "Mi perfil", icon: <CircleUser size={18} /> },
        { to: "/myaccount/addresses", label: "Direcciones", icon: <MapPinHouse size={18} /> },
        { to: "/myaccount/myPurchases", label: "Mis compras", icon: <Handbag size={18} /> },
    ];

    return (
        <>
            <NavBar />
            <div className="min-h-screen p-5 bg-gray-200">
                <div className="flex flex-col sm:flex-row items-start gap-5">
                    <div className="flex flex-col justify-start items-center w-full sm:w-2/8">
                        {
                            links.map((l, index) => (
                                <div key={index} className={`flex flex-row justify-between items-center ${location.pathname === l.to ? 'bg-gray-100' : 'bg-white'} first:rounded-t-lg last:rounded-b-lg border-b-1 border-gray-300 
                                    last:border-none cursor-pointer h-14 py-2 px-4 w-full`}>
                                    <div className="flex flex-row gap-2"
                                        onClick={() => navigate(`${l.to}`)}>
                                        {l.icon}
                                        <p>{l.label}</p>
                                    </div>
                                    <ChevronRight />
                                </div>
                            ))
                        }
                    </div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}