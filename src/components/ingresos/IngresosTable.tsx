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
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'CANTIDAD',
      selector: row => row.cantidad,
      sortable: true,
    },
    {
      name: 'COLOR',
      selector: (row) => row.variant.color?.nombre ?? 'No tiene',

      sortable: true,
    },
    {
      name: 'TALLA',
      selector: (row) => row.variant.size?.nombre ?? 'No tiene',
      sortable: true,
    },
    {
      name: 'ARTICULO',
      selector: row => row.variant.article.nombre
    }
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
    </>
  )
}

export default IngresosTable