import { useState } from "react";
import { Range } from "react-range";
import { useSearchParams } from "react-router-dom";

type Props = {
  min?: number;
  max?: number;
  step?: number;
  currency?: string;
  initialMin?: number;
  initialMax?: number;
  onChange?: (values: { min: number; max: number }) => void;
};

export default function PriceRangeFilter({
  min = 0,
  max = 1000,
  step = 1,
  currency = "S/",
  initialMin,
  initialMax,
}: Props) {
  const [values, setValues] = useState<number[]>([
    initialMin ?? min,
    initialMax ?? max,
  ]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleRange = (values:number[]) => {
    setValues(values)
    searchParams.set("precioMin", String(values[0]))
    searchParams.set("precioMax", String(values[1]))
    setSearchParams(searchParams)
  }

  return (
    <div className="w-full max-w-lg p-4 bg-white rounded-2xl shadow-sm">
      <label className="block text-sm font-medium mb-4">Precio</label>

      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>
          {currency}
          {values[0].toFixed(2)}
        </span>
        <span>
          {currency}
          {values[1].toFixed(2)}
        </span>
      </div>

      <Range
        step={step}
        min={min}
        max={max}
        values={values}
        onChange={(values) => handleRange(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="h-2 w-full rounded-full bg-gray-200"
            style={props.style}
          >
            <div
              className="h-2 bg-indigo-500 rounded-full"
              style={{
                width: `${((values[1] - values[0]) / (max - min)) * 100}%`,
                marginLeft: `${((values[0] - min) / (max - min)) * 100}%`,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="w-5 h-5 bg-indigo-500 rounded-full shadow cursor-pointer"
          />
        )}
      />
    </div>
  );
}
