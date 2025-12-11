import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { useAuth } from "../context/useAuth";

const SelectRol = () => {

    const { user } = useAuth()
    const navigate = useNavigate()

    return (
        <div className="flex flex-col h-screen justify-center items-center gap-4 p-6 bg-gray-300 rounded-lg text-white">
            <div className="space-y-4">
                <h2 className="text-lg text-gray-700 font-semibold">Selecciona con qué rol deseas ingresar</h2>

                <div className="flex gap-4">
                    {user?.roles.some(r => r.nombre === "Administrador") && (
                        <Button
                            className="bg-[#B8860B] text-white px-6 py-2 rounded-lg hover:opacity-90"
                            onClick={() => navigate("/panel/usuarios")}
                        >
                            Panel Administrador
                        </Button>
                    )}

                    {user?.roles.some(r => r.nombre === 'Cliente') && (
                        <Button
                            className="bg-black border border-white text-white px-6 py-2 rounded-lg hover:bg-[#222]"
                            onClick={() => navigate("/myaccount/myProfile")}
                        >
                            Panel Cliente
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SelectRol;
