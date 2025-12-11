import { useEffect, useState } from "react"
import OverlayLoader from "../components/common/OverlayLoader"
import DireccionCard from "../components/direcciones/DireccionCard"
import Button from "../components/common/Button"
import Modal from "../components/common/Modal"
import DireccionForm from "../components/direcciones/DireccionForm"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { fetchDirecciones } from "../store/direccionSlice"

const Direcciones = () => {

  const dispatch = useDispatch<AppDispatch>()
  const { direcciones, status, error } = useSelector((state: RootState) => state.direciones)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    dispatch(fetchDirecciones())
  }, [dispatch])

  if (status === 'loading') return <OverlayLoader />
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

  return (
    <div className="min-h-screen w-full space-y-5 p-5">
      <h2 className="text-xl font-semibold">Direcciones</h2>
      <div className="flex flex-col w-full gap-4">
        {direcciones.map(d => (
          <DireccionCard key={d.id} direccion={d} />
        ))}
      </div>
      <Button className="bg-[#B8860B] text-white"
        onClick={openModal}>
        Agregar Direccion
      </Button>
      <Modal isOpen={isModalOpen} handleClose={closeModal} width="max-w-lg" title="Registrar Dirección" >
        {isModalOpen && (
          <DireccionForm closeModal={closeModal} />
        )}
      </Modal>
    </div>
  )
}

export default Direcciones