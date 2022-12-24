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

const Administration = () => {
	const fetchAdminData = async () => {
		await MiscellaneousService.fetchInitialData();
	};

	useEffect(() => {
		fetchAdminData();
	}, []);

	return (
		<Flex w="100%" direction="column" p={10}>
			<Flex w="100%" h="fit-content">
				<Heading as="h1" size="lg">
					Administration
				</Heading>
			</Flex>
			<br />

			<Tabs isFitted variant="soft-rounded" colorScheme="purple">
				<TabList>
					<Tab>Manage Users</Tab>
					<Tab>Manage Roles</Tab>
					<Tab>Manage Ticket Type</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<ManageUsers />
					</TabPanel>
					<TabPanel>
						<ManageRoles />
					</TabPanel>
					<TabPanel>
						<ManageTicketTypes />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Flex>
	);
};

export default Administration;
