import { useState } from 'react';
import { Calculator, DollarSign, Ruler, Heart, Calendar } from 'lucide-react';
import BasicCalculator from './components/BasicCalculator';
import FinancialCalculators from './components/FinancialCalculators';
import UnitConverter from './components/UnitConverter';
import HealthCalculators from './components/HealthCalculators';
import DateCalculators from './components/DateCalculators';

type Category = 'basic' | 'financial' | 'converter' | 'health' | 'date';

interface CategoryInfo {
  id: Category;
  name: string;
  icon: typeof Calculator;
  description: string;
  color: string;
}

const categories: CategoryInfo[] = [
  {
    id: 'basic',
    name: 'Calculator',
    icon: Calculator,
    description: 'Basic & scientific calculations',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'financial',
    name: 'Financial',
    icon: DollarSign,
    description: 'Loan, mortgage & investment calculators',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 'converter',
    name: 'Unit Converter',
    icon: Ruler,
    description: 'Convert between different units',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'health',
    name: 'Health & Fitness',
    icon: Heart,
    description: 'BMI, BMR & ideal weight calculators',
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 'date',
    name: 'Date & Time',
    icon: Calendar,
    description: 'Age, date difference & AD/BS converter',
    color: 'from-teal-500 to-cyan-600',
  },
];

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('basic');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Calculator className="text-white" size={28} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
              All-in-One Calculator
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Your ultimate destination for every type of calculation. From basic math to advanced formulas, get instant, accurate results all in one place.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-8 md:mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-4 md:p-6 rounded-2xl transition-all duration-300 text-left ${
                  isActive
                    ? `bg-gradient-to-br ${category.color} text-white shadow-xl scale-105`
                    : 'bg-white text-slate-700 hover:shadow-lg hover:scale-105'
                }`}
              >
                <Icon size={24} className={`mb-2 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                <h3 className="font-bold text-sm md:text-base mb-1">{category.name}</h3>
                <p className={`text-xs ${isActive ? 'text-white/80' : 'text-slate-500'} hidden md:block`}>
                  {category.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="animate-fadeIn">
            {activeCategory === 'basic' && <BasicCalculator />}
            {activeCategory === 'financial' && <FinancialCalculators />}
            {activeCategory === 'converter' && <UnitConverter />}
            {activeCategory === 'health' && <HealthCalculators />}
            {activeCategory === 'date' && <DateCalculators />}
          </div>
        </div>

        <footer className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">About Our Calculator</h3>
            <p className="text-slate-600 mb-6">
              Our free online calculator handles everything from basic arithmetic to complex scientific functions,
              financial planning, unit conversions, health metrics, and date calculations. Perfect for students,
              engineers, accountants, and anyone needing quick, accurate calculations.
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-500">
              <span className="bg-slate-100 px-3 py-1 rounded-full">Free Forever</span>
              <span className="bg-slate-100 px-3 py-1 rounded-full">No Registration</span>
              <span className="bg-slate-100 px-3 py-1 rounded-full">100% Accurate</span>
              <span className="bg-slate-100 px-3 py-1 rounded-full">Mobile Friendly</span>
            </div>
          </div>
          <p className="text-slate-500 mt-6">
            All calculations are performed locally in your browser for maximum privacy and speed.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
