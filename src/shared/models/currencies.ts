import { Ticker } from './ticker';

export interface Currency {
  ticker: Ticker;
  value: string;
}

/**
 * Exchange rates to USD
 */
export type CurrenciesRate = {
  [key in Currency['ticker']]: number;
};
