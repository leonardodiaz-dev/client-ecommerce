import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <XCircle className="text-red-600 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold text-red-700 mb-2">
        Pago cancelado
      </h1>
      <p className="text-gray-700 mb-6 text-center max-w-md">
        Tu pago no se completó. Si deseas intentarlo nuevamente, puedes volver a tu carrito y proceder al pago otra vez.
      </p>
      <button
        onClick={() => navigate("/cart")}
        className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Volver al carrito
      </button>
    </div>
  );
};

export default Cancel;
