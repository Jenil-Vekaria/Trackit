import Head from "next/head";
import {
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect } from "react";
import ManageRoles from "@/components/administration/ManageRoles";
import ManageTicketTypes from "@/components/administration/ManageTicketTypes";
import ManageUsers from "@/components/administration/ManageUsers";
import MiscellaneousService from "@/services/miscellaneous-service";
import { usePermissions } from "@/hooks/usePermissions";
import { Permissions } from "@/util/Utils";
import PageNotFound from "./404";

const Administration = () => {
  const canManageAdminPage = usePermissions(Permissions.canManageAdminPage);

  if (!canManageAdminPage) {
    return <PageNotFound />;
  }

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
