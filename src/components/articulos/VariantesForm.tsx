import { useFieldArray, useFormContext } from "react-hook-form";
import { useFetchData } from "../../hooks/useFetchData";
import { getAllColores } from "../../services/colores";
import type { Color } from "../../interfaces/color";
import type { Talla } from "../../interfaces/talla";
import { getAllTallas } from "../../services/tallas";


export default function VariantesForm() {
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const { data: colores, loading: loadingColor } = useFetchData<Color>(getAllColores)
  const { data: tallas, loading: loadingTalla } = useFetchData<Talla>(getAllTallas)
 
  return (
    <div className="border p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Variantes</h3>

      {fields.map((field, index) => (
        <div key={field.id} className="border rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 mb-3">
            {
              (loadingColor || colores.length === 0 || !colores) ? (
                <div className="flex items-center justify-center py-10">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <select
                  {...register(`variants.${index}.color_id`)}
                  className="border border-gray-300 rounded-lg px-2 py-1 w-1/3"
                >
                  <option value="">-- Sin color --</option>
                  {colores.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
              )
            }
            {
              (!tallas || tallas.length === 0 || loadingTalla) ? (
                <div className="flex items-center justify-center py-10">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <select
                  {...register(`variants.${index}.size_id`)}
                  className="border border-gray-300 rounded-lg px-2 py-1 w-1/3"
                >
                  <option value="">-- Sin Talla --</option>
                  {tallas.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nombre} - {t.tipo}
                    </option>
                  ))}
                </select>
              )
            }

            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 text-white px-2 py-1 rounded-lg"
            >
              Eliminar Variante
            </button>
          </div>

        </div>
      ))
      }

      <button
        type="button"
        onClick={() => append({ id: null, color_id: null, size_id: null })}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-3"
      >
        + Agregar Variante
      </button>
    </div >
  );
}
