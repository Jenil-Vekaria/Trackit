import { Input, Flex, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React from "react";

const SearchBar = ({
	children,
	placeholder,
	variant,
	handleSearchInputChange,
}) => {
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
				<InputLeftElement
					pointerEvents="none"
					children={<SearchIcon color="gray.500" />}
				/>
				<Input
					variant={variant || "filled"}
					placeholder={placeholder}
					border="2px"
					onChange={handleSearchInputChange}
				/>
			</InputGroup>

			{children}
		</Flex>
	);
};

export default SearchBar;
