import { Flex, Icon, Menu, MenuButton, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

const NavItem = ({ navSize, name, icon, path, active }) => {
	return (
		<Flex
			mt={8}
			direction="column"
			alignItems={navSize === "small" ? "center" : "flex-start"}
			justifyContent="center"
			borderRadius={8}
			w={navSize === "large" && "100%"}
		>
			<Menu placement="right" border="1px solid red">
				<Tooltip label={navSize === "small" && name}>
					<Link
						// p={2}
						// _hover={{ textDecor: "none", backgroundColor: "purple.200" }}
						// background={active && "purple.200"}
						// w={navSize === "large" && "100%"}
						// borderRadius={10}
						href={path}
						// as={ReachLink}
					>
						<MenuButton>
							<Flex alignItems="center">
								<Icon
									as={icon}
									fontSize="xl"
									color={active ? "purple.500" : "gray.400"}
									_hover={{ color: "purple.500" }}
								/>
								<Text ml={5} display={navSize === "small" ? "none" : "flex"}>
									{name}
								</Text>
							</Flex>
						</MenuButton>
					</Link>
				</Tooltip>
			</Menu>
		</Flex>
	);
};

export default NavItem;
