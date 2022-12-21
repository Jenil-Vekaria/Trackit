import {
	Flex,
	Heading,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";
import React from "react";
import ManageUsers from "../components/administration/ManageUsers";

const Administration = () => {
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
					<TabPanel>Roles</TabPanel>
					<TabPanel>Ticket Types</TabPanel>
				</TabPanels>
			</Tabs>
		</Flex>
	);
};

export default Administration;
