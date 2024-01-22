import { CurrenciesRate, Currency } from '@/src/shared/models';

export enum CurrencySide {
  Left = 'Left',
  Right = 'Right',
}

export interface CurrenciesState {
  [CurrencySide.Left]: Currency;
  [CurrencySide.Right]: Currency;
}

export interface ConverterProps {
  initialRates: CurrenciesRate;
}
