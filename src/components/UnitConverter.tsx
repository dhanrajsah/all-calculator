import { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

type ConversionCategory = 'length' | 'weight' | 'temperature' | 'volume' | 'area' | 'speed';

interface ConversionUnit {
  name: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

const conversions: Record<ConversionCategory, Record<string, ConversionUnit>> = {
  length: {
    meters: { name: 'Meters', toBase: (v) => v, fromBase: (v) => v },
    kilometers: { name: 'Kilometers', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    centimeters: { name: 'Centimeters', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    miles: { name: 'Miles', toBase: (v) => v * 1609.34, fromBase: (v) => v / 1609.34 },
    yards: { name: 'Yards', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
    feet: { name: 'Feet', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    inches: { name: 'Inches', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
  },
  weight: {
    kilograms: { name: 'Kilograms', toBase: (v) => v, fromBase: (v) => v },
    grams: { name: 'Grams', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    pounds: { name: 'Pounds', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    ounces: { name: 'Ounces', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    tons: { name: 'Tons', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  },
  temperature: {
    celsius: {
      name: 'Celsius',
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    fahrenheit: {
      name: 'Fahrenheit',
      toBase: (v) => (v - 32) * 5 / 9,
      fromBase: (v) => (v * 9 / 5) + 32,
    },
    kelvin: {
      name: 'Kelvin',
      toBase: (v) => v - 273.15,
      fromBase: (v) => v + 273.15,
    },
  },
  volume: {
    liters: { name: 'Liters', toBase: (v) => v, fromBase: (v) => v },
    milliliters: { name: 'Milliliters', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    gallons: { name: 'Gallons', toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
    cups: { name: 'Cups', toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
  },
  area: {
    square_meters: { name: 'Square Meters', toBase: (v) => v, fromBase: (v) => v },
    square_kilometers: { name: 'Square Kilometers', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
    square_feet: { name: 'Square Feet', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
    acres: { name: 'Acres', toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
  },
  speed: {
    meters_per_second: { name: 'Meters/Second', toBase: (v) => v, fromBase: (v) => v },
    kilometers_per_hour: { name: 'Kilometers/Hour', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
    miles_per_hour: { name: 'Miles/Hour', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
  },
};

export default function UnitConverter() {
  const [category, setCategory] = useState<ConversionCategory>('length');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');

  const handleConvert = () => {
    const value = parseFloat(fromValue);
    if (!isNaN(value)) {
      const baseValue = conversions[category][fromUnit].toBase(value);
      const result = conversions[category][toUnit].fromBase(baseValue);
      setToValue(result.toFixed(6));
    }
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  const units = Object.keys(conversions[category]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Unit Converter</h3>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-3">Category</label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(conversions) as ConversionCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setFromUnit(Object.keys(conversions[cat])[0]);
                setToUnit(Object.keys(conversions[cat])[1]);
                setToValue('');
              }}
              className={`py-2 px-4 rounded-xl font-semibold capitalize transition-all ${
                category === cat
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">From</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Enter value"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors bg-white"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {conversions[category][unit].name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <ArrowLeftRight size={20} className="text-slate-700" />
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">To</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={toValue}
              readOnly
              className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800"
              placeholder="Result"
            />
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors bg-white"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {conversions[category][unit].name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handleConvert}
        className="w-full mt-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold py-4 rounded-xl hover:scale-105 transition-all shadow-lg"
      >
        Convert
      </button>
    </div>
  );
}
