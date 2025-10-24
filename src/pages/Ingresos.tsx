import { useState } from "react";
import Button from "../components/common/Button"
import IngresosTable from "../components/ingresos/IngresosTable"
import Modal from "../components/common/Modal";
import IngresoForm from "../components/ingresos/IngresoForm";

const Ingresos = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <div>
            <h2 className="text-center text-2xl font-semibold mb-5">Ingresos</h2>
            <div className="flex justify-end mb-5">
                <Button
                    className='bg-[#B8860B] text-white'
                    onClick={openModal}>
                    Nuevo Registro
                </Button>
            </div>
            <IngresosTable />
            <Modal isOpen={isModalOpen} handleClose={closeModal} title="Registrar Ingreso" >
                <IngresoForm closeModal={closeModal} />
            </Modal>
        </div>
    )
}

export default Ingresos