import DataTable, { type TableColumn } from "react-data-table-component";
import type { Articulo } from "../../interfaces/articulo";
import { SquarePen } from "lucide-react";
import Modal from "../common/Modal";
import ArticuloForm from "./ArticuloForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { changeEstadoArticulo, fetchArticulos } from "../../store/articuloSlice";
import OverlayLoader from "../common/OverlayLoader";

const ArticulosTable = () => {

    const [searchTerm, setSearchTerm] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>()
    const { articulos, status, error } = useSelector((state: RootState) => state.articulos)
    const [articuloId, setArticuloId] = useState<number | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {

        dispatch(fetchArticulos())

    }, [dispatch])
 
    if (status === 'loading') return <OverlayLoader />;
    if (error) return <p>{error}</p>;

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleToggleEstado = async (id: number, estadoActual: boolean) => {
        try {
            console.log(id)
            console.log(estadoActual)
            await dispatch(changeEstadoArticulo({ id, estado: !estadoActual })).unwrap()
        } catch (error) {
            console.log(error)
        }
    }

    const filteredData = articulos.filter(
        (item) =>
            item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.codigo.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.gender && item.gender.nombre.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.brand?.nombre && item.brand.nombre.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    const columns: TableColumn<Articulo>[] = [
        {
            name: 'ID',
            selector: row => row.id,
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
            selector: row => row.brand?.nombre ?? "" ,
            sortable: true,
        },
        {
            name: 'CATEGORIA',
            selector: row => row.subsubcategory.nombre,
            sortable: true,
        },
        {
            name: 'GENERO',
            selector: row => row.gender?.nombre ?? 'No tiene',
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
                    setArticuloId(row.id)
                }} data-testid={`edit-${row.id}`}>
                    <SquarePen className="cursor-pointer h-6 w-6 ml-3" />
                </button>
            ),
            ignoreRowClick: true,
        },
        {
            name: "CAMBIAR ESTADO",
            cell: (row) => (
                <div className="ml-9">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={row.estado === true}
                            onChange={() => handleToggleEstado(row.id, row.estado)}
                            className="toggle-checkbox hidden"
                        />
                        <span
                            className={`toggle-label w-10 h-5 flex items-center rounded-full p-1 cursor-pointer ${row.estado === true ? "bg-green-500" : "bg-gray-400"
                                }`}
                        >
                            <span
                                className={`toggle-dot w-4 h-4 bg-white rounded-full shadow-md transform transition ${row.estado === false ? "translate-x-5" : "translate-x-0"
                                    }`}
                            ></span>
                        </span>
                    </label>
                </div>
            ),
        },
    ];
    return (
        <>
            <div className="max-w-full border border-gray-300 rounded-lg shadow-lg bg-white">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                    <h2 className="text-sm font-semibold text-gray-700">Lista de artículos</h2>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>
                </div>

                <div className="p-3">
                    <DataTable
                        columns={columns}
                        data={filteredData}
                        pagination
                        className="min-w-full text-sm"
                    />
                </div>
            </div>

            <Modal isOpen={isModalOpen} width="max-w-2xl" handleClose={closeModal} title="Editar Articulo" >
                <ArticuloForm articuloId={articuloId} closeModal={closeModal} />
            </Modal>
        </>
    )
}

export default ArticulosTable