import {
	Input,
	Flex,
	InputGroup,
	InputLeftElement,
	Spacer,
	Box,
	Text,
	Button,
} from "@chakra-ui/react";
import { SearchIcon, RepeatIcon } from "@chakra-ui/icons";
import React from "react";
import SearchBarFilter from "./SearchBarFilter";

const SearchBar = ({ children, placeholder, variant }) => {
	return (
		<Flex
			direction="column"
			gap={3}
			w="100%"
			alignItems={"space-between"}
			justifyContent="space-between"
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
				/>
			</InputGroup>

			<Flex justifyContent="space-between" w="100%">
				<Flex gap={3}>
					{children}
					{/* <Button colorScheme="teal" variant="solid">
						<RepeatIcon mr={2} /> Filter
					</Button> */}
				</Flex>
				{/* <SearchBarFilter
					name="Sort By"
					multiSelect={false}
					options={["Created Date: asc to desc", "Created Date: desc to asc"]}
				/> */}
			</Flex>
		</Flex>
	);
};

export default SearchBar;
