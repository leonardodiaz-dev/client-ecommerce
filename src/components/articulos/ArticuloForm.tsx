import { FormProvider, useForm } from "react-hook-form"
import { useFetchData } from "../../hooks/useFetchData"
import { getAllGeneros } from "../../services/generos"
import type { Genero } from "../../interfaces/genero"
import { getAllCategorias } from "../../services/categorias"
import type { Categoria, SubCategoria, SubSubCategoria } from "../../interfaces/categoria"
import { getSubcategoriasByCategoriaId } from "../../services/subcategorias"
import { useCallback, useEffect } from "react"
import { getSubsubcategoriasBySubCategoriaId } from "../../services/subsubcategorias"
import VariantesForm from "./VariantesForm"
import Button from "../common/Button"
import type { Articulo, ArticuloFormData } from "../../interfaces/articulo"
import type { ApiError } from "../../interfaces/apiError"
import { createArticulo, getArticuloById, updateArticulo } from "../../services/articulos"
import type { Marca } from "../../interfaces/marca"
import { getAllMarcas } from "../../services/marcas"
import { useFetchItem } from "../../hooks/useFetchItem"

type Props = {
  articuloId?: number | null
  closeModal: () => void
}

const ArticuloForm = ({ articuloId, closeModal }: Props) => {

  const methods = useForm<ArticuloFormData>({
    defaultValues: {
      nombre: "",
      precioVenta: null,
      imagen: null,
      generoId: null,
      categoriaId: null,
      subcategoriaId: null,
      subSubcategoriaId: null,
      variantes: [],
    },
  });

  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = methods;
  const { data: generos, loading: loadingGeneros, error: errorGeneros } = useFetchData<Genero>(getAllGeneros);
  const { data: categorias, loading: loadingCategorias, error: errorCategorias } = useFetchData<Categoria>(getAllCategorias);
  const { data: marcas, loading: loadingMarcas, error: errorMarcas } = useFetchData<Marca>(getAllMarcas)

  const categoriaSeleccionada = watch("categoriaId")
  const subCategoriaSeleccionada = watch("subcategoriaId")
  const imagenValue = watch("imagen") as unknown;

  const fetchSubcategorias = useCallback(
    () => categoriaSeleccionada ? getSubcategoriasByCategoriaId(Number(categoriaSeleccionada)) : Promise.resolve([]),
    [categoriaSeleccionada]
  );
  const fetchSubsubccategorias = useCallback(
    () => subCategoriaSeleccionada ? getSubsubcategoriasBySubCategoriaId(Number(subCategoriaSeleccionada)) : Promise.resolve([]),
    [subCategoriaSeleccionada],
  );
  const fetchArticuloById = useCallback(
    () => articuloId ? getArticuloById(articuloId) : Promise.resolve(null),
    [articuloId],
  )

  const { data: articulo, loading: loadinArticulo } = useFetchItem<Articulo | null>(fetchArticuloById)
  const { data: subcategorias, loading: loadingSubcategorias } = useFetchData<SubCategoria>(fetchSubcategorias);
  const { data: subsubcategorias, loading: loadingSubsubcategorias } = useFetchData<SubSubCategoria>(fetchSubsubccategorias);

  const loading = loadingGeneros || loadingCategorias || loadingMarcas
    || loadingSubcategorias || loadingSubsubcategorias || loadinArticulo
  const error = errorGeneros || errorCategorias || errorMarcas;

  const imagenActual = articulo ? `${import.meta.env.VITE_BASE_URL}${articulo.imagen}` : null

  useEffect(() => {
    if (articulo) {
      reset({
        nombre: articulo.nombre,
        precioVenta: articulo.precioVenta,
        marcaId: articulo.marcaId,
        generoId: articulo.generoId ?? null,
        categoriaId: articulo.categoriaId,
        subcategoriaId: articulo.subcategoriaId,
        subSubcategoriaId: articulo.subSubcategoriaId,
        variantes: articulo.variantes,
      });
    }
  }, [articuloId, articulo, reset]);


  if (error) return <p>{error}</p>;

  const onSubmit = async (data: ArticuloFormData) => {
    console.log(data)
    try {
      const formData = new FormData()

      formData.append("nombre", data.nombre)
      formData.append("precioVenta", String(data.precioVenta))
      formData.append("generoId", String(data.generoId))
      formData.append("subSubcategoriaId", String(data.subSubcategoriaId))
      formData.append("marcaId", String(data.marcaId))
      formData.append("variantes", JSON.stringify(data.variantes))
      if (data.imagen && data.imagen.length > 0) {
        formData.append("imagen", data.imagen[0]);
      }
      if (articulo && articuloId) {
        const res = await updateArticulo(articuloId, formData)
        console.log(res)
      } else {
        const res = await createArticulo(formData)
        console.log(res)
      }

      reset({
        nombre: "",
        precioVenta: "",
        imagen: null,
        generoId: null,
        categoriaId: null,
        subcategoriaId: null,
        subSubcategoriaId: null,
        marcaId: null,
        variantes: []
      });
      closeModal()
    } catch (error) {
      const apiError = error as ApiError;
      console.log(apiError.message)
    }

  }

  return (
    <>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  className="border border-gray-300 w-full rounded-lg h-10 px-2 py-2"
                  {...register("nombre", { required: "El nombre es obligatorio" })}
                />
                {errors.nombre && <p className="text-red-500">{errors.nombre.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="precioVenta">Precio venta</label>
                <input
                  type="text"
                  id="precioVenta"
                  className="border border-gray-300 w-full rounded-lg h-10 px-2 py-2"
                  {...register("precioVenta", { required: "El precio es obligatorio" })}
                />
                {errors.precioVenta && <p className="text-red-500">{errors.precioVenta.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="marca">Marca</label>
                <select id="marca" {...register("marcaId", { required: "La marca es requerida" })} className="border h-10 border-gray-300 rounded-lg px-2 py-2">
                  <option value="">Seleccione una marca</option>
                  {marcas.map((m) => (
                    <option key={m.idMarca} value={m.idMarca}>{m.nombre}</option>
                  ))}
                </select>
                {errors.marcaId && <p className="text-red-500">{errors.marcaId.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="imagen">Imagen</label>
                <input
                  type="file"
                  id="imagen"
                  accept="image/*"
                  className="border border-gray-300 w-full rounded-lg h-10 px-2 py-2"
                  {...register("imagen")}
                />

                {imagenValue instanceof FileList && imagenValue.length > 0 && (
                  <img
                    src={URL.createObjectURL(imagenValue[0])}
                    alt="Vista previa"
                    className="mt-2 w-40 h-40 object-cover rounded-lg border"
                  />
                )}

                {imagenActual && imagenActual.includes("uploads") && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Imagen actual:</p>
                    <img
                      src={imagenActual}
                      alt="Imagen actual"
                      className="mt-1 w-40 h-40 object-cover rounded-lg border"
                    />
                  </div>
                )}

              </div>

            </div>

            {/* Columna derecha */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="genero">Género</label>
                <select id="genero" {...register("generoId",{required:false})} className="border h-10 border-gray-300 rounded-lg px-2 py-2">
                  <option value="">Seleccione un género</option>
                  {generos.map((g) => (
                    <option key={g.idGenero} value={g.idGenero}>{g.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="categoria">Categoría</label>
                <select id="categoria" {...register("categoriaId", { required: "Selecciona una categoria" })} className="border h-10 border-gray-300 rounded-lg px-2 py-2">
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((c) => (
                    <option key={c.idCategoria} value={c.idCategoria}>{c.nombre}</option>
                  ))}
                </select>
                {errors.categoriaId && <p className="text-red-500">{errors.categoriaId.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subcategoria">SubCategoría</label>
                <select id="subcategoria" {...register("subcategoriaId", { required: "Selecciona una subcategoria" })} className="border h-10 border-gray-300 rounded-lg px-2 py-2">
                  <option value="">Seleccione una subcategoría</option>
                  {subcategorias.map((s) => (
                    <option key={s.idSubcategoria} value={s.idSubcategoria}>{s.nombre}</option>
                  ))}
                </select>
                {errors.subcategoriaId && <p className="text-red-500">{errors.subcategoriaId.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subsubcategoria">SubSubCategoría</label>
                <select id="subsubcategoria" {...register("subSubcategoriaId", { required: "Selecciona una subsubcategoria" })} className="border h-10 border-gray-300 rounded-lg px-2 py-2">
                  <option value="">Seleccione una subsubcategoría</option>
                  {subsubcategorias.map((s) => (
                    <option key={s.idSubSubcategoria} value={s.idSubSubcategoria}>{s.nombre}</option>
                  ))}
                </select>
                {errors.subSubcategoriaId && <p className="text-red-500">{errors.subSubcategoriaId.message}</p>}
              </div>
            </div>

            <div className="col-span-2 mt-6">
              <VariantesForm />
            </div>

            <Button
              type="submit"
              className="bg-[#B8860B] text-white col-span-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registrando..." : articuloId ? "Editar" : "Registrar"}
            </Button>

          </form>
        </FormProvider >
      )}
    </>
  )
}

export default ArticuloForm