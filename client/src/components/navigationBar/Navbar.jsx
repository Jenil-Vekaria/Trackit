import React, { useState } from "react";
import { FiHome, FiLayers, FiFileText, FiUser, FiMenu } from "react-icons/fi";
import {
	Avatar,
	Button,
	Divider,
	Flex,
	Heading,
	IconButton,
	Image,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	Text,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import NavItem from "./NavItem";
import { useLocation } from "react-router-dom";
import AuthService from "../../services/auth-service";
import MiscellaneousService from "../../services/miscellaneous-service";
import UpdateUser from "../administration/UpdateUser";
import logo from "../../assests/Trackit_Plain.png";
import { Permissions } from "../../util/Utils";
import { usePermissions } from "../../hooks/usePermissions";
const Navbar = () => {
	const [navSize, setNavSize] = useState("large");
	const location = useLocation();
	const user = AuthService.getCurrentUser();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const canManageOtherUsers = usePermissions(Permissions.canUpdateUserProfile);
	const canManageCustomFields = usePermissions(Permissions.canManageRole);

	const menuItems = [
		// {
		// 	path: "/dashboard",
		// 	name: "Dashboard",
		// 	icon: FiHome,
		// },
		{
			path: "/projects",
			name: "Projects",
			icon: FiLayers,
		},
		{
			path: "/tickets",
			name: "Tickets",
			icon: FiFileText,
		},
		{
			path: "/administration",
			name: "Administration",
			icon: FiUser,
		},
	];

	const onProfileClick = () => {
		onOpen();
	};

	return (
		<>
			<Flex
				pos="sticky"
				h="100vh"
				// boxShadow="lg"
				direction="column"
				justifyContent="space-between"
				w={navSize === "small" ? "75px" : "250px"}
				background="white"
				boxShadow="xl"
			>
				<Flex
					p={5}
					direction="column"
					alignItems={navSize === "small" ? "center" : "flex-start"}
					as="nav"
				>
					<Image src={logo} />
					<IconButton
						background="none"
						mt={5}
						_hover={{
							background: "none",
						}}
						icon={<FiMenu />}
						onClick={() => {
							if (navSize === "small") setNavSize("large");
							else setNavSize("small");
						}}
					/>

					{menuItems.map((item, index) => {
						if (
							item.name === "Administration" &&
							!canManageOtherUsers &&
							!canManageCustomFields
						) {
							return <></>;
						}

						return (
							<NavItem
								key={index}
								navSize={navSize}
								icon={item.icon}
								name={item.name}
								path={item.path}
								active={
									location.pathname.includes(item.path) ||
									(item.path === "/dashboard" && location.pathname === "/")
								}
							/>
						);
					})}
				</Flex>

				<Flex p={5} direction="column" w="100%" alignItems="flex-start" mb={4}>
					<Divider
						borderColor="gray.300"
						display={navSize === "small" ? "none" : "flex"}
					/>

					<Popover placement="right-end">
						<PopoverTrigger>
							<Flex mt={4} align="center" cursor="pointer">
								<Avatar
									size="sm"
									name="Jenil Vekaria"
									alignItems={navSize === "small" ? "center" : "flex-start"}
								/>
								<Flex
									direction="column"
									ml={4}
									display={navSize === "small" ? "none" : "flex"}
								>
									<Heading as="h3" size="xs">
										{user.firstName} {user.lastName}
									</Heading>
									<Text fontSize="sm">
										{MiscellaneousService.getRoleInfo(user.roleId).name ||
											"No Data"}
									</Text>
								</Flex>
							</Flex>
						</PopoverTrigger>

						<PopoverContent w="fit-content">
							<PopoverBody>
								<PopoverArrow />
								<Button variant="link" p={1} onClick={onProfileClick}>
									Profile
								</Button>
								<Divider />
								<Button
									variant="link"
									p={1}
									onClick={() => AuthService.logout()}
								>
									Logout
								</Button>
							</PopoverBody>
						</PopoverContent>
					</Popover>
				</Flex>
			</Flex>

			<UpdateUser
				isOpen={isOpen}
				closeModal={onClose}
				viewUser={user}
				isUpdateMyProfile={true}
			/>
		</>
	);
};

export default Navbar;
