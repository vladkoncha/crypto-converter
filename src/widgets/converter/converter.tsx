'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useState } from 'react';

import { CurrencyInput } from '@/src/features/currency-input';
import { fetchCurrencyQuote } from '@/src/features/fetch-currency-quote';
import { TICKERS } from '@/src/shared/constants';
import { CurrenciesRate, Ticker } from '@/src/shared/models';

import { convertCurrency } from './convert-currency';
import { CONVERTER_CONTAINER_SX } from './sx';
import { ConverterProps, CurrenciesState, CurrencySide } from './types';

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

export const Converter = ({ initialRates }: ConverterProps) => {
  const [error, setError] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currencies, setCurrencies] = useState(initialCurrencyState);
  const [currenciesRate, setCurrenciesRate] = useState<CurrenciesRate>(
    initialRates ?? {
      btc: 41000,
      eth: 2500,
      usdt: 1,
    }
  );

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

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setError('');

    try {
      const rates = await fetchCurrencyQuote();
      setCurrenciesRate(rates);
      handleValueChange(
        CurrencySide.Left,
        currencies[CurrencySide.Left].value,
        rates
      );
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e);
        setError(e.message);
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleValueChange = (
    side: CurrencySide,
    value: string,
    rates: CurrenciesRate
  ) => {
    const numValue = parseFloat(value);
    if (!Number.isFinite(numValue)) {
      resetValues();
      return;
    }

    const otherSide =
      side === CurrencySide.Left ? CurrencySide.Right : CurrencySide.Left;

    const convertedValue = convertCurrency(
      numValue,
      rates[currencies[side].ticker],
      rates[currencies[otherSide].ticker]
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
    <Flex direction="column" justify="center" align="center">
      <Box {...CONVERTER_CONTAINER_SX}>
        <CurrencyInput
          value={currencies[CurrencySide.Left].value}
          onChange={(value) =>
            handleValueChange(CurrencySide.Left, value, currenciesRate)
          }
          ticker={currencies[CurrencySide.Left].ticker}
          setTicker={(ticker) => handleTickerChange(CurrencySide.Left, ticker)}
          isLoading={isRefreshing}
        />

        <Box display="flex" flexDirection="row" gap="0.25rem">
          <ArrowLeftIcon />
          <ArrowRightIcon />
        </Box>

        <CurrencyInput
          value={currencies[CurrencySide.Right].value}
          onChange={(value) =>
            handleValueChange(CurrencySide.Right, value, currenciesRate)
          }
          ticker={currencies[CurrencySide.Right].ticker}
          setTicker={(ticker) => handleTickerChange(CurrencySide.Right, ticker)}
          isLoading={isRefreshing}
        />

        <Button
          disabled={isRefreshing}
          onClick={handleRefresh}
          colorScheme="gray"
          variant="outline"
          cursor={isRefreshing ? 'not-allowed' : 'pointer'}
        >
          Обновить
        </Button>
      </Box>

      {error && (
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <AlertTitle>Произошла ошибка</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </Flex>
  );
};
