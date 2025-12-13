import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { totalPrecio, totalProductos } from "../store/carritoSlice";
import type { AppDispatch, RootState } from "../store/store";
import { fetchDirecciones } from "../store/direccionSlice";
import OverlayLoader from "../components/common/OverlayLoader";
import Modal from "../components/common/Modal";
import CambiarDireccionForm from "../components/checkout/CambiarDireccionForm";
import type { Direccion } from "../interfaces/direccion";
import { createSession } from "../services/stripe";
import type { ApiError } from "../interfaces/apiError";
import DireccionForm from "../components/direcciones/DireccionForm";
import { useToast } from "../context/useToast";

type Modales = 'create-direccion' | 'cambiar-direccion'

const Checkout = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { direcciones, status, error } = useSelector(
    (state: RootState) => state.direciones
  );
  const { showToast } = useToast()
  const [isPaying, setIsPaying] = useState<boolean>(false)
  const [selectedDireccion, setSelectedDireccion] = useState<number>(0)
  const [direccion, setDireccion] = useState<Direccion | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<Modales | null>(null);

  const openModal = (nombreModal: Modales) => setIsModalOpen(nombreModal);
  const closeModal = () => setIsModalOpen(null)
  const carrito = useSelector((state: RootState) => state.carrito.carrito);
  const total = useSelector(totalProductos);
  const subtotal = useSelector(totalPrecio)

  useEffect(() => {
    dispatch(fetchDirecciones());
  }, [dispatch]);

  useEffect(() => {
    if (direcciones.length > 0) {
      const direccionItem = direcciones.find(d => d.isPrincipal) || direcciones[0]
      const direccionItemStore = localStorage.getItem("direccionItem")
      setDireccion(() => direccionItemStore ? JSON.parse(direccionItemStore) : direccionItem)
      const direccionStore = localStorage.getItem("direccion")
      setSelectedDireccion(() => direccionStore ? parseInt(direccionStore) : direccionItem.id)
    }
  }, [direcciones])

  if (status === "loading") return <OverlayLoader />;
  if (status === "failed")
    return (
      <div className="text-red-500 text-center mt-4">
        <p>Error al cargar las direcciones:</p>
        <p className="font-semibold">{error}</p>
        <button
          onClick={() => dispatch(fetchDirecciones())}
          className="mt-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded"
        >
          Reintentar
        </button>
      </div>
    );

  const despacho = subtotal > 300 ? 0 : subtotal * 0.10;
  const totalPagar = subtotal + despacho

  const handleDireccionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDireccion(parseInt(event.target.value));
    localStorage.setItem("direccion", event.target.value)
  };

  const handlePagar = async () => {
    if (!selectedDireccion) {
      showToast("No se ha agregado una direccion.", {
        type: 'info'
      })
      return;
    }
    try {
      setIsPaying(true)
      const session = await createSession({
        address_id: selectedDireccion,
        items: carrito.map(c => ({
          variant_id: c.idVariante,
          name: c.nombre,
          precio: c.precio,
          cantidad: c.cantidad
        }))
      })
      //console.log(session)
      setIsPaying(false)
      window.location.href = session.url;
    } catch (error) {
      const apiError = error as ApiError
      console.log(apiError.message)
    }
  }

  return (
    <div className="flex flex-row justify-start items-start min-h-screen bg-gray-100 gap-5 p-3">
      <div className="flex flex-row items-start justify-between w-3/5 bg-white p-3 rounded-lg min-h-auto shadow-xl">
        {direcciones.length > 0 ? (
          <>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">Entrega</h2>
              <p className="text-md">{direccion?.nombre}</p>
              <p className="text-md">
                {direccion?.district}, {direccion?.department}
              </p>
            </div>
            <p className="underline cursor-pointer"
              onClick={() => openModal('cambiar-direccion')}>Cambiar</p>
          </>
        ) : (
          <div>
            <p className="cursor-pointer" onClick={() => openModal('create-direccion')}>Agregar Direccion</p>
          </div>
        )}

      </div>

      <div className="bg-white w-2/5 rounded-lg shadow-xl p-4 flex flex-col">
        <h2 className="text-lg font-semibold flex justify-between items-center">
          <span>Mis productos ({total})</span>
          <span className="text-sm text-gray-500">Precio unidad</span>
        </h2>

        <div className="flex flex-col gap-3 overflow-y-auto max-h-64 mt-2 pr-2">
          {carrito.map((item) => (
            <div
              key={item.idVariante}
              className="flex justify-between items-center pb-2"
            >
              <div className="flex items-center gap-3">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}storage/${item.imagen}`}
                  alt={item.nombre}
                  className="w-16 h-16 object-cover rounded-md border"
                />
                <div className="flex flex-col">
                  <h3 className="font-medium text-sm truncate max-w-[150px]">
                    {item.nombre}
                  </h3>
                  {item.color && (
                    <span className="text-xs text-gray-500">
                      Color: {item.color}
                    </span>
                  )}
                  {item.talla && (
                    <span className="text-xs text-gray-500">
                      Talla: {item.talla}
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    Cantidad: {item.cantidad}
                  </span>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-800">
                S/ {item.precio.toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t pt-3 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>S/ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Despacho</span>
            <span>{despacho === 0 ? 'Gratis' : `S/${despacho.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mt-2">
            <span>Total a pagar</span>
            <span className="text-[#B8860B]">S/ {totalPagar.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-4">
          <button
            className="w-full bg-[#B8860B] text-white py-2 mt-3 rounded-md cursor-pointer transition disabled:opacity-50"
            disabled={carrito.length === 0 || isPaying}
            onClick={handlePagar}
          >
            {isPaying ? '...Cargando' : 'Pagar'}
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen === 'cambiar-direccion'} handleClose={closeModal} width="max-w-lg" title="Seleccina una direccion" >

        <CambiarDireccionForm
          direcciones={direcciones}
          setDireccion={setDireccion}
          selectedDireccion={selectedDireccion}
          onDireccionChange={handleDireccionChange}
        />

      </Modal>
      <Modal isOpen={isModalOpen === 'create-direccion'} handleClose={closeModal} width="max-w-lg" title="Registrar Dirección" >

        <DireccionForm closeModal={closeModal} />

      </Modal>
    </div>
  );
};

export default Checkout;
