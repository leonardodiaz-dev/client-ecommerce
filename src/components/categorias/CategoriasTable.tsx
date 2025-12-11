import DataTable, { type TableColumn } from "react-data-table-component";
import Modal from "../common/Modal";
import CategoriaForm from "./CategoriaForm";
import { SquarePen } from "lucide-react";
import OverlayLoader from "../common/OverlayLoader";
import { useEffect, useState } from "react";
import type { Categoria } from "../../interfaces/categoria";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { changeEstadoCategoria, fetchCategorias } from "../../store/categoriaSlice";

const CategoriasTable = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { categorias, status, error } = useSelector((state: RootState) => state.categorias)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [categoria, setCategoria] = useState<Categoria | null>(null)

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {

        dispatch(fetchCategorias())

    }, [dispatch])

    const handleToggleEstado = async (id: number, estadoActual: boolean) => {
        try {
            await dispatch(changeEstadoCategoria({ id, estado: !estadoActual })).unwrap()
        } catch (error) {
            console.log(error)
        }
    }

    if (status === "loading") return <OverlayLoader />
    if (status === "failed")
        return (
            <div className="text-red-500 text-center mt-4">
                <p>Error al cargar categorías:</p>
                <p className="font-semibold">{error}</p>
                <button
                    onClick={() => dispatch(fetchCategorias())}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Reintentar
                </button>
            </div>
        );

    const columns: TableColumn<Categoria>[] = [
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
            name: 'ESTADO',
            selector: row => row.estado ? 'Activo' : 'Inactivo',
            sortable: true,
        },
        {
            name: 'EDITAR',
            cell: row => (
                <button onClick={() => {
                    openModal()
                    setCategoria(row)
                }}>
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
            <div className="max-w-full border border-gray-300 rounded-lg shadow-lg">
                <DataTable
                    title="Lista de categorias"
                    columns={columns}
                    data={categorias}
                    pagination
                    className="min-w-full"
                />
            </div>
            <Modal isOpen={isModalOpen} handleClose={closeModal} title="Editar Usuario" >
                {isModalOpen && (
                    <CategoriaForm categoria={categoria} closeModal={closeModal} />
                )}
            </Modal>
        </>
    )
}

export default CategoriasTable