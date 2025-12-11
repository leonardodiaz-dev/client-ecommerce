import { useState } from "react";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import SubcategoriasForm from "../components/subcategorias/SubcategoriasForm";
import SubcategoriasTable from "../components/subcategorias/SubcategoriasTable";

const Subcategorias = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <h2 className="text-center text-2xl font-semibold mb-5">Subcategorias</h2>
            <div className="flex justify-end mb-5">
                <Button
                    className='bg-[#B8860B] text-white'
                    onClick={openModal}>
                    Nuevo Registro
                </Button>
            </div>
            <SubcategoriasTable />
            <Modal isOpen={isModalOpen} handleClose={closeModal} width="max-w-lg" title="Registrar Subcategoria" >
                {isModalOpen && (
                    <SubcategoriasForm closeModal={closeModal} />
                )}
            </Modal>
        </div>
    )
}

export default Subcategorias