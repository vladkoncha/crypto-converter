import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';

import { ErrorMessageProps } from './types';

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <Alert status="error" borderRadius="md">
      <AlertIcon />
      <AlertTitle>An error occured</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
