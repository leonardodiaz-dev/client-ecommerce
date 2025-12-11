import { useEffect, useState } from "react"
import { FiltersPanel } from "../components/search/FiltersPanel"
import ListArticulos from "../components/search/ListArticulos"
import { useSearchParams } from "react-router-dom"
import { getAllArticulos } from "../services/articulos"
import type { Articulo } from "../interfaces/articulo"
import OverlayLoader from "../components/common/OverlayLoader"
import Button from "../components/common/Button"
import { SlidersHorizontal, X } from "lucide-react"
import Pagination from "../components/layouts/Pagination"

type Filters = {
    categoriaNombre: string
    marca: string
    precioMin: string
    precioMax: string
    generoId: string
    nombre: string
    page: number
}

const Search = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const categoria = searchParams.get("categoria");
    const marca = searchParams.get("marca")
    const page = searchParams.get("page")
    const precioMin = searchParams.get("precioMin");
    const precioMax = searchParams.get("precioMax");
    const generoId = searchParams.get("generoId");
    const query = searchParams.get("q");
    const marcaTmpInicial = marca ? marca.split(",") : [];
    const generoTmpInicial = generoId ? generoId?.split(",") : [];
    const [marcaTmp, setMarcaTmp] = useState<string[]>(marcaTmpInicial);
    const [generoTmp, setGeneroTmp] = useState<string[]>(generoTmpInicial);
    const [precioMinTmp, setPrecioMinTmp] = useState(precioMin || "");
    const [precioMaxTmp, setPrecioMaxTmp] = useState(precioMax || "");

    useEffect(() => {

        const fetchArticulos = async () => {
            try {
                setLoading(true);
                const filters: Filters = {
                    categoriaNombre: categoria || "",
                    marca: marca || "",
                    page: page ? parseInt(page) : 1,
                    precioMin: precioMin || "",
                    precioMax: precioMax || "",
                    generoId: generoId || "",
                    nombre: query || ""
                };
                const res = await getAllArticulos(filters)
                console.log(res)
                setArticulos(res.data);
                setCurrentPage(res.current_page)
                setTotalPages(res.last_page)
            } catch (err) {
                console.log(err);
                setError("Error al cargar los artículos");
            } finally {
                setLoading(false);
            }
        };
        fetchArticulos();
    }, [categoria, marca, page, generoId, precioMin, precioMax, query]);

    const handleFiltro = () => {
        const newParams = new URLSearchParams();

        if (categoria) newParams.set("categoria", categoria)
        if (marcaTmp.length > 0) newParams.set("marca", marcaTmp.join(','));
        if (generoTmp.length > 0) newParams.set("generoId", generoTmp.join(','));
        if (precioMinTmp) newParams.set("precioMin", precioMinTmp);
        if (precioMaxTmp) newParams.set("precioMax", precioMaxTmp);

        newParams.set("page", "1");

        setSearchParams(newParams);
        setShowFilters(false);
    };

    if (loading) return <OverlayLoader />;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-col md:flex-row min-h-screen p-4 gap-6 relative">

            <div className="md:hidden flex justify-end mb-2">

                <Button
                    onClick={() => setShowFilters(true)}
                    className="bg-[#B8860B] text-white"
                >
                    <SlidersHorizontal className="inline-block mr-2" />
                    Filtros
                </Button>
            </div>

            <div
                className={`fixed md:static top-0 right-0 h-full w-4/5 sm:w-2/3 md:w-64 bg-white shadow-lg z-50 sm:z-0
        transform transition-transform duration-300 overflow-y-auto
        ${showFilters ? "translate-x-0" : "translate-x-full"} md:translate-x-0 rounded-none md:rounded-2xl`}
            >
                <div className="flex justify-between items-center p-4 border-b md:hidden">
                    <h2 className="font-bold text-lg">Filtros</h2>
                    <button onClick={() => setShowFilters(false)}>
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {(marca || categoria || query) && (
                    <FiltersPanel
                        marcaTmp={marcaTmp}
                        setMarcaTmp={setMarcaTmp}
                        generoTmp={generoTmp}
                        setGeneroTmp={setGeneroTmp}
                        precioMinTmp={precioMinTmp}
                        setPrecioMinTmp={setPrecioMinTmp}
                        precioMaxTmp={precioMaxTmp}
                        setPrecioMaxTmp={setPrecioMaxTmp}
                        categoria={categoria}
                        marca={marca}
                        query={query}
                        handleFiltro={handleFiltro}
                        setShowFilters={setShowFilters}
                    />

                )}

            </div>

            {showFilters && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setShowFilters(false)}
                />
            )}

            <div className={`flex-1 flex flex-col ${articulos.length > 0 ? 'items-start justify-start' : 'items-center justify-center'} min-h-screen`}>
                {articulos.length > 0 ? (
                    <ListArticulos articulos={articulos} />
                ) : (
                    <div className="flex justify-center items-center w-3/5 bg-white rounded-lg shadow-2xl p-4">
                        <p>No hay productos</p>
                    </div>
                )}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    searchParams={searchParams}
                    basePath={`/search`}
                />
            </div>

        </div>
    );
};

export default Search;
