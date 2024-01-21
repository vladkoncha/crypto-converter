import { Box, Image, Text } from '@chakra-ui/react';

import { Props } from './types';

export const IconButton = ({ label, icon }: Props) => {
  return (
    <Box
      w="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="0.5rem"
    >
      <Box w="2rem" h="2rem">
        <Image h="100%" w="100%" objectFit="contain" src={icon.src} alt="" />
      </Box>
      <Text fontSize="lg">{label}</Text>
    </Box>
  );
};
