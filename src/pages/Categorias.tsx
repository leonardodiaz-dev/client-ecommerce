import { useState } from "react";
import Button from "../components/common/Button"
import Modal from "../components/common/Modal"
import CategoriaForm from "../components/categorias/CategoriaForm";
import CategoriasTable from "../components/categorias/CategoriasTable";

const Categorias = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <h2 className="text-center text-2xl font-semibold mb-5">Categorias</h2>
            <div className="flex justify-end mb-5">
                <Button
                    className='bg-[#B8860B] text-white'
                    onClick={openModal}>
                    Nuevo Registro
                </Button>
            </div>
            <CategoriasTable />
            <Modal isOpen={isModalOpen} handleClose={closeModal} width="max-w-lg" title="Registrar Categoria" >
                {isModalOpen && (
                    <CategoriaForm closeModal={closeModal} />
                )}
            </Modal>
        </div>
    )
}

export default Categorias