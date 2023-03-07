import {
	Flex,
	Heading,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import ManageRoles from "../components/administration/ManageRoles";
import ManageTicketTypes from "../components/administration/ManageTicketTypes";
import ManageUsers from "../components/administration/ManageUsers";
import MiscellaneousService from "../services/miscellaneous-service";
import { Permissions } from "../util/Utils";
import { usePermissions } from "../hooks/usePermissions";
import Head from "next/head";

const Administration = () => {
	const canManagerOtherUsers = usePermissions(Permissions.canUpdateUserProfile);
	const canManageCustomFields = usePermissions(Permissions.canManageRole);

	const fetchAdminData = async () => {
		await MiscellaneousService.fetchInitialData();
	};

	useEffect(() => {
		fetchAdminData();
	}, []);

	return (
		<Flex w="100%" direction="column" p={10}>
			<Head>
				<title>Administration</title>
			</Head>
			<Flex w="100%" h="fit-content">
				<Heading as="h1" size="lg" fontWeight={600}>
					Administration
				</Heading>
			</Flex>
			<br />

			<Tabs variant="enclosed" size="sm" colorScheme="blue">
				<TabList>
					{canManagerOtherUsers ? <Tab>Manage Users</Tab> : null}
					{canManageCustomFields ? <Tab>Manage Roles</Tab> : null}
					{canManageCustomFields ? <Tab>Manage Ticket Type</Tab> : null}
				</TabList>

				<TabPanels>
					{canManagerOtherUsers ? (
						<TabPanel>
							<ManageUsers />
						</TabPanel>
					) : null}

					{canManageCustomFields ? (
						<TabPanel>
							<ManageRoles />
						</TabPanel>
					) : null}

					{canManageCustomFields ? (
						<TabPanel>
							<ManageTicketTypes />
						</TabPanel>
					) : null}
				</TabPanels>
			</Tabs>
		</Flex>
	);
};

export default Administration;
