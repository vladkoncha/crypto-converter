import { UpDownIcon } from '@chakra-ui/icons';
import { Box, Image, Text } from '@chakra-ui/react';

import { Props } from './types';

export const IconButton = ({ label, icon }: Props) => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="0.5rem"
    >
      <Box w="1.5rem" h="1.5rem">
        <Image h="100%" w="100%" objectFit="contain" src={icon.src} alt="" />
      </Box>
      <Text fontSize="sm" as="b">
        {label}
      </Text>
    </Box>
  );
};
