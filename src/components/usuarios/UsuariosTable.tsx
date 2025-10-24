import { useState } from "react";
import type { TableColumn } from "react-data-table-component";
import type { Usuario } from "../../interfaces/usuario";
import DataTable from "react-data-table-component";
import Modal from "../common/Modal";
import UsuarioForm from "./UsuarioForm";
import { SquarePen } from "lucide-react";
import { useFetchData } from "../../hooks/useFetchData";
import { getAllUsuarios } from "../../services/usuarios";
import OverlayLoader from "../common/OverlayLoader";

const UsuariosTable = () => {

    const { data: usuarios, loading, error } = useFetchData(getAllUsuarios)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [usuario, setUsuario] = useState<Usuario | null>(null)

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (loading) return <OverlayLoader />
    if (error) return <p>{error}</p>;

    const columns: TableColumn<Usuario>[] = [
        {
            name: 'ID',
            selector: row => row.idUsuario,
            sortable: true,
        },
        {
            name: 'NOMBRE',
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: 'Apellidos',
            selector: row => row.apellido,
            sortable: true,
        },
        {
            name: 'DNI',
            selector: row => row.dni,
            sortable: true,
        },
        {
            name: 'EMAIL',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'TELEFONO',
            selector: row => row.telefono,
            sortable: true,
        },
        {
            name: 'ROL',
            selector: row => row.rol.nombre,
            sortable: true,
        },
        {
            name: 'EDITAR',
            cell: row => (
                <button onClick={() => {
                    openModal()
                    setUsuario(row)
                }}>
                    <SquarePen className="cursor-pointer h-6 w-6 ml-3" />
                </button>
            ),
            ignoreRowClick: true,
        },
    ];
    return (
        <>
            <div className="max-w-full border border-gray-300 rounded-lg shadow-lg">
                <DataTable
                    title="Lista de proveedores"
                    columns={columns}
                    data={usuarios}
                    pagination
                    className="min-w-full"
                />
            </div>
            <Modal isOpen={isModalOpen} handleClose={closeModal} title="Editar Usuario" >
                {isModalOpen && (
                    <UsuarioForm usuario={usuario} closeModal={closeModal} />
                )}
            </Modal>
        </>
    )
}

export default UsuariosTable