import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCarrito } from "../store/carritoSlice";

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearCarrito());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <CheckCircle className="text-green-600 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">
        ¡Pago completado con éxito!
      </h1>
      <p className="text-gray-700 mb-6 text-center max-w-md">
        Gracias por tu compra. Tu pago ha sido procesado correctamente y tu pedido está en preparación.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-5 py-2 bg-green-600 text-white cursor-pointer rounded-lg hover:bg-green-700 transition"
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default Success;
