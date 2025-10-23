import { useState } from 'react';
import { Calendar, Clock, Timer, Globe } from 'lucide-react';
import { adToBs, bsToAd } from '../utils/nepaliDateConverter';

export default function DateCalculators() {
  const [activeCalc, setActiveCalc] = useState<'age' | 'date-diff' | 'date-add' | 'nepali'>('age');

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveCalc('age')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
            activeCalc === 'age'
              ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Calendar size={20} />
          Age Calculator
        </button>
        <button
          onClick={() => setActiveCalc('date-diff')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
            activeCalc === 'date-diff'
              ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Clock size={20} />
          Date Difference
        </button>
        <button
          onClick={() => setActiveCalc('date-add')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
            activeCalc === 'date-add'
              ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Timer size={20} />
          Add/Subtract Days
        </button>
        <button
          onClick={() => setActiveCalc('nepali')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
            activeCalc === 'nepali'
              ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Globe size={20} />
          AD/BS Converter
        </button>
      </div>

      {activeCalc === 'age' && <AgeCalculator />}
      {activeCalc === 'date-diff' && <DateDifferenceCalculator />}
      {activeCalc === 'date-add' && <DateAddCalculator />}
      {activeCalc === 'nepali' && <NepaliDateConverter />}
    </div>
  );
}

function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
  } | null>(null);

  const calculate = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    setResult({ years, months, days, totalDays });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Age Calculator</h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-gradient-to-br from-teal-500 to-cyan-600 text-white font-semibold py-4 rounded-xl hover:scale-105 transition-all shadow-lg"
      >
        Calculate Age
      </button>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6">
            <div className="text-sm text-teal-800 font-semibold mb-3">Your Age</div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-900">{result.years}</div>
                <div className="text-xs text-teal-700 mt-1">Years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-900">{result.months}</div>
                <div className="text-xs text-teal-700 mt-1">Months</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-900">{result.days}</div>
                <div className="text-xs text-teal-700 mt-1">Days</div>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="text-sm text-slate-700">
              <strong>Total Days:</strong> {result.totalDays.toLocaleString()} days
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalHours: number;
  } | null>(null);

  const calculate = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      alert('End date must be after start date');
      return;
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60));

    setResult({ years, months, days, totalDays, totalHours });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Date Difference Calculator</h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-gradient-to-br from-teal-500 to-cyan-600 text-white font-semibold py-4 rounded-xl hover:scale-105 transition-all shadow-lg"
      >
        Calculate Difference
      </button>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6">
            <div className="text-sm text-teal-800 font-semibold mb-3">Time Difference</div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-900">{result.years}</div>
                <div className="text-xs text-teal-700 mt-1">Years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-900">{result.months}</div>
                <div className="text-xs text-teal-700 mt-1">Months</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-900">{result.days}</div>
                <div className="text-xs text-teal-700 mt-1">Days</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-xs text-blue-800 font-semibold mb-1">Total Days</div>
              <div className="text-xl font-bold text-blue-900">{result.totalDays.toLocaleString()}</div>
            </div>
            <div className="bg-cyan-50 rounded-xl p-4">
              <div className="text-xs text-cyan-800 font-semibold mb-1">Total Hours</div>
              <div className="text-xl font-bold text-cyan-900">{result.totalHours.toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DateAddCalculator() {
  const [startDate, setStartDate] = useState('');
  const [days, setDays] = useState('30');
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    if (!startDate || !days) return;

    const date = new Date(startDate);
    const daysToAdd = parseInt(days) * (operation === 'add' ? 1 : -1);

    date.setDate(date.getDate() + daysToAdd);

    setResult(date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Add/Subtract Days</h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Operation</label>
          <div className="flex gap-2">
            <button
              onClick={() => setOperation('add')}
              className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all ${
                operation === 'add'
                  ? 'bg-teal-500 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              Add Days
            </button>
            <button
              onClick={() => setOperation('subtract')}
              className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all ${
                operation === 'subtract'
                  ? 'bg-teal-500 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              Subtract Days
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Days</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            min="0"
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-gradient-to-br from-teal-500 to-cyan-600 text-white font-semibold py-4 rounded-xl hover:scale-105 transition-all shadow-lg"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-6">
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6">
            <div className="text-sm text-teal-800 font-semibold mb-2">Result Date</div>
            <div className="text-2xl font-bold text-teal-900">{result}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function NepaliDateConverter() {
  const [mode, setMode] = useState<'ad-to-bs' | 'bs-to-ad'>('ad-to-bs');
  const [adYear, setAdYear] = useState('2024');
  const [adMonth, setAdMonth] = useState('1');
  const [adDay, setAdDay] = useState('1');
  const [bsYear, setBsYear] = useState('2080');
  const [bsMonth, setBsMonth] = useState('1');
  const [bsDay, setBsDay] = useState('1');
  const [result, setResult] = useState<string | null>(null);

  const convertAdToBs = () => {
    const year = parseInt(adYear);
    const month = parseInt(adMonth);
    const day = parseInt(adDay);

    const bsDate = adToBs(year, month, day);

    if (bsDate) {
      setResult(`${bsDate.year} ${bsDate.monthName} ${bsDate.day} BS`);
    } else {
      setResult('Invalid date or out of range (1943-2043 AD)');
    }
  };

  const convertBsToAd = () => {
    const year = parseInt(bsYear);
    const month = parseInt(bsMonth);
    const day = parseInt(bsDay);

    const adDate = bsToAd(year, month, day);

    if (adDate) {
      const date = new Date(adDate.year, adDate.month - 1, adDate.day);
      setResult(date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }) + ' AD');
    } else {
      setResult('Invalid date or out of range (2000-2100 BS)');
    }
  };

  const handleConvert = () => {
    if (mode === 'ad-to-bs') {
      convertAdToBs();
    } else {
      convertBsToAd();
    }
  };

  const nepaliMonths = [
    'Baishakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
    'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">AD/BS Date Converter</h3>

      <div className="mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => {
              setMode('ad-to-bs');
              setResult(null);
            }}
            className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all ${
              mode === 'ad-to-bs'
                ? 'bg-teal-500 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            AD to BS
          </button>
          <button
            onClick={() => {
              setMode('bs-to-ad');
              setResult(null);
            }}
            className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all ${
              mode === 'bs-to-ad'
                ? 'bg-teal-500 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            BS to AD
          </button>
        </div>
      </div>

      {mode === 'ad-to-bs' ? (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              English Date (AD)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                value={adYear}
                onChange={(e) => setAdYear(e.target.value)}
                placeholder="Year"
                min="1943"
                max="2043"
                className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
              />
              <input
                type="number"
                value={adMonth}
                onChange={(e) => setAdMonth(e.target.value)}
                placeholder="Month"
                min="1"
                max="12"
                className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
              />
              <input
                type="number"
                value={adDay}
                onChange={(e) => setAdDay(e.target.value)}
                placeholder="Day"
                min="1"
                max="31"
                className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
              />
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Format: YYYY / MM / DD (1943-2043)
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nepali Date (BS)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                value={bsYear}
                onChange={(e) => setBsYear(e.target.value)}
                placeholder="Year"
                min="2000"
                max="2100"
                className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
              />
              <select
                value={bsMonth}
                onChange={(e) => setBsMonth(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none transition-colors bg-white"
              >
                {nepaliMonths.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={bsDay}
                onChange={(e) => setBsDay(e.target.value)}
                placeholder="Day"
                min="1"
                max="32"
                className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
              />
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Format: YYYY / Month / DD (2000-2100)
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleConvert}
        className="w-full bg-gradient-to-br from-teal-500 to-cyan-600 text-white font-semibold py-4 rounded-xl hover:scale-105 transition-all shadow-lg"
      >
        Convert
      </button>

      {result && (
        <div className="mt-6">
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6">
            <div className="text-sm text-teal-800 font-semibold mb-2">
              {mode === 'ad-to-bs' ? 'Nepali Date (BS)' : 'English Date (AD)'}
            </div>
            <div className="text-2xl font-bold text-teal-900">{result}</div>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> The converter supports AD dates from 1943 to 2043 and BS dates from 2000 to 2100.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
