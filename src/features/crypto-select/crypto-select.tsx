'use client';

import {
  FormControl,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useState } from 'react';

import { IconButton } from '@/src/shared/icon-button';

import { options } from './options';

const MENU_WIDTH = '5rem';

export const CryptoSelect = () => {
  const [value, setValue] = useState(options[0]);

  return (
    <FormControl>
      <Menu closeOnSelect={true} matchWidth={false}>
        <MenuButton
          border="1px"
          borderColor="inherit"
          borderStyle="solid"
          borderRadius="md"
          width={MENU_WIDTH}
        >
          <IconButton label={value.label} icon={value.icon} />
        </MenuButton>
        <MenuList minW="3rem" width={MENU_WIDTH}>
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              onClick={() => setValue(option)}
            >
              <IconButton label={option.label} icon={option.icon} />
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </FormControl>
  );
};
