import { useState, useEffect } from 'react';
import { ArrowLeftRight, Clock } from 'lucide-react';

type ConversionCategory = 'length' | 'weight' | 'temperature' | 'volume' | 'area' | 'speed' | 'currency' | 'time';

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
  currency: {
    USD: { name: 'US Dollar', toBase: (v) => v, fromBase: (v) => v },
    EUR: { name: 'Euro', toBase: (v) => v, fromBase: (v) => v },
    GBP: { name: 'British Pound', toBase: (v) => v, fromBase: (v) => v },
    JPY: { name: 'Japanese Yen', toBase: (v) => v, fromBase: (v) => v },
    INR: { name: 'Indian Rupee', toBase: (v) => v, fromBase: (v) => v },
    NPR: { name: 'Nepali Rupee', toBase: (v) => v, fromBase: (v) => v },
    AUD: { name: 'Australian Dollar', toBase: (v) => v, fromBase: (v) => v },
    CAD: { name: 'Canadian Dollar', toBase: (v) => v, fromBase: (v) => v },
    CNY: { name: 'Chinese Yuan', toBase: (v) => v, fromBase: (v) => v },
    CHF: { name: 'Swiss Franc', toBase: (v) => v, fromBase: (v) => v },
  },
  time: {
    kathmandu: { name: 'Kathmandu (GMT+5:45)', toBase: (v) => v, fromBase: (v) => v },
    utc: { name: 'UTC/GMT', toBase: (v) => v, fromBase: (v) => v },
    new_york: { name: 'New York (EST/EDT)', toBase: (v) => v, fromBase: (v) => v },
    london: { name: 'London (GMT/BST)', toBase: (v) => v, fromBase: (v) => v },
    tokyo: { name: 'Tokyo (JST)', toBase: (v) => v, fromBase: (v) => v },
    dubai: { name: 'Dubai (GST)', toBase: (v) => v, fromBase: (v) => v },
    sydney: { name: 'Sydney (AEST/AEDT)', toBase: (v) => v, fromBase: (v) => v },
    los_angeles: { name: 'Los Angeles (PST/PDT)', toBase: (v) => v, fromBase: (v) => v },
    delhi: { name: 'Delhi (IST)', toBase: (v) => v, fromBase: (v) => v },
    singapore: { name: 'Singapore (SGT)', toBase: (v) => v, fromBase: (v) => v },
  },
};

const timezoneMap: Record<string, string> = {
  kathmandu: 'Asia/Kathmandu',
  utc: 'UTC',
  new_york: 'America/New_York',
  london: 'Europe/London',
  tokyo: 'Asia/Tokyo',
  dubai: 'Asia/Dubai',
  sydney: 'Australia/Sydney',
  los_angeles: 'America/Los_Angeles',
  delhi: 'Asia/Kolkata',
  singapore: 'Asia/Singapore',
};

export default function UnitConverter() {
  const [category, setCategory] = useState<ConversionCategory>('length');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [currentKathmanduTime, setCurrentKathmanduTime] = useState('');

  useEffect(() => {
    if (category === 'currency') {
      fetchExchangeRates();
    }
  }, [category]);

  useEffect(() => {
    const updateKathmanduTime = () => {
      const time = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kathmandu',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setCurrentKathmanduTime(time);
    };

    updateKathmanduTime();
    const interval = setInterval(updateKathmanduTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchExchangeRates = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      setExchangeRates(data.rates);
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
    }
    setLoading(false);
  };

  const convertCurrency = (value: number, from: string, to: string): number => {
    if (!exchangeRates[from] || !exchangeRates[to]) return 0;
    const usdValue = value / exchangeRates[from];
    return usdValue * exchangeRates[to];
  };

  const convertTime = (timeStr: string, fromZone: string, toZone: string): string => {
    try {
      const [hours, minutes] = timeStr.split(':').map(Number);
      const now = new Date();

      const sourceFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezoneMap[fromZone],
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      const parts = sourceFormatter.formatToParts(now);
      const year = parseInt(parts.find(p => p.type === 'year')?.value || '0');
      const month = parseInt(parts.find(p => p.type === 'month')?.value || '1') - 1;
      const day = parseInt(parts.find(p => p.type === 'day')?.value || '1');

      const sourceDate = new Date(year, month, day, hours, minutes);

      const targetFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezoneMap[toZone],
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      return targetFormatter.format(sourceDate);
    } catch (error) {
      return '00:00';
    }
  };

  const handleConvert = () => {
    const value = parseFloat(fromValue);
    if (category === 'time') {
      const result = convertTime(fromValue, fromUnit, toUnit);
      setToValue(result);
    } else if (!isNaN(value)) {
      if (category === 'currency') {
        const result = convertCurrency(value, fromUnit, toUnit);
        setToValue(result.toFixed(2));
      } else {
        const baseValue = conversions[category][fromUnit].toBase(value);
        const result = conversions[category][toUnit].fromBase(baseValue);
        setToValue(result.toFixed(6));
      }
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
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-4">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Unit Converter</h3>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-3">Category</label>
          <div className="grid grid-cols-4 gap-2">
            {(Object.keys(conversions) as ConversionCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  const newUnits = Object.keys(conversions[cat]);
                  setFromUnit(newUnits[0]);
                  setToUnit(newUnits[1] || newUnits[0]);
                  setToValue('');
                  if (cat === 'time') {
                    const now = new Date();
                    setFromValue(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
                  } else {
                    setFromValue('1');
                  }
                }}
                className={`py-2 px-3 rounded-xl font-semibold capitalize transition-all text-sm ${
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
                type={category === 'time' ? 'time' : 'number'}
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder={category === 'time' ? 'HH:MM' : 'Enter value'}
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors bg-white min-w-[180px]"
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
                className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors bg-white min-w-[180px]"
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
          disabled={loading}
          className="w-full mt-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold py-4 rounded-xl hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading rates...' : 'Convert'}
        </button>

        {category === 'currency' && (
          <div className="mt-4 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Currency rates are fetched in real-time from exchangerate-api.com. Rates update automatically when you switch to currency converter.
            </p>
          </div>
        )}

        {category === 'time' && (
          <div className="mt-4 p-4 bg-teal-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={18} className="text-teal-700" />
              <p className="text-sm font-semibold text-teal-900">
                Current Kathmandu Time: {currentKathmanduTime}
              </p>
            </div>
            <p className="text-xs text-teal-700">
              Kathmandu uses GMT+5:45 timezone year-round (no daylight saving time)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
