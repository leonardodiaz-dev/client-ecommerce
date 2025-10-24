import type { TableColumn } from "react-data-table-component";
import type { Proveedor } from "../../interfaces/proveedor";
import DataTable from "react-data-table-component";
import { useFetchData } from "../../hooks/useFetchData";
import { getAllProveedores } from "../../services/proveedores";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import Modal from "../common/Modal";
import ProveedorForm from "./ProveedorForm";

const ProveedoresTable = () => {

    const { data: proveedores, loading, error } = useFetchData<Proveedor>(getAllProveedores)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [proveedor, setProveedor] = useState<Proveedor | null>(null)

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    const columns: TableColumn<Proveedor>[] = [
        {
            name: 'ID',
            selector: row => row.idProveedor,
            sortable: true,
        },
        {
            name: 'NOMBRE',
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: 'RUC',
            selector: row => row.ruc,
            sortable: true,
        },
        {
            name: 'DIRECCION',
            selector: row => row.direccion,
            sortable: true,
        },
        {
            name: 'TELEFONO',
            selector: row => row.telefono,
            sortable: true,
        },
        {
            name: 'EDITAR',
            cell: row => (
                <button onClick={() => {
                    openModal()
                   setProveedor(row)
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
                    data={proveedores}
                    pagination
                    className="min-w-full"
                />
            </div>
            <Modal isOpen={isModalOpen} handleClose={closeModal} title="Editar Articulo" >
                {isModalOpen && (
                    <ProveedorForm proveedor={proveedor} closeModal={closeModal} />
                )}
            </Modal>
        </>
    )
}

export default ProveedoresTable