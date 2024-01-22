import { Box } from '@chakra-ui/react';

import { Converter } from '@/src/widgets/converter';

export const Main = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor="gray.100"
    >
      <Converter />
    </Box>
  );
};
