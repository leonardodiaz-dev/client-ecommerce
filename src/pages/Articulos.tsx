import { useState } from "react";
import ArticulosTable from "../components/articulos/ArticulosTable"
import Button from "../components/common/Button"
import Modal from "../components/common/Modal";
import ArticuloForm from "../components/articulos/ArticuloForm";

const Articulos = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <h2 className="text-center text-2xl font-semibold mb-5">Articulos</h2>
      <div className="flex justify-end mb-5">
        <Button
          className='bg-[#B8860B] text-white'
          onClick={openModal}>
          Nuevo Registro
        </Button>
      </div>
      <ArticulosTable />
      <Modal isOpen={isModalOpen} handleClose={closeModal} width="max-w-2xl" title="Registrar Articulo" >
        {isModalOpen && (
          <ArticuloForm closeModal={closeModal} />
        )}
      </Modal>
    </div>
  )
}

export default Articulos