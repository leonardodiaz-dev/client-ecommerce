import { useCallback, useEffect, useState } from "react";
import { useFetchData } from "../../hooks/useFetchData";
import { obtenerMarcasBySubsubcategoria } from "../../services/subsubcategorias";
import { getSubsubcategorias } from "../../services/subcategorias";
import FilterCategoria from "./FilterCategoria";
import FiltroMarca from "./FiltroMarca";
import PriceRangeFilter from "./PriceRangeFilter";
import Button from "../common/Button";
import OverlayLoader from "../common/OverlayLoader";
import { getGenerosByCategoria } from "../../services/generos";
import FiltroGenero from "./FiltroGenero";
import type { Marca } from "../../interfaces/marca";
import { getMarcasByArticle, getSubSubcategoriasByMarca } from "../../services/marcas";
import type { SubSubCategoria } from "../../interfaces/categoria";
import { getRangoPrecio } from "../../services/articulos";
import type { ApiError } from "../../interfaces/apiError";
import type { Genero } from "../../interfaces/genero";
import { useSearchParams } from "react-router-dom";

type Props = {
  handleFiltro: () => void;
  categoria?: string | null;
  marca?: string | null;
  query?: string | null;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  marcaTmp: string[];
  setMarcaTmp: (value: string[]) => void;
  generoTmp: string[];
  setGeneroTmp: React.Dispatch<React.SetStateAction<string[]>>
  precioMinTmp: string;
  setPrecioMinTmp: (value: string) => void;
  precioMaxTmp: string;
  setPrecioMaxTmp: (value: string) => void;
};

type FiltersRangePrecio = {
  categoria: string | undefined
  marca: string | undefined
  query: string | undefined
}

type Precio = {
  min: number
  max: number
}

export const FiltersPanel = ({
  handleFiltro,
  categoria,
  marca,
  query,
  setShowFilters,
  marcaTmp,
  setMarcaTmp,
  generoTmp,
  setGeneroTmp,
  precioMinTmp,
  setPrecioMinTmp,
  precioMaxTmp,
  setPrecioMaxTmp

}: Props) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [range, setRange] = useState<Precio | null>(null)

  const fetchMarcas = useCallback(async () => {
    let result: Marca[] = []
    if (categoria) {
      result = await obtenerMarcasBySubsubcategoria(categoria)
    }
    if (query) {
      result = await getMarcasByArticle(query)
    }
    return result
  }, [query, categoria],)

  useEffect(() => {

    const fetchRangePrecio = async () => {
      const filters: FiltersRangePrecio = {
        categoria: undefined,
        marca: undefined,
        query: undefined
      }
      if (categoria) filters.categoria = categoria
      if (marca) {
        filters.marca = marca
      } else {
        filters.marca = query as string
      }

      try {
        const res = await getRangoPrecio(filters)
        setRange({ min: parseInt(res.min), max: parseInt(res.max) })
      } catch (error) {
        const apiError = error as ApiError
        console.log(apiError.message)
      }
    }
    fetchRangePrecio()
  }, [categoria, marca, query])

  const fetchSubsubcategorias = useCallback(async () => {
    let result: SubSubCategoria[] = [];

    if (categoria) {
      result = await getSubsubcategorias(categoria);
    }

    if ((!result || result.length === 0) && marca) {
      result = await getSubSubcategoriasByMarca(marca);
    }

    return result;
  }, [categoria, marca]);

  const fetchGeneros = useCallback(
    () => categoria ? getGenerosByCategoria(categoria) : Promise.resolve([]),
    [categoria],
  )

  const { data: marcas, loading: loadingMarcas } = useFetchData<Marca>(fetchMarcas)
  const { data: subsubcategorias, loading: loadingSubsubcategorias } = useFetchData(fetchSubsubcategorias)
  const { data: generos, loading: loadingGeneros } = useFetchData<Genero>(fetchGeneros)

  const loading = loadingMarcas || loadingSubsubcategorias || loadingGeneros

  if (loading && !marcas.length && !subsubcategorias.length && !generos.length) {
    return <OverlayLoader />
  }

  const handleDeleteFiltro = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    const filtrosAEliminar = categoria
      ? ['marca', 'generoId', 'precioMin', 'precioMax']
      : ['generoId', 'precioMin', 'precioMax'];

    filtrosAEliminar.forEach(f => newSearchParams.delete(f));

    setGeneroTmp([]);
    setMarcaTmp([]);
    setPrecioMinTmp("");
    setPrecioMaxTmp("");

    setSearchParams(newSearchParams);
  };

  return (
    <aside className="w-full md:w-64 bg-white shadow rounded-2xl p-4">
      {
        (categoria || marca) ? (
          <h2 className="text-xl font-bold mb-4">{categoria || marca}</h2>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Busqueda: {query}</h2>
          </>
        )
      }

      {
        (marcaTmp.length > 1 || generoTmp.length > 0 || precioMinTmp || precioMaxTmp) && (
          <div className="p-2 bg-gray-300 rounded-lg cursor-pointer hover:bg-gray-200"
            onClick={handleDeleteFiltro}>
            <p className="text-gray-600">Limpiar filtros</p>
          </div>
        )
      }

      {subsubcategorias.length > 0 && (
        <FilterCategoria
          subsubcategorias={subsubcategorias}
          setShowFilters={setShowFilters}
        />
      )}

      {marcas.length > 0 && (
        <FiltroMarca
          marcas={marcas}
          marcaTmp={marcaTmp}
          setMarcaTmp={setMarcaTmp}
          setShowFilters={setShowFilters}
        />
      )}

      {generos.length > 0 && (
        <FiltroGenero
          generos={generos}
          generoTmp={generoTmp}
          setGeneroTmp={setGeneroTmp}
        />
      )}

      {range?.min !== range?.max && (
        <PriceRangeFilter
          min={range?.min}
          max={range?.max}
          step={10}
          currency="S/"
          initialMin={Number(precioMinTmp) || range?.min}
          initialMax={Number(precioMaxTmp) || range?.max}
          onChangeMin={setPrecioMinTmp}
          onChangeMax={setPrecioMaxTmp}
        />
      )}

      <Button
        className="bg-[#B8860B] text-white w-full my-5"
        onClick={handleFiltro}
      >
        Aplicar filtros
      </Button>
    </aside>
  );
};
