export type CalculatorCategory =
  | 'basic'
  | 'scientific'
  | 'financial'
  | 'converter'
  | 'health'
  | 'date';

export interface Calculator {
  id: string;
  name: string;
  category: CalculatorCategory;
  description: string;
  icon: string;
}
