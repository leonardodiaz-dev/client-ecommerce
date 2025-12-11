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
import { getArticuloById } from "../../services/articulos"
import type { Marca } from "../../interfaces/marca"
import { getAllMarcas } from "../../services/marcas"
import { useFetchItem } from "../../hooks/useFetchItem"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../store/store"
import { addArticulo, editArticulo } from "../../store/articuloSlice"
import { useToast } from "../../context/useToast"
import Select, { type SingleValue } from "react-select";
import { Controller } from "react-hook-form";

type Props = {
  articuloId?: number | null
  closeModal: () => void
}

interface MarcaOption {
  value: number;
  label: string;
}

const ArticuloForm = ({ articuloId, closeModal }: Props) => {

  const dispatch = useDispatch<AppDispatch>()
  const methods = useForm<ArticuloFormData>({
    defaultValues: {
      nombre: "",
      precioVenta: null,
      imagen: null,
      gender_id: null,
      category_id: null,
      subcategory_id: null,
      subsubcategory_id: null,
      variants: [],
    },
  });
  const { showToast } = useToast()
  const { register, handleSubmit, reset, watch, control, formState: { errors, isSubmitting } } = methods;
  const { data: generos, loading: loadingGeneros, error: errorGeneros } = useFetchData<Genero>(getAllGeneros);
  const { data: categorias, loading: loadingCategorias, error: errorCategorias } = useFetchData<Categoria>(getAllCategorias);
  const { data: marcas, error: errorMarcas } = useFetchData<Marca>(getAllMarcas)

  const categoriaSeleccionada = watch("category_id")
  const subCategoriaSeleccionada = watch("subcategory_id")
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

  const { data: articulo } = useFetchItem<Articulo | null>(fetchArticuloById)
  const { data: subcategorias, loading: loadingSubcategorias } = useFetchData<SubCategoria>(fetchSubcategorias);
  const { data: subsubcategorias, loading: loadingSubsubcategorias } = useFetchData<SubSubCategoria>(fetchSubsubccategorias);
  console.log(articulo)
  const error = errorGeneros || errorCategorias || errorMarcas;

  const imagenActual = articulo ? `${import.meta.env.VITE_BASE_URL}storage/${articulo.imagen}` : null

  useEffect(() => {

    if (articulo) {
      reset({
        nombre: articulo.nombre,
        precioVenta: articulo.precioVenta.toString(),
        brand_id: articulo.brand_id,
        gender_id: articulo.gender_id,
        category_id: articulo.category_id,
        subcategory_id: articulo.subcategory_id,
        subsubcategory_id: articulo.subsubcategory_id,
        variants: articulo.variants,
      });

    }
  }, [articuloId, articulo, reset]);


  if (error) return <p>{error}</p>;

  const onSubmit = async (data: ArticuloFormData) => {
    const variantsNormalizados = data.variants.map(v => ({
      color_id: v.color_id ? Number(v.color_id) : null,
      size_id: v.size_id ? Number(v.size_id) : null,
      id: v.id ?? null
    }));
    try {
      const formData = new FormData()
      console.log(data)
      formData.append("nombre", data.nombre)
      formData.append("precioVenta", String(data.precioVenta))
      if(data.gender_id) formData.append("gender_id", String(data.gender_id))
      formData.append("subsubcategory_id", String(data.subsubcategory_id))
      formData.append("brand_id", String(data.brand_id))
      formData.append("variants", JSON.stringify(variantsNormalizados));
      if (data.imagen && data.imagen.length > 0) {
        formData.append("imagen", data.imagen[0]);
      }

      if (articulo && articuloId) {
        await dispatch(editArticulo({ id: articuloId, formData })).unwrap()
        showToast("Articulo editado con exito", {
          type: 'success'
        })
      } else {
        await dispatch(addArticulo(formData)).unwrap()
        showToast("Articulo registrado con exito", {
          type: 'success'
        })
      }

      reset({
        nombre: "",
        precioVenta: "",
        imagen: null,
        gender_id: null,
        category_id: null,
        subcategory_id: null,
        subsubcategory_id: null,
        brand_id: null,
        variants: []
      });
      closeModal()
    } catch (error) {
      const apiError = error as ApiError;
      showToast("Ha ocurrido un error", {
        type: 'error'
      })
      console.log(apiError.message)
    }

  }

  return (

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

            <Controller
              name="brand_id"
              control={control}
              rules={{ required: "La marca es requerida" }}
              render={({ field }) => (
                <Select<MarcaOption, false>
                  {...field}
                  options={marcas.map((m) => ({
                    value: m.id,
                    label: m.nombre,
                  }))}
                  placeholder="Seleccione una marca"
                  isSearchable
                  className="text-sm"
                  onChange={(option: SingleValue<MarcaOption>) =>
                    field.onChange(option ? option.value : "")
                  }
                  value={
                    marcas
                      .map((m) => ({
                        value: m.id,
                        label: m.nombre,
                      }))
                      .find((opt) => opt.value === field.value) || null
                  }
                />
              )}
            />

            {errors.brand_id && <p className="text-red-500">{errors.brand_id.message}</p>}
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

            {imagenActual && imagenActual.includes("storage") && (
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
            {
              loadingGeneros ? (
                <div className="flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <select id="genero" {...register("gender_id", { required: false })} className="border h-10 border-gray-300 rounded-lg px-2 py-2">
                  <option value="">Seleccione un género</option>
                  {generos.map((g) => (
                    <option key={g.id} value={g.id}>{g.nombre}</option>
                  ))}
                </select>
              )
            }
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="categoria">Categoría</label>
            {
              (loadingCategorias || !categorias || categorias.length === 0) ? (
                <div className="flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <select id="categoria" {...register("category_id", { required: "Selecciona una categoria" })} className="border h-10 border-gray-300 rounded-lg px-2 py-2">
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((c) => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </select>
              )
            }
            {errors.category_id && <p className="text-red-500">{errors.category_id.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="subcategoria">SubCategoría</label>
            {
              loadingSubcategorias ? (
                <div className="flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <select id="subcategoria" {...register("subcategory_id", { required: "Selecciona una subcategoria" })} className="border h-10 border-gray-300 rounded-lg px-2 py-2">
                  <option value="">Seleccione una subcategoría</option>
                  {subcategorias.map((s) => (
                    <option key={s.id} value={s.id}>{s.nombre}</option>
                  ))}
                </select>
              )
            }
            {errors.subcategory_id && <p className="text-red-500">{errors.subcategory_id.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="subsubcategoria">SubSubCategoría</label>
            {
              loadingSubsubcategorias ? (
                <div className="flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <select id="subsubcategoria" {...register("subsubcategory_id", { required: "Selecciona una subsubcategoria" })} className="border h-10 border-gray-300 rounded-lg px-2 py-2">
                  <option value="">Seleccione una subsubcategoría</option>
                  {subsubcategorias.map((s) => (
                    <option key={s.id} value={s.id}>{s.nombre}</option>
                  ))}
                </select>
              )
            }
            {errors.subsubcategory_id && <p className="text-red-500">{errors.subsubcategory_id.message}</p>}
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
  )
}

export default ArticuloForm