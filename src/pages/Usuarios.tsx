import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import { useState } from 'react';
import UsuarioForm from '../components/usuarios/UsuarioForm';
import UsuariosTable from '../components/usuarios/UsuariosTable';

const Usuarios = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <h2 className="text-center text-2xl font-semibold mb-5">Usuarios</h2>
            <div className="flex justify-end mb-5">
                <Button
                    className='bg-[#B8860B] text-white'
                    onClick={openModal}>
                    Nuevo Registro
                </Button>
            </div>
            <UsuariosTable />
            <Modal isOpen={isModalOpen} handleClose={closeModal} width="max-w-2xl" title="Registrar Usuario" >
                {isModalOpen && (
                    <UsuarioForm closeModal={closeModal} />
                )}
            </Modal>
        </div>
    )
}

export default Usuarios