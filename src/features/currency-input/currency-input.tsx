import { Box } from '@chakra-ui/react';

import { CurrencyInputProps } from './types';
import { CryptoSelect } from './ui/crypto-select';
import { NumberInput } from './ui/number-input';

export const CurrencyInput = ({
  value,
  onChange,
  ticker,
  setTicker,
}: CurrencyInputProps) => {
  return (
    <Box display="flex" flexDirection="row" justifyContent="center">
      <NumberInput value={value} onChange={onChange} />
      <CryptoSelect ticker={ticker} setTicker={setTicker} />
    </Box>
  );
};
