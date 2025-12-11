import { useState } from "react";
import { Range } from "react-range";

type Props = {
  min?: number;
  max?: number;
  step?: number;
  currency?: string;
  initialMin?: number;
  initialMax?: number;
  onChangeMin: (value: string) => void;
  onChangeMax: (value: string) => void;
};

export default function PriceRangeFilter({
  min = 0,
  max = 1000,
  step = 1,
  currency = "S/",
  initialMin,
  initialMax,
  onChangeMin,
  onChangeMax,
}: Props) {
  const [values, setValues] = useState<number[]>([
    initialMin ?? min,
    initialMax ?? max,
  ]);
 
  const handleRange = (newValues: number[]) => {
    setValues(newValues);
    onChangeMin(newValues[0].toString());
    onChangeMax(newValues[1].toString());
  };

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
        renderTrack={({ props, children }) => {
          const { key, ...rest } = props as any;
          return (
            <div
              {...rest}
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
          );
        }}
        renderThumb={({ props, index }) => {
          const { key, ...rest } = props as any;
          return (
            <div
              {...rest}
              key={index}
              className="w-5 h-5 bg-indigo-500 rounded-full shadow cursor-pointer"
            />
          );
        }}
      />

    </div>
  );
}
