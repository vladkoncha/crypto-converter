import { Ticker } from '@/src/shared/models';

export interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  ticker: Ticker;
  setTicker: (ticker: Ticker) => void;
  isLoading: boolean;
}
