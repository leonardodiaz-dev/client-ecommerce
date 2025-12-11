import type { TableColumn } from "react-data-table-component";
import type { Proveedor } from "../../interfaces/proveedor";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { SquarePen } from "lucide-react";
import Modal from "../common/Modal";
import ProveedorForm from "./ProveedorForm";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import OverlayLoader from "../common/OverlayLoader";
import { changeEstadoProveedor, fetchProveedores } from "../../store/proveedorSlice";

const ProveedoresTable = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { proveedores, status, error } = useSelector((state: RootState) => state.proveedores)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [proveedor, setProveedor] = useState<Proveedor | null>(null)

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {

        dispatch(fetchProveedores())

    }, [dispatch])

    if (status === "loading") return <OverlayLoader />
    if (error) return <p>{error}</p>;

    const handleToggleEstado = async (id: number, estadoActual: boolean) => {
        try {
            await dispatch(changeEstadoProveedor({ id, estado: !estadoActual })).unwrap()
        } catch (error) {
            console.log(error)
        }
    }

    const columns: TableColumn<Proveedor>[] = [
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
            name: 'ESTADO',
            selector: row => row.estado ? 'Activo' : 'Inactivo',
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