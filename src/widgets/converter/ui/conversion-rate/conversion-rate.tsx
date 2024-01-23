import { Text } from '@chakra-ui/react';

import { ConversionRateLabelProps } from './types';

export const ConversionRateLabel = ({
  leftTicker,
  rightTicker,
  conversionRate,
}: ConversionRateLabelProps) => {
  return (
    <Text size="md" marginTop="0.5rem">
      1 {leftTicker} = {conversionRate} {rightTicker}
    </Text>
  );
};
