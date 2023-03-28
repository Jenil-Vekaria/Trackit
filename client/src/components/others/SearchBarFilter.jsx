import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import React from "react";

const SearchBarFilter = ({ name, multiSelect, options }) => {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button}>
        {name}
        <ChevronDownIcon ml={2} />
      </MenuButton>
      <MenuList>
        <MenuOptionGroup type={multiSelect ? "checkbox" : "radio"}>
          {options &&
            options.map((item, index) => (
              <MenuItemOption key={index} value={item}>
                {item}
              </MenuItemOption>
            ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default SearchBarFilter;
