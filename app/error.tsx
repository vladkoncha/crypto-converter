'use client'; // Error components must be Client Components

import { Button, Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      height="100%"
      gap="1rem"
    >
      <Text fontSize="3xl">{error.message}</Text>
      <Button onClick={() => reset()} colorScheme="gray" variant="outline">
        Попробовать снова
      </Button>
    </Flex>
  );
}
