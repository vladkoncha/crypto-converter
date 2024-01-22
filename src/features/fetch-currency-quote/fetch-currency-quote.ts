'use server';

import { CurrenciesRate } from '@/src/shared/models';

import { ResponseData } from './types';

export async function fetchCurrencyQuote(): Promise<CurrenciesRate> {
  const response = await fetch(
    `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=${process.env.CMC_PRO_API_KEY}&slug=bitcoin,ethereum,tether&convert=usd`,
    { next: { revalidate: 300 } }
  );

  const data: ResponseData = await response.json();

  if (!data?.status || !data?.data || data.status.error_code !== 0) {
    throw new Error(
      'Ошибка получения данных: ' + data?.status?.error_message ?? ''
    );
  }

  return {
    btc: data?.data?.['1']?.quote?.USD?.price ?? 40000,
    eth: data?.data?.['1027']?.quote?.USD?.price ?? 2500,
    usdt: data?.data?.['825']?.quote?.USD?.price ?? 1,
  };
}
