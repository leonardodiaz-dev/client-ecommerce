import type { TableColumn } from "react-data-table-component";
import type { Usuario } from "../../interfaces/usuario";
import DataTable from "react-data-table-component";
import OverlayLoader from "../common/OverlayLoader";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchUsuarios } from "../../store/usuarioSlice";

const UsuariosTable = () => {

    const distpach = useDispatch<AppDispatch>()
    const { usuarios, status, error } = useSelector((state: RootState) => state.usuarios)

    useEffect(() => {
        distpach(fetchUsuarios())
    }, [distpach])

    if (status === 'loading') return <OverlayLoader />
    if (error) return <p>{error}</p>;

    const columns: TableColumn<Usuario>[] = [
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
            selector: row => row.roles.map(r => r.nombre).join(', '),
            sortable: true,
        },
    ];
    return (
        <>
            <div className="max-w-full border border-gray-300 rounded-lg shadow-lg">
                <DataTable
                    title="Lista de usuarios"
                    columns={columns}
                    data={usuarios}
                    pagination
                    className="min-w-full"
                />
            </div>
        </>
    )
}

export default UsuariosTable