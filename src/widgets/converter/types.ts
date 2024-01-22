import { Ticker } from '@/src/shared/models';

interface Currency {
  ticker: Ticker;
  value: string;
}

/**
 * Exchange rates to USD
 */
export type CurrenciesRate = {
  [key in Currency['ticker']]: number;
};

export enum CurrencySide {
  Left = 'Left',
  Right = 'Right',
}

export interface CurrenciesState {
  [CurrencySide.Left]: Currency;
  [CurrencySide.Right]: Currency;
}
