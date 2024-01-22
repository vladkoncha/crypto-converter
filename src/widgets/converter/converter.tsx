'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { CurrencyInput } from '@/src/features/currency-input';
import { TICKERS } from '@/src/shared/constants';
import { Ticker } from '@/src/shared/models';

import { fetchCurrencyQuote } from './actions/fetch-currency-quote';
import { convertCurrency } from './convert-currency';
import { CONVERTER_CONTAINER_SX } from './sx';
import { CurrenciesRate, CurrenciesState, CurrencySide } from './types';

const initialCurrencyState: CurrenciesState = {
  [CurrencySide.Left]: {
    ticker: TICKERS.btc,
    value: '1',
  },
  [CurrencySide.Right]: {
    ticker: TICKERS.btc,
    value: '1',
  },
};

export const Converter = () => {
  const [currencies, setCurrencies] = useState(initialCurrencyState);
  const [currenciesRate, setCurrenciesRate] = useState<CurrenciesRate>({
    btc: 41000,
    eth: 2500,
    usdt: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rates = await fetchCurrencyQuote();

        console.log(rates);
        setCurrenciesRate(rates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const resetValues = () => {
    setCurrencies({
      [CurrencySide.Left]: {
        ...currencies[CurrencySide.Left],
        value: '',
      },
      [CurrencySide.Right]: {
        ...currencies[CurrencySide.Right],
        value: '',
      },
    });
  };

  const handleValueChange = (side: CurrencySide, value: string) => {
    const numValue = parseFloat(value);
    if (!Number.isFinite(numValue)) {
      resetValues();
      return;
    }

    const otherSide =
      side === CurrencySide.Left ? CurrencySide.Right : CurrencySide.Left;

    const convertedValue = convertCurrency(
      numValue,
      currenciesRate[currencies[side].ticker],
      currenciesRate[currencies[otherSide].ticker]
    );

    setCurrencies({
      ...currencies,
      [side]: {
        ...currencies[side],
        value,
      },
      [otherSide]: {
        ...currencies[otherSide],
        value: convertedValue.toString(),
      },
    });
  };

  const handleTickerChange = async (side: CurrencySide, ticker: Ticker) => {
    // const rates = await fetchCurrencyQuote();

    // console.log(rates);
    // setCurrenciesRate(rates);

    const numValue = parseFloat(currencies[CurrencySide.Left].value);

    if (side === CurrencySide.Left) {
      const rightValue = convertCurrency(
        numValue || 0,
        currenciesRate[ticker],
        currenciesRate[currencies[CurrencySide.Right].ticker]
      );

      setCurrencies({
        [CurrencySide.Left]: {
          ...currencies[CurrencySide.Left],
          ticker,
        },
        [CurrencySide.Right]: {
          ...currencies[CurrencySide.Right],
          value: rightValue.toString(),
        },
      });
    } else {
      const rightValue = convertCurrency(
        numValue || 0,
        currenciesRate[currencies[CurrencySide.Left].ticker],
        currenciesRate[ticker]
      );

      setCurrencies({
        ...currencies,
        [CurrencySide.Right]: {
          value: rightValue.toString(),
          ticker,
        },
      });
    }
  };

  return (
    <Box {...CONVERTER_CONTAINER_SX}>
      <CurrencyInput
        value={currencies[CurrencySide.Left].value}
        onChange={(value) => handleValueChange(CurrencySide.Left, value)}
        ticker={currencies[CurrencySide.Left].ticker}
        setTicker={(ticker) => handleTickerChange(CurrencySide.Left, ticker)}
      />

      <Box display="flex" flexDirection="row" gap="0.25rem">
        <ArrowLeftIcon />
        <ArrowRightIcon />
      </Box>

      <CurrencyInput
        value={currencies[CurrencySide.Right].value}
        onChange={(value) => handleValueChange(CurrencySide.Right, value)}
        ticker={currencies[CurrencySide.Right].ticker}
        setTicker={(ticker) => handleTickerChange(CurrencySide.Right, ticker)}
      />
    </Box>
  );
};
