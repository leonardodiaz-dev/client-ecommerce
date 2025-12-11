import type { TableColumn } from "react-data-table-component";
import type { SubCategoria } from "../../interfaces/categoria";
import DataTable from "react-data-table-component";
import Modal from "../common/Modal";
import { useEffect, useState } from "react";
import SubcategoriasForm from "./SubcategoriasForm";
import { SquarePen } from "lucide-react";
import OverlayLoader from "../common/OverlayLoader";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { changeEstadoSubcategoria, fetchSubcategorias } from "../../store/subcategoriaSlice";

const SubcategoriasTable = () => {

    const dispatch = useDispatch<AppDispatch>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [subcategoriaId, setSubcategoriaId] = useState<number>(0)
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const { subcategorias, status, error } = useSelector((state: RootState) => state.subcategorias)

    useEffect(() => {

        dispatch(fetchSubcategorias())

    }, [dispatch])

    const handleToggleEstado = async (id: number, estadoActual: boolean) => {
        try {
            await dispatch(changeEstadoSubcategoria({ id, estado: !estadoActual })).unwrap()
        } catch (error) {
             console.log(error)
        }
    }

    if (status === 'loading') return <OverlayLoader />
    if (error) return <p>{error}</p>;

    const columns: TableColumn<SubCategoria>[] = [
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
            name: 'CATEGORIA',
            selector: row => row.category.nombre,
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
                    setSubcategoriaId(row.id)
                    openModal()
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
                    title="Lista de subcategorias"
                    columns={columns}
                    data={subcategorias}
                    pagination
                    className="min-w-full"
                />
            </div>
            <Modal isOpen={isModalOpen} handleClose={closeModal} title="Editar Subcategoria" >
                {isModalOpen && (
                    <SubcategoriasForm subcategoriaId={subcategoriaId} closeModal={closeModal} />
                )}
            </Modal>
        </>
    )
}

export default SubcategoriasTable