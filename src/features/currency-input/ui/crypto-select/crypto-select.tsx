'use client';

import { UpDownIcon } from '@chakra-ui/icons';
import {
  Flex,
  FormControl,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

import { Ticker } from '@/src/shared/models';
import { IconButton } from '@/src/shared/ui/icon-button';

import { MENU_WIDTH, OPTIONS } from './constants';
import { CryptoSelectProps } from './type';

export const CryptoSelect = ({
  ticker,
  setTicker,
  isLoading,
}: CryptoSelectProps) => {
  return (
    <FormControl width="unset">
      <Menu closeOnSelect={true} matchWidth={false}>
        <MenuButton
          border="1px"
          borderColor="inherit"
          borderStyle="solid"
          borderRadius="md"
          width={MENU_WIDTH}
          disabled={isLoading}
          cursor={isLoading ? 'not-allowed' : 'pointer'}
        >
          <Flex direction="row" alignItems="center">
            <IconButton
              label={OPTIONS[ticker].label}
              icon={OPTIONS[ticker].icon}
            />
            <UpDownIcon margin="0.5rem 0.5rem 0.5rem auto" />
          </Flex>
        </MenuButton>
        <MenuList minW="3rem" width={MENU_WIDTH}>
          {Object.entries(OPTIONS).map(([ticker, option]) => (
            <MenuItem
              key={ticker}
              value={ticker}
              onClick={() => setTicker(ticker as Ticker)}
            >
              <IconButton label={option.label} icon={option.icon} />
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </FormControl>
  );
};
