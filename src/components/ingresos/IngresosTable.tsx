import type { TableColumn } from "react-data-table-component";
import type { Detalles } from "../../interfaces/ingreso";
import DataTable from "react-data-table-component";
import { useFetchData } from "../../hooks/useFetchData";
import { getAllIngresos } from "../../services/ingresos";

const IngresosTable = () => {

  const { data: ingresos, loading, error } = useFetchData<Detalles>(getAllIngresos)

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  const columns: TableColumn<Detalles>[] = [
    {
      name: 'ID',
      selector: row => row.idDetalle,
      sortable: true,
    },
    {
      name: 'CANTIDAD',
      selector: row => row.cantidad,
      sortable: true,
    },
    {
      name: 'COLOR',
      selector: (row) => row.variante.color?.nombre ?? 'No tiene',

      sortable: true,
    },
    {
      name: 'TALLA',
      selector: (row) => row.variante.talla?.nombre ?? 'No tiene',
      sortable: true,
    },
    {
      name: 'ARTICULO',
      selector: row => row.variante.articulo.nombre
    }
    // {
    //   name: 'EDITAR',
    //   cell: row => (
    //     <button onClick={() => {
    //       openModal()
    //       setProveedor(row)
    //     }}>
    //       <SquarePen className="cursor-pointer h-6 w-6 ml-3" />
    //     </button>
    //   ),
    //   ignoreRowClick: true,
    // },
  ];

  return (
    <>
      <div className="max-w-full border border-gray-300 rounded-lg shadow-lg">
        <DataTable
          title="Lista de Ingresos"
          columns={columns}
          data={ingresos}
          pagination
          className="min-w-full"
        />
      </div>
      {/* <Modal isOpen={isModalOpen} handleClose={closeModal} title="Editar Articulo" >
                {isModalOpen && (
                    <ProveedorForm proveedor={proveedor} closeModal={closeModal} />
                )}
      </Modal> */}
    </>
  )
}

export default IngresosTable