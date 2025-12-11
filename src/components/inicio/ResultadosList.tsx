import type { Resultados } from "../../interfaces/articulo";

type Props = {
  showDropdown: boolean;
  loading: boolean;
  results?: Resultados | null;
};

const ResultadosList = ({results,showDropdown,loading}: Props) => {
  return (
    <>
      {showDropdown && (
        <div className="absolute top-12 left-0 w-full bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {loading ? (
            <p className="p-3 text-sm text-gray-500">Buscando...</p>
          ) : results ? (
            <>
              {results.articulos.length > 0 && (
                <div className="border-b border-gray-200">
                  <h4 className="text-gray-700 font-semibold px-3 py-2">
                    Productos
                  </h4>
                  {results.articulos.map((a) => (
                    <a
                      key={a.id}
                      href={`/product/${a.slug}`}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {a.imagen && (
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}${a.imagen}`}
                          alt={a.nombre}
                          className="w-10 h-10 object-contain rounded"
                        />
                      )}
                      <div>
                        <p className="text-sm text-gray-800">{a.nombre}</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {results.marcas.length > 0 && (
                <div className="border-b border-gray-200">
                  <h4 className="text-gray-700 font-semibold px-3 py-2">
                    Marcas
                  </h4>
                  {results.marcas.map((m) => (
                    <a
                      key={m.id}
                      href={`/search?marca=${encodeURIComponent(m.nombre)}`}
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {m.nombre}
                    </a>
                  ))}
                </div>
              )}

              {results.subsubcategorias.length > 0 && (
                <div>
                  <h4 className="text-gray-700 font-semibold px-3 py-2">
                    Categorías
                  </h4>
                  {results.subsubcategorias.map((ss) => (
                    <a
                      key={ss.id}
                      href={`/search?categoria=${encodeURIComponent(ss.nombre)}`}
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {ss.nombre}{" "}
                      <span className="text-xs text-gray-500">
                        ({ss.subcategory.nombre})
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="p-3 text-sm text-gray-500">
              Empieza a escribir para buscar...
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default ResultadosList;
