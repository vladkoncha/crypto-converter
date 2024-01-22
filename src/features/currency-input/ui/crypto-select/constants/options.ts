import { TICKERS } from '@/src/shared/constants';

import btc from '../assets/btc.png';
import eth from '../assets/eth.png';
import usdt from '../assets/usdt.png';

export const OPTIONS = {
  [TICKERS.btc]: {
    label: 'BTC',
    icon: btc,
  },
  [TICKERS.eth]: {
    label: 'ETH',
    icon: eth,
  },
  [TICKERS.usdt]: {
    label: 'USDT',
    icon: usdt,
  },
} as const;
