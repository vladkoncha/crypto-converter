import { Box } from '@chakra-ui/react';

import { CryptoSelect } from '@/src/features/crypto-select';
import { NumberInput } from '@/src/features/number-input';

export const Main = () => {
  return (
    <Box>
      <NumberInput />
      <CryptoSelect />
    </Box>
  );
};
