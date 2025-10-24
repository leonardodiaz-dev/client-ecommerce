import { useEffect, useState } from "react"
import { FiltersPanel } from "../components/search/FiltersPanel"
import ListArticulos from "../components/search/ListArticulos"
import { useSearchParams } from "react-router-dom"
import { getAllArticulos } from "../services/articulos"
import type { Articulo } from "../interfaces/articulo"
import OverlayLoader from "../components/common/OverlayLoader"

type Filters = {
    categoriaNombre: string
    marca: string
    precioMin: string
    precioMax: string
    generoId: string
}

const Search = () => {
    const [searchParams] = useSearchParams();
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const categoria = searchParams.get("categoria");
    const marca = searchParams.get("marca")

    useEffect(() => {

        const fetchArticulos = async () => {
            try {
                setLoading(true);
                const filters: Pick<Filters, "categoriaNombre" | 'marca'> = {
                    categoriaNombre: "",
                };
                if (categoria) filters.categoriaNombre = categoria;
                if(marca) filters.marca = marca
                const res = await getAllArticulos(filters);
                setArticulos(res.results);
            } catch (err) {
                console.log(err);
                setError("Error al cargar los artículos");
            } finally {
                setLoading(false);
            }
        };

        fetchArticulos();
    }, [categoria,marca]);

    const handleFiltro = async () => {
        try {
            setLoading(true);
            const filters: Filters = {
                categoriaNombre: searchParams.get("categoria") || "",
                marca: searchParams.get("marca") || "",
                precioMin: searchParams.get("precioMin") || "",
                precioMax: searchParams.get("precioMax") || "",
                generoId: searchParams.get("generoId") || "",
            };
            const res = await getAllArticulos(filters);
            setArticulos(res.results);
        } catch (err) {
            console.log(err);
            setError("Error al aplicar los filtros");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <OverlayLoader />;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-col md:flex-row p-4 gap-6">
            { (marca || categoria) && (
                <FiltersPanel handleFiltro={handleFiltro} marca={marca} categoria={categoria} />
            )}
           
            <div className="flex-1">
                <ListArticulos articulos={articulos} />
            </div>
        </div>
    );
};

export default Search;
