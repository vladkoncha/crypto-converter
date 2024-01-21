'use client';

import {
  FormControl,
  FormErrorMessage,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { useState } from 'react';

export const NumberInput = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_: string, numValue: number) => {
    setValue(numValue);
  };

  const isError = false;

  return (
    <FormControl isInvalid={isError}>
      <ChakraNumberInput onChange={handleChange}>
        <NumberInputField required type="number" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </ChakraNumberInput>
      {isError && (
        <FormErrorMessage>
          Введите корректное числовое значение
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
