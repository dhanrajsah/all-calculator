import { useState } from 'react';
import { Heart, Activity, Flame } from 'lucide-react';

export default function HealthCalculators() {
  const [activeCalc, setActiveCalc] = useState<'bmi' | 'bmr' | 'ideal'>('bmi');

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveCalc('bmi')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
            activeCalc === 'bmi'
              ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Heart size={20} />
          BMI Calculator
        </button>
        <button
          onClick={() => setActiveCalc('bmr')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
            activeCalc === 'bmr'
              ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Flame size={20} />
          BMR & Calories
        </button>
        <button
          onClick={() => setActiveCalc('ideal')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
            activeCalc === 'ideal'
              ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Activity size={20} />
          Ideal Weight
        </button>
      </div>

      {activeCalc === 'bmi' && <BMICalculator />}
      {activeCalc === 'bmr' && <BMRCalculator />}
      {activeCalc === 'ideal' && <IdealWeightCalculator />}
    </div>
  );
}

function BMICalculator() {
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<{bmi: number; category: string; color: string} | null>(null);

  const calculate = () => {
    let bmi: number;

    if (unit === 'metric') {
      const w = parseFloat(weight);
      const h = parseFloat(height) / 100;
      bmi = w / (h * h);
    } else {
      const w = parseFloat(weight);
      const h = parseFloat(height);
      bmi = (w / (h * h)) * 703;
    }

    let category: string;
    let color: string;

    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'from-blue-500 to-blue-600';
    } else if (bmi < 25) {
      category = 'Normal weight';
      color = 'from-green-500 to-green-600';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = 'from-yellow-500 to-orange-500';
    } else {
      category = 'Obese';
      color = 'from-red-500 to-red-600';
    }

    setResult({ bmi, category, color });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">BMI Calculator</h3>

      <div className="mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setUnit('metric')}
            className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all ${
              unit === 'metric'
                ? 'bg-pink-500 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            Metric
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all ${
              unit === 'imperial'
                ? 'bg-pink-500 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            Imperial
          </button>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Weight ({unit === 'metric' ? 'kg' : 'lbs'})
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Height ({unit === 'metric' ? 'cm' : 'inches'})
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-gradient-to-br from-pink-500 to-rose-600 text-white font-semibold py-4 rounded-xl hover:scale-105 transition-all shadow-lg"
      >
        Calculate BMI
      </button>

      {result && (
        <div className="mt-6">
          <div className={`bg-gradient-to-br ${result.color} rounded-xl p-6 text-white`}>
            <div className="text-sm font-semibold mb-2">Your BMI</div>
            <div className="text-4xl font-bold mb-2">{result.bmi.toFixed(1)}</div>
            <div className="text-lg font-semibold">{result.category}</div>
          </div>
          <div className="mt-4 p-4 bg-slate-50 rounded-xl">
            <div className="text-sm text-slate-700 space-y-1">
              <div><strong>Underweight:</strong> BMI less than 18.5</div>
              <div><strong>Normal weight:</strong> BMI 18.5 to 24.9</div>
              <div><strong>Overweight:</strong> BMI 25 to 29.9</div>
              <div><strong>Obese:</strong> BMI 30 or greater</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BMRCalculator() {
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState('1.55');
  const [result, setResult] = useState<{bmr: number; tdee: number} | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    let bmr: number;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a);
    } else {
      bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
    }

    const tdee = bmr * parseFloat(activity);
    setResult({ bmr, tdee });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">BMR & Calorie Calculator</h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Gender</label>
          <div className="flex gap-2">
            <button
              onClick={() => setGender('male')}
              className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all ${
                gender === 'male'
                  ? 'bg-pink-500 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              Male
            </button>
            <button
              onClick={() => setGender('female')}
              className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all ${
                gender === 'female'
                  ? 'bg-pink-500 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              Female
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Activity Level</label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none transition-colors bg-white"
          >
            <option value="1.2">Sedentary (little or no exercise)</option>
            <option value="1.375">Lightly active (1-3 days/week)</option>
            <option value="1.55">Moderately active (3-5 days/week)</option>
            <option value="1.725">Very active (6-7 days/week)</option>
            <option value="1.9">Extra active (physical job)</option>
          </select>
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-gradient-to-br from-pink-500 to-rose-600 text-white font-semibold py-4 rounded-xl hover:scale-105 transition-all shadow-lg"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4">
            <div className="text-sm text-pink-800 font-semibold mb-1">Basal Metabolic Rate (BMR)</div>
            <div className="text-3xl font-bold text-pink-900">{result.bmr.toFixed(0)} cal/day</div>
            <div className="text-xs text-pink-700 mt-2">Calories burned at rest</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4">
            <div className="text-sm text-orange-800 font-semibold mb-1">Total Daily Energy Expenditure (TDEE)</div>
            <div className="text-3xl font-bold text-orange-900">{result.tdee.toFixed(0)} cal/day</div>
            <div className="text-xs text-orange-700 mt-2">Total calories needed to maintain weight</div>
          </div>
        </div>
      )}
    </div>
  );
}

function IdealWeightCalculator() {
  const [height, setHeight] = useState('170');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<{devine: number; hamwi: number; miller: number} | null>(null);

  const calculate = () => {
    const h = parseFloat(height);
    const inches = h / 2.54;

    let devine: number;
    let hamwi: number;
    let miller: number;

    if (gender === 'male') {
      devine = 50 + 2.3 * (inches - 60);
      hamwi = 48 + 2.7 * (inches - 60);
      miller = 56.2 + 1.41 * (inches - 60);
    } else {
      devine = 45.5 + 2.3 * (inches - 60);
      hamwi = 45.5 + 2.2 * (inches - 60);
      miller = 53.1 + 1.36 * (inches - 60);
    }

    setResult({ devine, hamwi, miller });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Ideal Weight Calculator</h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Gender</label>
          <div className="flex gap-2">
            <button
              onClick={() => setGender('male')}
              className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all ${
                gender === 'male'
                  ? 'bg-pink-500 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              Male
            </button>
            <button
              onClick={() => setGender('female')}
              className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all ${
                gender === 'female'
                  ? 'bg-pink-500 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              Female
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-gradient-to-br from-pink-500 to-rose-600 text-white font-semibold py-4 rounded-xl hover:scale-105 transition-all shadow-lg"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="bg-pink-50 rounded-xl p-4">
            <div className="text-sm text-pink-800 font-semibold mb-1">Devine Formula</div>
            <div className="text-2xl font-bold text-pink-900">{result.devine.toFixed(1)} kg</div>
          </div>
          <div className="bg-rose-50 rounded-xl p-4">
            <div className="text-sm text-rose-800 font-semibold mb-1">Hamwi Formula</div>
            <div className="text-2xl font-bold text-rose-900">{result.hamwi.toFixed(1)} kg</div>
          </div>
          <div className="bg-red-50 rounded-xl p-4">
            <div className="text-sm text-red-800 font-semibold mb-1">Miller Formula</div>
            <div className="text-2xl font-bold text-red-900">{result.miller.toFixed(1)} kg</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-700">
              Different formulas exist for calculating ideal body weight. These are estimates based on height and gender. Consult with a healthcare provider for personalized advice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
