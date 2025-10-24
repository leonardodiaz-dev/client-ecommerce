import DataTable, { type TableColumn } from "react-data-table-component";
import type { Articulo } from "../../interfaces/articulo";
import { useFetchData } from "../../hooks/useFetchData";
import { listarArticulos } from "../../services/articulos";
import { SquarePen } from "lucide-react";
import Modal from "../common/Modal";
import ArticuloForm from "./ArticuloForm";
import { useState } from "react";

const ArticulosTable = () => {

    const { data: articulos, loading, error } = useFetchData<Articulo>(listarArticulos)
    const [articuloId, setArticuloId] = useState<number | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const columns: TableColumn<Articulo>[] = [
        {
            name: 'ID',
            selector: row => row.idArticulo,
            sortable: true,
        },
        {
            name: 'NOMBRE',
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: 'CODIGO',
            selector: row => row.codigo,
            sortable: true,
        },
        {
            name: 'PRECIO',
            selector: row => row.precioVenta,
            sortable: true,
        },
        {
            name: 'MARCA',
            selector: row => row.marca?.nombre ?? "",
            sortable: true,
        },
        {
            name: 'CATEGORIA',
            selector: row => row.categoria,
            sortable: true,
        },
        {
            name: 'GENERO',
            selector: row => row.genero?.nombre ?? 'No tiene',
            sortable: true,
        },
        {
            name: 'ESTADO',
            selector: row => row.estado ? 'Activo' : 'Inactivo',
            sortable: true,
        },
        {
            name: 'EDITAR',
            cell: row => (
                <button onClick={() => {
                    openModal()
                    setArticuloId(row.idArticulo)
                }} data-testid={`edit-${row.idArticulo}`}>
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
                    title="Lista de articulos"
                    columns={columns}
                    data={articulos}
                    pagination
                    className="min-w-full"
                />
            </div>
            <Modal isOpen={isModalOpen} width="max-w-2xl" handleClose={closeModal} title="Editar Articulo" >
                <ArticuloForm articuloId={articuloId} closeModal={closeModal} />
            </Modal>
        </>
    )
}

export default ArticulosTable