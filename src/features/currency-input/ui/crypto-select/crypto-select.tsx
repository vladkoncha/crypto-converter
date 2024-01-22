'use client';

import { UpDownIcon } from '@chakra-ui/icons';
import {
  Box,
  FormControl,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

import { IconButton } from '@/src/shared/icon-button';
import { Ticker } from '@/src/shared/models';

import { MENU_WIDTH, OPTIONS } from './constants';
import { CryptoSelectProps } from './type';

export const CryptoSelect = ({ ticker, setTicker }: CryptoSelectProps) => {
  return (
    <FormControl width="unset">
      <Menu closeOnSelect={true} matchWidth={false}>
        <MenuButton
          border="1px"
          borderColor="inherit"
          borderStyle="solid"
          borderRadius="md"
          width={MENU_WIDTH}
        >
          <Box display="flex" flexDirection="row" alignItems="center">
            <IconButton
              label={OPTIONS[ticker].label}
              icon={OPTIONS[ticker].icon}
            />
            <UpDownIcon margin="0.5rem 0.5rem 0.5rem auto" />
          </Box>
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
