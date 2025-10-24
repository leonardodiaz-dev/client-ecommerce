import { useCallback } from "react";
import { useFetchData } from "../../hooks/useFetchData";
import { obtenerMarcasBySubsubcategoria } from "../../services/subsubcategorias";
import { getSubsubcategorias } from "../../services/subcategorias";
import FilterCategoria from "./FilterCategoria";
import FiltroMarca from "./FiltroMarca";
import PriceRangeFilter from "./PriceRangeFilter";
import Button from "../common/Button";
import OverlayLoader from "../common/OverlayLoader";
import { getAllGeneros } from "../../services/generos";
import FiltroGenero from "./FiltroGenero";
import type { Marca } from "../../interfaces/marca";
import { getSubSubcategoriasByMarca } from "../../services/marcas";
import type { SubSubCategoria } from "../../interfaces/categoria";

type Props = {
  handleFiltro: () => void
  categoria?: string | null
  marca?: string | null
}

export const FiltersPanel = ({ handleFiltro, categoria, marca }: Props) => {

  console.log("Render FiltersPanel:", { categoria, marca });

  const fetchMarcasByCategoria = useCallback(
    () => categoria ? obtenerMarcasBySubsubcategoria(categoria) : Promise.resolve([]),
    [categoria],
  )

  const fetchFinalSubsubcategorias = useCallback(async () => {
    let result: SubSubCategoria[] = [];

    if (categoria) {
      result = await getSubsubcategorias(categoria);
    }

    if ((!result || result.length === 0) && marca) {
      result = await getSubSubcategoriasByMarca(marca);
    }

    return result;
  }, [categoria, marca]);

  const { data: marcas, loading: loadingMarcas } = useFetchData<Marca>(fetchMarcasByCategoria)
  const { data: subsubcategorias, loading: loadingSubsubcategorias } = useFetchData(fetchFinalSubsubcategorias)
  const { data: generos, loading: loadingGeneros } = useFetchData(getAllGeneros)

  const loading = loadingMarcas || loadingSubsubcategorias || loadingGeneros

  if (loading && !marcas.length && !subsubcategorias.length && !generos.length) {
    return <OverlayLoader />
  }

  return (
    <aside className="w-full md:w-64 bg-white shadow rounded-2xl p-4">
      <h2 className="text-xl font-bold mb-4">{categoria || marca}</h2>

      {subsubcategorias.length > 0 && (
        <FilterCategoria
          subsubcategorias={subsubcategorias}
        />
      )}

      {marcas.length > 0 && (
        <FiltroMarca marcas={marcas} />
      )}

      <FiltroGenero generos={generos} />

      <PriceRangeFilter
        min={0}
        max={500}
        step={10}
        currency="S/"
        initialMin={0}
        initialMax={500}
      />

      <Button className="bg-[#B8860B] text-white w-full my-5" onClick={handleFiltro}>{"Aplicar filtros"}</Button>

    </aside>
  );
};
