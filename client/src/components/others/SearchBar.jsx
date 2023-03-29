import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";

const SearchBar = ({ placeholder, variant, handleSearchInputChange }) => {
  return (
    <Flex
      direction="column"
      gap={3}
      w="100%"
      alignItems={"space-between"}
      justifyContent="space-between"
      mb={5}
    >
      <InputGroup mr={5}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.500" />
        </InputLeftElement>
        <Input
          variant="filled"
          placeholder={placeholder}
          onChange={handleSearchInputChange}
        />
      </InputGroup>
    </Flex>
  );
};

export default React.memo(SearchBar);
