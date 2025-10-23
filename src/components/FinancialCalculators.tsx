import { useState } from 'react';
import { DollarSign, TrendingUp, PiggyBank } from 'lucide-react';

export default function FinancialCalculators() {
  const [activeCalc, setActiveCalc] = useState<'loan' | 'investment' | 'mortgage'>('loan');

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveCalc('loan')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
            activeCalc === 'loan'
              ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <DollarSign size={20} />
          Loan Calculator
        </button>
        <button
          onClick={() => setActiveCalc('investment')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
            activeCalc === 'investment'
              ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <TrendingUp size={20} />
          Investment
        </button>
        <button
          onClick={() => setActiveCalc('mortgage')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
            activeCalc === 'mortgage'
              ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <PiggyBank size={20} />
          Mortgage
        </button>
      </div>

      {activeCalc === 'loan' && <LoanCalculator />}
      {activeCalc === 'investment' && <InvestmentCalculator />}
      {activeCalc === 'mortgage' && <MortgageCalculator />}
    </div>
  );
}

function LoanCalculator() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('3');
  const [result, setResult] = useState<{monthly: number; total: number; interest: number} | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (p && r && n) {
      const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = monthly * n;
      const interest = total - p;

      setResult({ monthly, total, interest });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Loan Calculator</h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Loan Amount ($)
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            step="0.1"
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Loan Term (years)
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold py-4 rounded-xl hover:scale-105 transition-all shadow-lg"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
            <div className="text-sm text-green-800 font-semibold mb-1">Monthly Payment</div>
            <div className="text-3xl font-bold text-green-900">${result.monthly.toFixed(2)}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-xs text-blue-800 font-semibold mb-1">Total Payment</div>
              <div className="text-xl font-bold text-blue-900">${result.total.toFixed(2)}</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-4">
              <div className="text-xs text-orange-800 font-semibold mb-1">Total Interest</div>
              <div className="text-xl font-bold text-orange-900">${result.interest.toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InvestmentCalculator() {
  const [initial, setInitial] = useState('5000');
  const [monthly, setMonthly] = useState('100');
  const [rate, setRate] = useState('7');
  const [years, setYears] = useState('10');
  const [result, setResult] = useState<{final: number; total: number; earnings: number} | null>(null);

  const calculate = () => {
    const p = parseFloat(initial);
    const pmt = parseFloat(monthly);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (p >= 0 && pmt >= 0 && r && n) {
      const futureValueInitial = p * Math.pow(1 + r, n);
      const futureValueMonthly = pmt * ((Math.pow(1 + r, n) - 1) / r);
      const final = futureValueInitial + futureValueMonthly;
      const total = p + (pmt * n);
      const earnings = final - total;

      setResult({ final, total, earnings });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Investment Calculator</h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Initial Investment ($)
          </label>
          <input
            type="number"
            value={initial}
            onChange={(e) => setInitial(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Monthly Contribution ($)
          </label>
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Expected Annual Return (%)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            step="0.1"
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Investment Period (years)
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold py-4 rounded-xl hover:scale-105 transition-all shadow-lg"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
            <div className="text-sm text-green-800 font-semibold mb-1">Future Value</div>
            <div className="text-3xl font-bold text-green-900">${result.final.toFixed(2)}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-xs text-blue-800 font-semibold mb-1">Total Invested</div>
              <div className="text-xl font-bold text-blue-900">${result.total.toFixed(2)}</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-4">
              <div className="text-xs text-orange-800 font-semibold mb-1">Total Earnings</div>
              <div className="text-xl font-bold text-orange-900">${result.earnings.toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState('300000');
  const [downPayment, setDownPayment] = useState('60000');
  const [rate, setRate] = useState('6');
  const [years, setYears] = useState('30');
  const [result, setResult] = useState<{monthly: number; total: number; interest: number} | null>(null);

  const calculate = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const p = price - down;
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (p && r && n) {
      const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = monthly * n;
      const interest = total - p;

      setResult({ monthly, total, interest });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Mortgage Calculator</h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Home Price ($)
          </label>
          <input
            type="number"
            value={homePrice}
            onChange={(e) => setHomePrice(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Down Payment ($)
          </label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Interest Rate (%)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            step="0.1"
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Loan Term (years)
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold py-4 rounded-xl hover:scale-105 transition-all shadow-lg"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
            <div className="text-sm text-green-800 font-semibold mb-1">Monthly Payment</div>
            <div className="text-3xl font-bold text-green-900">${result.monthly.toFixed(2)}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-xs text-blue-800 font-semibold mb-1">Total Payment</div>
              <div className="text-xl font-bold text-blue-900">${result.total.toFixed(2)}</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-4">
              <div className="text-xs text-orange-800 font-semibold mb-1">Total Interest</div>
              <div className="text-xl font-bold text-orange-900">${result.interest.toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
