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

export const NumberInput = ({ value, onChange }: NumberInputProps) => {
  const parse = (input: string) => {
    let dotOrCommaEncountered = false;
    const sanitizedInput = input.replace(/[.,]/g, (match) => {
      if (!dotOrCommaEncountered) {
        dotOrCommaEncountered = true;
        return match;
      } else {
        return '';
      }
    });

    return sanitizedInput;
  };

  const handleChange = (value: string, _: number) => {
    onChange(parse(value));
  };

  const isError = false;

  return (
    <FormControl isInvalid={isError}>
      <ChakraNumberInput
        min={0}
        clampValueOnBlur={false}
        value={value}
        onChange={handleChange}
        height="100%"
      >
        <NumberInputField height="100%" />
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
