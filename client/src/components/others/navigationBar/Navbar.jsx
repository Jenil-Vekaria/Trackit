import Image from "next/image";
import { useRouter } from "next/router";
import {
  Avatar,
  Divider,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiFileText, FiLayers, FiUser } from "react-icons/fi";
import AuthService from "@/services/auth-service";
import useApi from "@/hooks/useApi";
import useAuthStore from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";
import { Permissions, getUserFullname } from "@/util/Utils";
import logo from "@/assets/Trackit_Plain.png";
import UpdateUser from "../../administration/UpdateUser";
import NavItem from "./NavItem";

const Navbar = () => {
  const [navSize, setNavSize] = useState("large");
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const canManageAdminPage = usePermissions(Permissions.canManageAdminPage);
  const useAuth = useAuthStore();

  const myUserProfileSWR = useApi(null);

  useEffect(() => {
    if (myUserProfileSWR.data) {
      useAuth.setUserProfile(myUserProfileSWR.data);
    }
  }, [myUserProfileSWR.data]);

  const menuItems = [
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

  const onLogout = () => {
    useAuth.clear();
    router.reload();
  };

  return (
    <>
      <Flex
        pos="sticky"
        h="100vh"
        direction="column"
        justifyContent="space-between"
        w={navSize === "small" ? "75px" : "250px"}
        background="secondary"
        boxShadow="xl"
      >
        <Flex
          p={5}
          direction="column"
          alignItems={navSize === "small" ? "center" : "flex-start"}
          as="nav"
        >
          <Image src={logo} alt="track it logo" />

          {menuItems.map((item, index) => {
            if (item.name === "Administration" && !canManageAdminPage) {
              return <React.Fragment key={index}></React.Fragment>;
            }

            return (
              <NavItem
                key={index}
                navSize={navSize}
                icon={item.icon}
                name={item.name}
                path={item.path}
                active={
                  router.pathname.includes(item.path) ||
                  (item.path === "/projects" && router.pathname === "/")
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

          <Menu matchWidth={true}>
            <MenuButton>
              <Flex mt={4} align="center" cursor="pointer">
                <Avatar size="sm" name={getUserFullname(useAuth.userProfile)} />
                <Flex direction="column" ml={4} align="left">
                  <Heading as="h3" size="xs">
                    {useAuth.userProfile.firstName}{" "}
                    {useAuth.userProfile.lastName}
                  </Heading>
                  <Text fontSize="sm">
                    {useAuth.userProfile.roleId.name || "No Data"}
                  </Text>
                </Flex>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onProfileClick}>Profile</MenuItem>
              <MenuItem onClick={onLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <UpdateUser
        isOpen={isOpen}
        closeModal={onClose}
        viewUser={useAuth.userProfile}
        isUpdateMyProfile={true}
        mutateServer={myUserProfileSWR.mutateServer}
      />
    </>
  );
};

export default Navbar;
