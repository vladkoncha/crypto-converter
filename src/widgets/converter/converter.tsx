'use client';

import { ArrowLeftIcon, ArrowRightIcon, RepeatIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  IconButton,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { useState } from 'react';

import { CurrencyInput } from '@/src/features/currency-input';
import { fetchCurrencyQuote } from '@/src/features/fetch-currency-quote';
import { TICKERS } from '@/src/shared/constants';
import { CurrenciesRate, Ticker } from '@/src/shared/models';

import { CONVERTER_CONTAINER_MOBILE_SX, CONVERTER_CONTAINER_SX } from './sx';
import { ConverterProps, CurrenciesState, CurrencySide } from './types';
import { convertCurrency } from './utils/convert-currency';

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
  const [isLargerThan900] = useMediaQuery('(min-width: 900px)', {
    ssr: true,
    fallback: true,
  });

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
      rates[currencies[side].ticker].price,
      rates[currencies[otherSide].ticker].price
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
        currenciesRate[ticker].price,
        currenciesRate[currencies[CurrencySide.Right].ticker].price
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
        currenciesRate[currencies[CurrencySide.Left].ticker].price,
        currenciesRate[ticker].price
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

  const layoutSx = isLargerThan900
    ? CONVERTER_CONTAINER_SX
    : CONVERTER_CONTAINER_MOBILE_SX;

  return (
    <Flex direction="column" justify="center" align="center">
      <Flex
        direction="column"
        padding="2rem"
        borderRadius="md"
        backgroundColor="white"
      >
        <Box {...layoutSx}>
          <CurrencyInput
            value={currencies[CurrencySide.Left].value}
            onChange={(value) =>
              handleValueChange(CurrencySide.Left, value, currenciesRate)
            }
            ticker={currencies[CurrencySide.Left].ticker}
            setTicker={(ticker) =>
              handleTickerChange(CurrencySide.Left, ticker)
            }
            isLoading={isRefreshing}
            percentChange={
              currenciesRate[currencies[CurrencySide.Left].ticker].percentChange
            }
          />
          <Flex
            direction="row"
            gap="0.25rem"
            marginTop={isLargerThan900 ? '1.5rem' : '0'}
          >
            <ArrowLeftIcon />
            <ArrowRightIcon />
          </Flex>
          <CurrencyInput
            value={currencies[CurrencySide.Right].value}
            onChange={(value) =>
              handleValueChange(CurrencySide.Right, value, currenciesRate)
            }
            ticker={currencies[CurrencySide.Right].ticker}
            setTicker={(ticker) =>
              handleTickerChange(CurrencySide.Right, ticker)
            }
            isLoading={isRefreshing}
            percentChange={
              currenciesRate[currencies[CurrencySide.Right].ticker]
                .percentChange
            }
          />
          <IconButton
            disabled={isRefreshing}
            onClick={handleRefresh}
            colorScheme="gray"
            variant="outline"
            cursor={isRefreshing ? 'not-allowed' : 'pointer'}
            aria-label="Обновить"
            icon={<RepeatIcon />}
          />
        </Box>

        <Text size="md" marginTop="0.5rem">
          1 {currencies[CurrencySide.Left].ticker.toUpperCase()} ={' '}
          {convertCurrency(
            1,
            currenciesRate[currencies[CurrencySide.Left].ticker].price,
            currenciesRate[currencies[CurrencySide.Right].ticker].price
          )}{' '}
          {currencies[CurrencySide.Right].ticker.toUpperCase()}
        </Text>
      </Flex>

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
