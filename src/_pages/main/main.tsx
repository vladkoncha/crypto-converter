import { Box } from '@chakra-ui/react';

import { fetchCurrencyQuote } from '@/src/features/fetch-currency-quote';
import { Converter } from '@/src/widgets/converter';

export const Main = async () => {
  const rates = await fetchCurrencyQuote();

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor="gray.100"
    >
      <Converter initialRates={rates} />
    </Box>
  );
};
