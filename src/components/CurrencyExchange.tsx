import { useState, useEffect } from 'react';
import { ArrowLeftRight, RefreshCw } from 'lucide-react';

interface ExchangeRates {
  [key: string]: number;
}

const currencies = {
  USD: { name: 'US Dollar', symbol: '$' },
  EUR: { name: 'Euro', symbol: '€' },
  GBP: { name: 'British Pound', symbol: '£' },
  JPY: { name: 'Japanese Yen', symbol: '¥' },
  INR: { name: 'Indian Rupee', symbol: '₹' },
  NPR: { name: 'Nepali Rupee', symbol: 'Rs' },
  AUD: { name: 'Australian Dollar', symbol: 'A$' },
  CAD: { name: 'Canadian Dollar', symbol: 'C$' },
  CNY: { name: 'Chinese Yuan', symbol: '¥' },
  CHF: { name: 'Swiss Franc', symbol: 'CHF' },
  AED: { name: 'UAE Dirham', symbol: 'د.إ' },
  SGD: { name: 'Singapore Dollar', symbol: 'S$' },
  MYR: { name: 'Malaysian Ringgit', symbol: 'RM' },
  THB: { name: 'Thai Baht', symbol: '฿' },
  KRW: { name: 'South Korean Won', symbol: '₩' },
};

export default function CurrencyExchange() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('NPR');
  const [amount, setAmount] = useState('1');
  const [result, setResult] = useState('');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (Object.keys(exchangeRates).length > 0 && amount) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const fetchExchangeRates = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      setExchangeRates(data.rates);
      const now = new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
      setLastUpdated(now);
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
    }
    setLoading(false);
  };

  const convertCurrency = () => {
    const value = parseFloat(amount);
    if (!isNaN(value) && exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
      const usdValue = value / exchangeRates[fromCurrency];
      const converted = usdValue * exchangeRates[toCurrency];
      setResult(converted.toFixed(2));
    } else {
      setResult('');
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount(result || amount);
    setResult(amount);
  };

  const getExchangeRate = () => {
    if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
      const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
      return rate.toFixed(4);
    }
    return '0';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-slate-800">Currency Exchange</h3>
          <button
            onClick={fetchExchangeRates}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-colors disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span className="text-sm font-semibold">Refresh</span>
          </button>
        </div>

        {loading && !lastUpdated ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-slate-600">Loading exchange rates...</p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">From</label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors text-lg"
                    placeholder="Enter amount"
                  />
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors bg-white min-w-[160px] text-sm font-medium"
                  >
                    {Object.entries(currencies).map(([code, { name, symbol }]) => (
                      <option key={code} value={code}>
                        {code} - {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleSwap}
                  className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
                  title="Swap currencies"
                >
                  <ArrowLeftRight size={20} className="text-slate-700" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">To</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={result}
                    readOnly
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 text-lg font-semibold"
                    placeholder="Result"
                  />
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors bg-white min-w-[160px] text-sm font-medium"
                  >
                    {Object.entries(currencies).map(([code, { name, symbol }]) => (
                      <option key={code} value={code}>
                        {code} - {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-slate-700">Exchange Rate</p>
                <p className="text-lg font-bold text-blue-600">
                  1 {fromCurrency} = {getExchangeRate()} {toCurrency}
                </p>
              </div>
              {lastUpdated && (
                <p className="text-xs text-slate-500">
                  Last updated: {lastUpdated}
                </p>
              )}
            </div>

            <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <p className="text-sm text-yellow-900">
                <strong>Note:</strong> Exchange rates are fetched in real-time from exchangerate-api.com.
                Rates may vary slightly from actual bank rates and are for reference purposes only.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500">Popular Pairs</p>
                <button
                  onClick={() => {
                    setFromCurrency('USD');
                    setToCurrency('NPR');
                  }}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 mt-1"
                >
                  USD → NPR
                </button>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500">Quick Convert</p>
                <button
                  onClick={() => {
                    setFromCurrency('EUR');
                    setToCurrency('USD');
                  }}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 mt-1"
                >
                  EUR → USD
                </button>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500">Quick Convert</p>
                <button
                  onClick={() => {
                    setFromCurrency('INR');
                    setToCurrency('NPR');
                  }}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 mt-1"
                >
                  INR → NPR
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
