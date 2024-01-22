import { Flex, Stat, StatArrow, StatHelpText } from '@chakra-ui/react';

import { CurrencyInputProps } from './types';
import { CryptoSelect } from './ui/crypto-select';
import { NumberInput } from './ui/number-input';

export const CurrencyInput = ({
  value,
  onChange,
  ticker,
  setTicker,
  isLoading,
  percentChange,
}: CurrencyInputProps) => {
  return (
    <Flex direction="column" justifyContent="center">
      <Flex direction="row" justifyContent="center">
        <NumberInput isLoading={isLoading} value={value} onChange={onChange} />
        <CryptoSelect
          isLoading={isLoading}
          ticker={ticker}
          setTicker={setTicker}
        />
      </Flex>
      {percentChange !== undefined && (
        <Stat>
          <StatHelpText>
            <StatArrow type={percentChange > 0 ? 'increase' : 'decrease'} />
            24h: {percentChange.toFixed(2)}%
          </StatHelpText>
        </Stat>
      )}
    </Flex>
  );
};
