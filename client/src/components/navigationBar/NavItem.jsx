import {
	Box,
	Center,
	Flex,
	Icon,
	Menu,
	MenuButton,
	Text,
	Tooltip,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

const NavItem = ({ navSize, name, icon, path, active }) => {
	return (
		<Flex
			mt={3}
			direction="column"
			alignItems={navSize === "small" ? "center" : "flex-start"}
			justifyContent="center"
			borderRadius={8}
			w="100%"
			background={active && "hover"}
			_hover={{ textDecor: "none", backgroundColor: "hover" }}
		>
			<Tooltip label={navSize === "small" && name}>
				<Link href={path} w="100%">
					<Box px={2} py={3} borderRadius={8} align="center">
						<Center>
							<Flex alignItems="center">
								<Icon as={icon} fontSize="xl" color="gray.400" />
								<Text
									ml={3}
									fontSize="sm"
									display={navSize === "small" ? "none" : "flex"}
								>
									{name}
								</Text>
							</Flex>
						</Center>
					</Box>
				</Link>
			</Tooltip>
		</Flex>
	);
};

export default NavItem;
