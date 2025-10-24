import { useState } from "react";
import Button from "../components/common/Button"
import Modal from "../components/common/Modal";
import ProveedorForm from "../components/proveedores/ProveedorForm";
import ProveedoresTable from "../components/proveedores/ProveedoresTable";

const Proveedores = () => {
  
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
  return (
    <div>
      <h2 className="text-center text-2xl font-semibold mb-5">Proveedores</h2>
      <div className="flex justify-end mb-5">
        <Button
          className='bg-[#B8860B] text-white'
          onClick={openModal}>
          Nuevo Registro
        </Button>
      </div>
      <ProveedoresTable />
      <Modal isOpen={isModalOpen} handleClose={closeModal} title="Registrar Proveedor" >
        <ProveedorForm closeModal={closeModal} />
      </Modal>
    </div>
  )
}

export default Proveedores