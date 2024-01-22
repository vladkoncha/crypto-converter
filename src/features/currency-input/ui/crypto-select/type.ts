import { Ticker } from '@/src/shared/models';

export interface CryptoSelectProps {
  ticker: Ticker;
  setTicker: (ticker: Ticker) => void;
}
