import { useState } from 'react';
import { Delete, Zap } from 'lucide-react';

export default function BasicCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);
  const [showScientific, setShowScientific] = useState(false);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 0;
      case '%': return a % b;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const current = parseFloat(display);
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleFunction = (func: string) => {
    try {
      const value = parseFloat(display);
      let result: number;

      switch (func) {
        case 'sin':
          result = Math.sin(value * Math.PI / 180);
          break;
        case 'cos':
          result = Math.cos(value * Math.PI / 180);
          break;
        case 'tan':
          result = Math.tan(value * Math.PI / 180);
          break;
        case 'log':
          result = Math.log10(value);
          break;
        case 'ln':
          result = Math.log(value);
          break;
        case 'sqrt':
          result = Math.sqrt(value);
          break;
        case 'x²':
          result = value * value;
          break;
        case 'x³':
          result = value * value * value;
          break;
        case '1/x':
          result = 1 / value;
          break;
        case 'π':
          setDisplay(String(Math.PI));
          setNewNumber(true);
          return;
        case 'e':
          setDisplay(String(Math.E));
          setNewNumber(true);
          return;
        default:
          return;
      }

      setDisplay(String(result));
      setNewNumber(true);
    } catch (error) {
      setDisplay('Error');
      setNewNumber(true);
    }
  };

  const basicButtons = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  const scientificButtons = [
    ['sin', 'cos', 'tan', 'log'],
    ['ln', 'sqrt', 'x²', 'x³'],
    ['π', 'e', '1/x', '%'],
  ];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6">
      <div className="mb-6">
        <div className="bg-slate-100 rounded-xl p-6 mb-4">
          <div className="text-right">
            {operation && previousValue !== null && (
              <div className="text-sm text-slate-500 mb-1">
                {previousValue} {operation}
              </div>
            )}
            <div className="text-4xl font-bold text-slate-800 break-all">
              {display}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={handleClear}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleBackspace}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 px-4 rounded-xl transition-colors"
          >
            <Delete size={20} />
          </button>
          <button
            onClick={() => setShowScientific(!showScientific)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
              showScientific
                ? 'bg-gradient-to-br from-violet-500 to-violet-600 text-white'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
          >
            <Zap size={20} />
            Scientific
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-4">
        {basicButtons.map((row, i) => (
          row.map((btn, j) => {
            const isOperation = ['÷', '×', '-', '+'].includes(btn);
            const isEquals = btn === '=';

            return (
              <button
                key={`basic-${i}-${j}`}
                onClick={() => {
                  if (btn === '=') handleEquals();
                  else if (btn === '.') handleDecimal();
                  else if (isOperation) handleOperation(btn);
                  else handleNumber(btn);
                }}
                className={`py-4 px-6 rounded-xl font-semibold text-lg transition-all hover:scale-105 ${
                  isEquals
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg'
                    : isOperation
                    ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                {btn}
              </button>
            );
          })
        ))}
      </div>

      {showScientific && (
        <div className="space-y-3 animate-fadeIn">
          <div className="h-px bg-slate-200 my-4"></div>
          <h4 className="text-sm font-semibold text-slate-600 mb-3">Scientific Functions</h4>
          {scientificButtons.map((row, i) => (
            <div key={`sci-${i}`} className="grid grid-cols-4 gap-2">
              {row.map((btn) => (
                <button
                  key={btn}
                  onClick={() => {
                    if (btn === '%') handleOperation(btn);
                    else handleFunction(btn);
                  }}
                  className="py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-br from-violet-500 to-violet-600 text-white hover:scale-105 transition-all"
                >
                  {btn}
                </button>
              ))}
            </div>
          ))}
          <div className="mt-4 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-900">
              <strong>Tip:</strong> Enter a number first, then click the function button. Trigonometric functions use degrees.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
