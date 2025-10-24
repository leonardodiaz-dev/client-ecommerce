import { useFieldArray, useFormContext } from "react-hook-form";
import { useFetchData } from "../../hooks/useFetchData";
import { getAllColores } from "../../services/colores";
import type { Color } from "../../interfaces/color";
import type { Talla } from "../../interfaces/talla";
import { getAllTallas } from "../../services/tallas";
import { useEffect } from "react";


export default function VariantesForm() {
  const { control, register, watch } = useFormContext();

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "variantes",
  });

  const { data: colores } = useFetchData<Color>(getAllColores)
  const { data: tallas, loading: loadingTalla } = useFetchData<Talla>(getAllTallas)
  const variantes = watch("variantes");

  useEffect(() => {

    if (!variantes) return;

    try {
      const variantesStr = JSON.stringify(variantes);
      const fieldsStr = JSON.stringify(fields);

      if (variantesStr !== fieldsStr) {
        replace(variantes);
      }
    } catch (err) {
      console.warn("Error stringify variantes/fields, forzando replace", err);
      replace(variantes);
    }

  }, [JSON.stringify(variantes), replace]);

  const loading = loadingTalla
  if (loading) return <p>Cargando...</p>;

  return (
    <div className="border p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Variantes</h3>

      {fields.map((field, index) => (
        <div key={field.id} className="border rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <select
              {...register(`variantes.${index}.colorId`)}
              className="border border-gray-300 rounded-lg px-2 py-1 w-1/3"
            >
              <option value="">-- Sin color --</option>
              {colores.map((c) => (
                <option key={c.idColor} value={c.idColor}>
                  {c.nombre}
                </option>
              ))}
            </select>
            <select
              {...register(`variantes.${index}.tallaId`)}
              className="border border-gray-300 rounded-lg px-2 py-1 w-1/3"
            >
              <option value="">-- Sin Talla --</option>
              {tallas.map((t) => (
                <option key={t.idTalla} value={t.idTalla}>
                  {t.nombre} - {t.tipo}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 text-white px-2 py-1 rounded-lg"
            >
              Eliminar Variante
            </button>
          </div>

        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ idVariante: null, colorId: null, tallaId: null })}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-3"
      >
        + Agregar Variante
      </button>
    </div>
  );
}
